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

/** Compute a smooth fade-in/out opacity for a copy moment */
function copyOpacity(progress: number, fadeIn: number, holdStart: number, holdEnd: number, fadeOut: number): number {
  if (progress < fadeIn) return 0
  if (progress < holdStart) return (progress - fadeIn) / (holdStart - fadeIn)
  if (progress < holdEnd) return 1
  if (progress < fadeOut) return 1 - (progress - holdEnd) / (fadeOut - holdEnd)
  return 0
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
  const p = progress

  // Act 1: Prompt dissolves
  const promptDissolve = clamp(p / 0.08, 0, 1)

  // Act 3: active agent index (40-65%)
  const act3Range = clamp((p - 0.40) / 0.25, 0, 1)
  const activeNodeIndex = act3Range > 0 && act3Range < 1
    ? Math.min(Math.floor(act3Range * AGENTS.length), AGENTS.length - 1)
    : -1
  const showInfoCard = act3Range > 0 && act3Range < 1

  // Act 4: retraction (65-85%)
  const retractProgress = clamp((p - 0.65) / 0.20, 0, 1)

  // Act 5: output (85-100%)
  const showOutput = p > 0.85

  // Node visibility: appear when arcs finish, disappear when retracted
  const nodeVisibility = useMemo(() => {
    return AGENTS.map((_, i) => {
      const fanBase = clamp((p - 0.15) / 0.25, 0, 1)
      const delay = i / (AGENTS.length * 1.8)
      const arcProg = Math.max(0, Math.min(1, (fanBase - delay) / (1 - delay)))
      const visible = arcProg > 0.85

      // Hide during retraction
      if (p > 0.65) {
        const retractBase = Math.min((p - 0.65) / 0.20, 1)
        const retractDelay = (AGENTS.length - 1 - i) / (AGENTS.length * 1.5)
        const retraction = Math.max(0, Math.min(1, (retractBase - retractDelay) / (1 - retractDelay)))
        if (retraction > 0.7) return false
      }
      return visible
    })
  }, [p])

  /* ---- Copy moments ---- */
  // Copy 1: "Unlimited context window." (22-32%)
  const copy1Opacity = copyOpacity(p, 0.20, 0.22, 0.30, 0.32)
  // Copy 2: "Zero hallucinations." (35-45%)
  const copy2Opacity = copyOpacity(p, 0.33, 0.35, 0.43, 0.45)
  // Copy 3: "Integrate with anything." (48-58%)
  const copy3Opacity = copyOpacity(p, 0.46, 0.48, 0.56, 0.58)
  // Copy 4: Final closing (88-100%)
  const copy4Opacity = copyOpacity(p, 0.86, 0.88, 0.98, 1.01)

  // Canvas dimming during copy moments
  const anyCopyActive = Math.max(copy1Opacity, copy2Opacity, copy3Opacity)
  const canvasOpacity = anyCopyActive > 0
    ? 1 - anyCopyActive * 0.8 // dim to 20% when copy is fully visible
    : 1

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
            <span className={styles.headlineRegular}>Hyperscale Agents created a new oxymoron:</span>
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
              <span className={styles.headlineRegular}>Hyperscale Agents created a new oxymoron:</span>
              <span className={styles.headlineBold}>IMPOSSIBLE TASKS</span>
            </div>
            <PromptCard dissolve={promptDissolve} reducedMotion={false} />
          </div>

          {/* Copy moments on mobile - stacked */}
          {copy1Opacity > 0 && (
            <div className={styles.copyOverlay} style={{ opacity: copy1Opacity }}>
              <div className={styles.copyPhrase}>
                <span className={styles.copyWhite}>Unlimited</span>
                <span className={styles.copyWhite}>context window.</span>
              </div>
            </div>
          )}

          {copy2Opacity > 0 && (
            <div className={styles.copyOverlay} style={{ opacity: copy2Opacity }}>
              <div className={styles.copyPhrase}>
                <span className={styles.copyYellow}>Zero</span>
                <span className={styles.copyWhite}>hallucinations.</span>
              </div>
            </div>
          )}

          {copy3Opacity > 0 && (
            <div className={styles.copyOverlay} style={{ opacity: copy3Opacity }}>
              <div className={styles.copyPhrase}>
                <span className={styles.copyWhite}>Integrate</span>
                <span className={styles.copyWhiteLight}>with anything.</span>
              </div>
            </div>
          )}

          {/* Mobile agent pills */}
          {promptDissolve > 0.5 && retractProgress < 0.6 && anyCopyActive < 0.3 && (
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

          {/* Active info card (mobile) */}
          {showInfoCard && activeAgent && anyCopyActive < 0.3 && (
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

          {/* Act 5 mobile */}
          {showOutput && (
            <div className={styles.mobileOutputWrap} style={{ opacity: clamp((p - 0.85) / 0.1, 0, 1) }}>
              <div className={styles.outputStatic}>
                <span className={styles.outputLabel}>OUTPUT ARTIFACT</span>
                <h3 className={styles.outputTitle}>Investment Committee Memo — Q1 2026</h3>
                <p className={styles.outputTimestamp}>
                  Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}

          {/* Final copy + CTA (mobile) */}
          {copy4Opacity > 0 && (
            <div className={styles.closingOverlay} style={{ opacity: copy4Opacity }}>
              <div className={styles.closingPhrase}>
                <span className={styles.copyWhite}>Solving your most challenging</span>
                <span className={styles.copyYellow}>problems is now the new normal.</span>
              </div>
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
          style={{ opacity: 1 - clamp(p / 0.15, 0, 1) * 0.7 }}
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
          <span className={styles.headlineRegular}>Hyperscale Agents created a new oxymoron:</span>
          <span className={styles.headlineBold}>IMPOSSIBLE TASKS</span>
        </div>

        {/* Prompt card */}
        <PromptCard dissolve={promptDissolve} reducedMotion={false} />

        {/* Branch canvas - dims during copy moments */}
        <BranchCanvas
          scrollProgress={p}
          onNodePositions={handleNodePositions}
          reducedMotion={false}
          canvasOpacity={canvasOpacity}
        />

        {/* Agent nodes overlay (positioned by canvas coordinates) */}
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
        {showInfoCard && activeAgent && activePos && anyCopyActive < 0.3 && (
          <AgentInfoCard
            agentName={activeAgent.label}
            description={activeAgent.desc}
            visible={showInfoCard}
            x={activePos.x}
            y={activePos.y + 52}
            reducedMotion={false}
          />
        )}

        {/* ========= COPY OVERLAYS ========= */}

        {/* Copy Moment 1: "Unlimited context window." */}
        {copy1Opacity > 0 && (
          <div className={styles.copyOverlay} style={{ opacity: copy1Opacity }}>
            <div className={styles.copyPhrase}>
              <span className={styles.copyWhite}>Unlimited</span>
              <span className={styles.copyWhite}>context window.</span>
            </div>
          </div>
        )}

        {/* Copy Moment 2: "Zero hallucinations." */}
        {copy2Opacity > 0 && (
          <div className={styles.copyOverlay} style={{ opacity: copy2Opacity }}>
            <div className={styles.copyPhrase}>
              <span className={styles.copyYellow}>Zero</span>
              <span className={styles.copyWhite}>hallucinations.</span>
            </div>
          </div>
        )}

        {/* Copy Moment 3: "Integrate with anything." */}
        {copy3Opacity > 0 && (
          <div className={styles.copyOverlay} style={{ opacity: copy3Opacity }}>
            <div className={styles.copyPhrase}>
              <span className={styles.copyWhite}>Integrate</span>
              <span className={styles.copyWhiteLight}>with anything.</span>
            </div>
          </div>
        )}

        {/* Output card */}
        <OutputCard
          visible={showOutput}
          progress={p > 0.85 ? (p - 0.85) / 0.15 : 0}
          reducedMotion={false}
        />

        {/* Copy Moment 4: Final closing + CTA */}
        {copy4Opacity > 0 && (
          <div className={styles.closingOverlay} style={{ opacity: copy4Opacity }}>
            <div className={styles.closingPhrase}>
              <span className={styles.copyWhite}>Solving your most challenging</span>
              <span className={styles.copyYellow}>problems is now the new normal.</span>
            </div>
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
