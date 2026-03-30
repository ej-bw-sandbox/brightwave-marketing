'use client'

import styles from './hyperscale-hero.module.css'

interface OutputCardProps {
  visible: boolean
  progress: number
  reducedMotion: boolean
}

export function OutputCard({ visible, progress, reducedMotion }: OutputCardProps) {
  const scale = visible ? 1 : 0.85
  const opacity = visible ? 1 : 0

  return (
    <div
      className={styles.outputCard}
      style={{
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: reducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-hidden={!visible}
    >
      <div className={styles.outputCardGlow} />
      <div className={styles.outputCardInner}>
        <span className={styles.outputLabel}>OUTPUT ARTIFACT</span>
        <h3 className={styles.outputTitle}>Investment Committee Memo — Q1 2026</h3>
        <div className={styles.outputMeta}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M2 4h12M2 8h12M2 12h8" stroke="#e7e70d" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span>Brightwave Private Markets</span>
        </div>
        <div className={styles.outputTimestamp}>
          Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className={styles.outputPreview}>
          <div className={styles.outputLine} style={{ width: '100%' }} />
          <div className={styles.outputLine} style={{ width: '85%' }} />
          <div className={styles.outputLine} style={{ width: '92%' }} />
          <div className={styles.outputLine} style={{ width: '60%' }} />
          <div className={styles.outputLineSpacer} />
          <div className={styles.outputLine} style={{ width: '100%' }} />
          <div className={styles.outputLine} style={{ width: '78%' }} />
          <div className={styles.outputLine} style={{ width: '95%' }} />
        </div>
      </div>
    </div>
  )
}
