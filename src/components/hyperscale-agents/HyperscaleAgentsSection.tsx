'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import styles from './hyperscale-agents.module.css'
import PromptCard from './PromptCard'
import OutputCard from './OutputCard'
import CounterStat from './CounterStat'
import AgentConstellation from './AgentConstellation'

/* ------------------------------------------------------------------ */
/*  Agent node layout (matches AgentConstellation.tsx)                  */
/* ------------------------------------------------------------------ */

const NODE_LABELS = [
  'RESEARCH',
  'FINANCIAL ANALYSIS',
  'MARKET CONTEXT',
  'RISK ASSESSMENT',
  'SYNTHESIS',
  'IC MEMO',
]

const NODE_ANGLES = [0, 60, 120, 180, 240, 300]
const NODE_RADII = [0.62, 0.58, 0.6, 0.62, 0.58, 0.6]

type NodeStatus = 'queued' | 'running' | 'complete'

/* ------------------------------------------------------------------ */
/*  Helper: compute node screen position (mirrors canvas logic)        */
/* ------------------------------------------------------------------ */

function getNodeScreenPos(
  index: number,
  containerWidth: number,
  containerHeight: number,
  expand: number,
) {
  const cx = containerWidth / 2
  const cy = containerHeight / 2
  const r = Math.min(containerWidth, containerHeight) / 2
  const angle = NODE_ANGLES[index]
  const radius = NODE_RADII[index]
  const rad = ((angle - 90) * Math.PI) / 180
  const dist = r * radius * expand
  return {
    x: cx + Math.cos(rad) * dist,
    y: cy + Math.sin(rad) * dist,
  }
}

/* ------------------------------------------------------------------ */
/*  SVG Progress Ring                                                   */
/* ------------------------------------------------------------------ */

function ProgressRing({
  x,
  y,
  progress,
  status,
  visible,
}: {
  x: number
  y: number
  progress: number
  status: NodeStatus
  visible: boolean
}) {
  const ringSize = 48
  const r = 18
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - progress)

  const statusClass =
    status === 'complete'
      ? styles.ringComplete
      : status === 'running'
        ? styles.ringRunning
        : styles.ringQueued

  return (
    <svg
      className={`${styles.progressRing} ${visible ? styles.progressRingVisible : ''}`}
      width={ringSize}
      height={ringSize}
      style={{ left: x, top: y }}
      viewBox={`0 0 ${ringSize} ${ringSize}`}
    >
      <circle className={styles.ringBg} cx={ringSize / 2} cy={ringSize / 2} r={r} />
      <circle
        className={`${styles.ringFill} ${statusClass}`}
        cx={ringSize / 2}
        cy={ringSize / 2}
        r={r}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({
  x,
  y,
  status,
  visible,
}: {
  x: number
  y: number
  status: NodeStatus
  visible: boolean
}) {
  const statusClass =
    status === 'complete'
      ? styles.statusComplete
      : status === 'running'
        ? styles.statusRunning
        : styles.statusQueued

  const text = status === 'complete' ? 'COMPLETE' : status === 'running' ? 'RUNNING' : 'QUEUED'

  return (
    <div
      className={`${styles.statusBadge} ${visible ? styles.statusBadgeVisible : ''} ${statusClass}`}
      style={{ left: x, top: y + 32 }}
    >
      {text}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Section Component                                             */
/* ------------------------------------------------------------------ */

export default function HyperscaleAgentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })

  /* Detect reduced motion preference */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Track container size for node positioning */
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setContainerSize({ w: width, h: height })
    })
    ro.observe(inner)
    return () => ro.disconnect()
  }, [])

  /* IntersectionObserver — detect when section is in viewport */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Scroll-driven progress (pure scroll listener, no GSAP needed for the math) */
  useEffect(() => {
    if (prefersReducedMotion) return

    const el = sectionRef.current
    if (!el) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const totalScroll = el.offsetHeight - window.innerHeight
        if (totalScroll <= 0) {
          ticking = false
          return
        }
        const rawProgress = -rect.top / totalScroll
        const clamped = Math.max(0, Math.min(1, rawProgress))
        setScrollProgress(clamped)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReducedMotion])

  /* Dynamically import and register GSAP + ScrollTrigger (only on client, only when needed) */
  useEffect(() => {
    if (prefersReducedMotion) return
    let cancelled = false

    ;(async () => {
      try {
        const gsapModule = await import('gsap')
        const stModule = await import('gsap/ScrollTrigger')
        if (cancelled) return
        const gsap = gsapModule.default || gsapModule
        const ScrollTrigger = stModule.ScrollTrigger || stModule.default
        gsap.registerPlugin(ScrollTrigger)
      } catch {
        /* GSAP not available — scroll listener fallback is active */
      }
    })()

    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion])

  /* ---- Derived state from scroll progress ---- */

  // Act boundaries: 0-0.2, 0.2-0.5, 0.5-0.8, 0.8-1.0
  const act1 = Math.max(0, Math.min(1, scrollProgress / 0.2))
  const act2 = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.3))
  const act3 = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.3))
  const act4 = Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.2))

  // Typing in act 1: first 60% of act1
  const typingProgress = Math.min(1, act1 / 0.6)

  // Prompt card shatters at start of act 2
  const promptShattered = act2 > 0.1

  // Constellation expand: act 2 ramps up
  const expandProgress = Math.max(0, Math.min(1, act2 * 1.5))

  // Flow particles: act 3
  const flowProgress = act3

  // Counter progress: act 3
  const counterProgress = act3

  // Node statuses based on act 3 progress
  const getNodeStatus = useCallback(
    (index: number): NodeStatus => {
      const stagger = index * 0.12
      const nodeP = Math.max(0, Math.min(1, (act3 - stagger) / 0.5))
      if (nodeP >= 1) return 'complete'
      if (nodeP > 0) return 'running'
      return 'queued'
    },
    [act3],
  )

  // Node ring progress
  const getNodeRingProgress = useCallback(
    (index: number): number => {
      const stagger = index * 0.12
      return Math.max(0, Math.min(1, (act3 - stagger) / 0.5))
    },
    [act3],
  )

  // Act layer opacities (cross-fade)
  const act1Opacity = act1 > 0 ? (act2 > 0.3 ? Math.max(0, 1 - (act2 - 0.3) / 0.3) : 1) : 0
  const act2Opacity =
    act2 > 0 ? Math.min(1, act2 * 3) * (act4 > 0.3 ? Math.max(0, 1 - (act4 - 0.3) / 0.4) : 1) : 0
  const act3Opacity =
    act3 > 0
      ? Math.min(1, act3 * 3) * (act4 > 0.3 ? Math.max(0, 1 - (act4 - 0.3) / 0.4) : 1)
      : 0
  const act4Opacity = act4 > 0 ? Math.min(1, act4 * 2.5) : 0

  /* Headline sizes responsive to viewport */
  const headlineClass = 'c-title-2'
  const bigHeadlineClass = 'c-title-1'

  /* Node screen positions for overlays */
  const nodePositions =
    containerSize.w > 0
      ? NODE_LABELS.map((_, i) =>
          getNodeScreenPos(i, containerSize.w, containerSize.h, expandProgress),
        )
      : []

  /* ---- Reduced motion: static layout ---- */
  if (prefersReducedMotion) {
    return (
      <>
        <section className={styles.mobileSection}>
          <div className={styles.mobileInner}>
            <div className={styles.mobileAct}>
              <div className={styles.tagLine}>HYPERSCALE AGENTS</div>
              <h2 className={`${headlineClass} ${styles.headlinePrimary}`}>
                We created a new oxymoron:
              </h2>
              <h2 className={`${bigHeadlineClass} ${styles.headlineBold}`}>Impossible tasks.</h2>
            </div>
            <div className={styles.mobileNodesGrid}>
              {NODE_LABELS.map((label) => (
                <div key={label} className={styles.mobileNode}>
                  <div className={styles.mobileNodeDot} />
                  <div className={styles.mobileNodeLabel}>{label}</div>
                </div>
              ))}
            </div>
            <div className={styles.mobileAct} style={{ color: 'rgba(255,255,255,0.7)' }}>
              <p className="c-text-3">
                Unlimited context window. Zero hallucinations. Integrate with anything.
              </p>
            </div>
            <div className={styles.mobileCounters}>
              <CounterStat target={847} label="documents processed" progress={1} />
              <CounterStat target={12400} label="sources analyzed" progress={1} />
              <CounterStat target={0} label="hallucinations" progress={1} />
            </div>
            <OutputCard />
            <div className={styles.mobileAct}>
              <p className={`c-text-3`} style={{ color: 'rgba(255,255,255,0.7)' }}>
                Solving your most challenging problems is now just a part of your daily routine.
              </p>
              <a href="/demo" className={styles.ctaButton}>
                See it in action
              </a>
            </div>
          </div>
        </section>
      </>
    )
  }

  /* ---- Full animated experience (desktop) ---- */
  return (
    <>
      {/* Desktop: scroll-pinned */}
      <div ref={sectionRef} className={styles.sectionOuter}>
        <div ref={innerRef} className={styles.sectionInner}>
          {/* ====== ACT 1: The Impossible Task ====== */}
          <div
            className={styles.actLayer}
            style={{ opacity: act1Opacity }}
          >
            <div className={styles.promptWrap}>
              <PromptCard typingProgress={typingProgress} shattered={promptShattered} />
              <div
                className={styles.tagLine}
                style={{ opacity: Math.min(1, act1 * 2), transform: `translateY(${(1 - Math.min(1, act1 * 2)) * 12}px)` }}
              >
                HYPERSCALE AGENTS
              </div>
              <h2
                className={`${headlineClass} ${styles.headlinePrimary}`}
                style={{
                  opacity: Math.max(0, Math.min(1, (act1 - 0.4) / 0.3)),
                  transform: `translateY(${Math.max(0, (1 - Math.min(1, (act1 - 0.4) / 0.3))) * 20}px)`,
                }}
              >
                We created a new oxymoron:
              </h2>
              <h2
                className={`${bigHeadlineClass} ${styles.headlineBold}`}
                style={{
                  opacity: Math.max(0, Math.min(1, (act1 - 0.6) / 0.3)),
                  transform: `translateY(${Math.max(0, (1 - Math.min(1, (act1 - 0.6) / 0.3))) * 30}px)`,
                }}
              >
                Impossible tasks.
              </h2>
            </div>
          </div>

          {/* ====== ACT 2 + 3: Constellation + Execution ====== */}
          <div
            className={styles.actLayer}
            style={{ opacity: act2Opacity }}
          >
            <div className={styles.constellationWrap}>
              {/* Canvas (agent nodes + edges + particles) */}
              <AgentConstellation
                expandProgress={expandProgress}
                flowProgress={flowProgress}
                active={isInView && act2 > 0}
              />

              {/* Node labels overlay (HTML on top of canvas) */}
              <div className={styles.nodeLabels}>
                {nodePositions.map((pos, i) => (
                  <div
                    key={NODE_LABELS[i]}
                    className={`${styles.nodeLabel} ${expandProgress > 0.3 ? styles.nodeLabelVisible : ''}`}
                    style={{ left: pos.x, top: pos.y - 30 }}
                  >
                    {NODE_LABELS[i]}
                  </div>
                ))}

                {/* Progress rings (Act 3) */}
                {nodePositions.map((pos, i) => (
                  <ProgressRing
                    key={`ring-${i}`}
                    x={pos.x}
                    y={pos.y}
                    progress={getNodeRingProgress(i)}
                    status={getNodeStatus(i)}
                    visible={act3 > 0}
                  />
                ))}

                {/* Status badges (Act 3) */}
                {nodePositions.map((pos, i) => (
                  <StatusBadge
                    key={`status-${i}`}
                    x={pos.x}
                    y={pos.y}
                    status={getNodeStatus(i)}
                    visible={act3 > 0.05}
                  />
                ))}
              </div>

              {/* Copy overlay */}
              <div
                className={styles.constellationCopy}
                style={{
                  opacity: Math.min(1, act2 * 2) * (act3 > 0.5 ? Math.max(0, 1 - (act3 - 0.5) * 2) : 1),
                }}
              >
                <p className="c-text-3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Unlimited context window. Zero hallucinations. Integrate with anything.
                </p>
              </div>
            </div>
          </div>

          {/* ====== ACT 3 overlay: Counters ====== */}
          <div
            className={styles.actLayer}
            style={{ opacity: act3Opacity, pointerEvents: 'none' }}
          >
            <div className={styles.countersWrap}>
              <div className={styles.countersRow}>
                <CounterStat
                  target={847}
                  label="documents processed"
                  progress={counterProgress}
                />
                <CounterStat
                  target={12400}
                  label="sources analyzed"
                  progress={counterProgress}
                />
                <CounterStat target={0} label="hallucinations" progress={counterProgress} />
              </div>
            </div>
          </div>

          {/* ====== ACT 4: The Output ====== */}
          <div
            className={styles.actLayer}
            style={{ opacity: act4Opacity }}
          >
            <div className={styles.outputWrap}>
              <OutputCard />
              <h2
                className={`c-text-1 ${styles.headlinePrimary}`}
                style={{
                  opacity: Math.max(0, Math.min(1, (act4 - 0.2) / 0.4)),
                  maxWidth: '48rem',
                }}
              >
                Solving your most challenging problems is now just a part of your daily routine.
              </h2>
              <div
                style={{
                  opacity: Math.max(0, Math.min(1, (act4 - 0.5) / 0.3)),
                  transform: `translateY(${Math.max(0, (1 - Math.min(1, (act4 - 0.5) / 0.3))) * 20}px)`,
                }}
              >
                <a href="/demo" className={styles.ctaButton}>
                  See it in action
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked static layout */}
      <div className={styles.mobileLayout}>
        <section className={styles.mobileSection}>
          <div className={styles.mobileInner}>
            <div className={styles.mobileAct}>
              <div className={styles.tagLine}>HYPERSCALE AGENTS</div>
              <h2 className={`${headlineClass} ${styles.headlinePrimary}`}>
                We created a new oxymoron:
              </h2>
              <h2 className={`${bigHeadlineClass} ${styles.headlineBold}`}>Impossible tasks.</h2>
            </div>
            <PromptCard typingProgress={1} />
            <div className={styles.mobileNodesGrid}>
              {NODE_LABELS.map((label) => (
                <div key={label} className={styles.mobileNode}>
                  <div className={styles.mobileNodeDot} />
                  <div className={styles.mobileNodeLabel}>{label}</div>
                </div>
              ))}
            </div>
            <div className={styles.mobileAct} style={{ color: 'rgba(255,255,255,0.7)' }}>
              <p className="c-text-3">
                Unlimited context window. Zero hallucinations. Integrate with anything.
              </p>
            </div>
            <div className={styles.mobileCounters}>
              <CounterStat target={847} label="documents processed" progress={1} />
              <CounterStat target={12400} label="sources analyzed" progress={1} />
              <CounterStat target={0} label="hallucinations" progress={1} />
            </div>
            <OutputCard />
            <div className={styles.mobileAct}>
              <p className="c-text-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Solving your most challenging problems is now just a part of your daily routine.
              </p>
              <a href="/demo" className={styles.ctaButton}>
                See it in action
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
