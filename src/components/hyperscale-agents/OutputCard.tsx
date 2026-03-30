'use client'

import styles from './hyperscale-agents.module.css'

interface OutputCardProps {
  className?: string
}

export default function OutputCard({ className = '' }: OutputCardProps) {
  return (
    <div className={`${styles.outputCard} ${className}`}>
      <div className={styles.outputGlow} />
      <div className={styles.outputCardHeader}>
        <div className={styles.outputLogo}>
          <div className={styles.outputLogoInner} />
        </div>
        <div className={styles.outputType}>Brightwave Artifact</div>
      </div>
      <div className={styles.outputTitle}>
        Investment Committee Memo: Q1 Inbound CIM Review — Top 3 Recommendations
      </div>
      <div className={styles.outputMeta}>
        Generated Mar 28, 2026 &middot; 47 pages &middot; 12 exhibits
      </div>
      <div className={styles.outputDivider} />
      {/* Skeleton preview lines */}
      <div className={styles.outputPreviewLine} />
      <div className={styles.outputPreviewLine} />
      <div className={`${styles.outputPreviewLine} ${styles.outputPreviewLineShort}`} />
    </div>
  )
}
