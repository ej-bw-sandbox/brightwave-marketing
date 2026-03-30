'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { PromptCard } from './PromptCard'
import { BranchCanvas } from './BranchCanvas'
import { AgentNode, AGENTS } from './AgentNode'
import { AgentInfoCard } from './AgentInfoCard'
import { OutputCard } from './OutputCard'
import styles from './hyperscale-hero.module.css'

interface NodePos {
  x: number
  y: number
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export function HyperscaleHero() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [nodePositions, setNodePositions] = useState<NodePos[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number>(0)

  /* ---- mobile detection ---- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ---- scroll tracking ---- */
  useEffect(() => {
    if (reducedMotion) {
      setProgress(0)
      return
    }
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const scrollable = el.scrollHeight - window.innerHeight
        if (scrollable <= 0) { setProgress(0); return }
        const scrolled = -rect.top
        setProgress(clamp(scrolled / scrollable, 0, 1))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  /* ---- derived animation values ---- */
  const promptDissolve = clamp(progress / 0.08, 0, 1)
  const growProgress = clamp((progress - 0.02) / 0.38, 0, 1)
  const act2CopyOpacity = clamp((growProgress - 0.85) / 0.15, 0, 1)

  // Act 3: agent execution 40-75%
  const act3Range = clamp((progress - 0.40) / 0.35, 0, 1)
  const activeNodeIndex = act3Range > 0 && act3Range < 1
    ? Math.min(Math.floor(act3Range * AGENTS.length), AGENTS.length - 1)
    : -1
  const showInfoCard = act3Range > 0 && act3Range < 1

  // Act 4: retraction & output 75-100%
  const retractProgress = clamp((progress - 0.75) / 0.25, 0, 1)
  const showOutput = retractProgress > 0.4

  // Node visibility: appear as arcs finish drawing
  const nodeVisibility = useMemo(() => {
    return AGENTS.map((_, i) => {
      const delay = i / (AGENTS.length * 1.5)
      const baseArc = (growProgress - delay) / (1 - delay)
      const visible = baseArc > 0.85 && retractProgress < 0.8
      return visible
    })
  }, [growProgress, retractProgress])

  // Scroll hint
  const showScrollHint = progress < 0.03

  const handleNodePositions = useCallback((pos: NodePos[]) => {
    setNodePositions(pos)
  }, [])

  /* ---- active agent info ---- */
  const activeAgent = activeNodeIndex >= 0 ? AGENTS[activeNodeIndex] : null
  const activePos = activeNodeIndex >= 0 && nodePositions[activeNodeIndex]
    ? nodePositions[activeNodeIndex]
    : null

  /* ---- reduced motion: static view ---- */
  if (reducedMotion) {
    return (
      <section className={styles.heroSection} style={{ height: 'auto', minHeight: '100vh' }}>
        <div className={styles.stickyFrame}>
          <span className={styles.badge}>HYPERSCALE AGENTS&trade;</span>
          <div className={styles.headline}>
            <span className={styles.headlineRegular}>Hyperscale Agents™ created a new oxymoron:</span>
            <span className={styles.headlineBold}>IMPOSSIBLE TASKS</span>
          </div>
          <div className={styles.mobileAgentGrid}>
            {AGENTS.map((a) => (
              <div key={a.id} className={styles.mobilePill}>{a.label}</div>
            ))}
          </div>
          <p className={styles.act2Copy}>
            Unlimited context window. Zero hallucinations. Integrate with anything.
          </p>
          <div className={styles.outputStatic}>
            <span className={styles.outputLabel}>OUTPUT ARTIFACT</span>
            <h3 className={styles.outputTitle}>Investment Committee Memo — Q1 2026</h3>
          </div>
          <p className={styles.closingCopy}>
            Solving your most challenging problems is now the new normal.
          </p>
          <a href="https://app.brightwave.io/register" className={styles.ctaButton}>
            See it in Action
          </a>
        </div>
      </section>
    )
  }

  /* ---- mobile: simplified layout ---- */
  if (isMobile) {
    return (
      <section className={styles.heroSection} ref={containerRef} style={{ height: '350vh' }}>
        <div className={styles.stickyFrame} ref={stickyRef}>
          {/* Act 1 */}
          <div style={{ opacity: 1 - promptDissolve, transition: 'opacity 0.3s ease' }}>
            <span className={styles.badge}>HYPERSCALE AGENTS&trade;</span>
            <div className={styles.headline}>
              <span className={styles.headlineRegular}>Hyperscale Agents™ created a new oxymoron:</span>
              <span className={styles.headlineBold}>IMPOSSIBLE TASKS</span>
            </div>
            <PromptCard dissolve={promptDissolve} reducedMotion={false} />
          </div>

          {/* Act 2-3 mobile: pill grid */}
          {promptDissolve > 0.5 && retractProgress < 0.6 && (
            <div
              className={styles.mobileAgentGrid}
              style={{ opacity: Math.min(1, (promptDissolve - 0.5) * 4) * (1 - retractProgress) }}
            >
              {AGENTS.map((a, i) => (
                <div
                  key={a.id}
                  className={`${styles.mobilePill} ${i === activeNodeIndex ? styles.mobilePillActive : ''}`}
                >
                  {a.label}
                </div>
              ))}
            </div>
          )}

          {/* Act 2 copy */}
          {act2CopyOpacity > 0 && retractProgress < 0.3 && (
            <p className={styles.act2Copy} style={{ opacity: act2CopyOpacity * (1 - retractProgress * 3) }}>
              Unlimited context window. Zero hallucinations. Integrate with anything.
            </p>
          )}

          {/* Active info card (mobile) */}
          {showInfoCard && activeAgent && (
            <div className={styles.mobileInfoCard} style={{ opacity: 1 }}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoCardName}>{activeAgent.label} AGENT</span>
                <span className={styles.infoCardDots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </span>
              </div>
              <div className={styles.infoCardBody}>{activeAgent.desc}</div>
            </div>
          )}

          {/* Act 4 mobile */}
          {showOutput && (
            <div className={styles.mobileOutputWrap} style={{ opacity: clamp((retractProgress - 0.4) / 0.3, 0, 1) }}>
              <div className={styles.outputStatic}>
                <span className={styles.outputLabel}>OUTPUT ARTIFACT</span>
                <h3 className={styles.outputTitle}>Investment Committee Memo — Q1 2026</h3>
                <p className={styles.outputTimestamp}>
                  Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <p className={styles.closingCopy}>
                Solving your most challenging problems is now the new normal.
              </p>
              <a href="https://app.brightwave.io/register" className={styles.ctaButton}>
                See it in Action
              </a>
            </div>
          )}

          {showScrollHint && (
            <div className={styles.scrollHint}>scroll &#8595;</div>
          )}
        </div>
      </section>
    )
  }

  /* ---- desktop: full canvas experience ---- */
  return (
    <section className={styles.heroSection} ref={containerRef}>
      <div className={styles.stickyFrame} ref={stickyRef}>
        {/* Badge */}
        <span
          className={styles.badge}
          style={{ opacity: 1 - clamp(progress / 0.15, 0, 1) * 0.7 }}
        >
          HYPERSCALE AGENTS&trade;
        </span>

        {/* Headline - fades as prompt dissolves */}
        <div
          className={styles.headline}
          style={{
            opacity: 1 - promptDissolve,
            transform: `translateY(${-promptDissolve * 30}px)`,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          <span className={styles.headlineRegular}>Hyperscale Agents™ created a new oxymoron:</span>
          <span className={styles.headlineBold}>IMPOSSIBLE TASKS</span>
        </div>

        {/* Prompt card */}
        <PromptCard dissolve={promptDissolve} reducedMotion={false} />

        {/* Branch canvas */}
        <BranchCanvas
          growProgress={growProgress}
          retractProgress={retractProgress}
          activeNodeIndex={activeNodeIndex}
          onNodePositions={handleNodePositions}
          reducedMotion={false}
        />

        {/* Agent nodes (positioned by canvas coordinates) */}
        {nodePositions.map((pos, i) => (
          <AgentNode
            key={AGENTS[i].id}
            index={i}
            label={AGENTS[i].label}
            visible={nodeVisibility[i]}
            active={i === activeNodeIndex}
            x={pos.x}
            y={pos.y}
            reducedMotion={false}
          />
        ))}

        {/* Agent info card */}
        {showInfoCard && activeAgent && activePos && (
          <AgentInfoCard
            agentName={activeAgent.label}
            description={activeAgent.desc}
            visible={showInfoCard}
            x={activePos.x}
            y={activePos.y + 52}
            reducedMotion={false}
          />
        )}

        {/* Act 2 copy */}
        {act2CopyOpacity > 0 && retractProgress < 0.3 && (
          <p
            className={styles.act2Copy}
            style={{ opacity: act2CopyOpacity * (1 - retractProgress * 3) }}
          >
            Unlimited context window. Zero hallucinations. Integrate with anything.
          </p>
        )}

        {/* Output card */}
        <OutputCard
          visible={showOutput}
          progress={retractProgress}
          reducedMotion={false}
        />

        {/* Closing copy + CTA */}
        {retractProgress > 0.7 && (
          <div
            className={styles.closingWrap}
            style={{ opacity: clamp((retractProgress - 0.7) / 0.3, 0, 1) }}
          >
            <p className={styles.closingCopy}>
              Solving your most challenging problems is now the new normal.
            </p>
            <a href="https://app.brightwave.io/register" className={styles.ctaButton}>
              See it in Action
            </a>
          </div>
        )}

        {/* Scroll hint */}
        {showScrollHint && (
          <div className={styles.scrollHint}>scroll &#8595;</div>
        )}
      </div>
    </section>
  )
}

