'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import styles from './hyperscale-agents.module.css'

interface CounterStatProps {
  /** Final target value */
  target: number
  /** Label shown below the number */
  label: string
  /** 0-1 progress driving the counter */
  progress: number
  /** Optional prefix (e.g. "$") */
  prefix?: string
  /** Number formatting — add commas by default */
  formatNumber?: (n: number) => string
  /** Font size class override */
  sizeClass?: string
}

function defaultFormat(n: number): string {
  return n.toLocaleString('en-US')
}

export default function CounterStat({
  target,
  label,
  progress,
  prefix = '',
  formatNumber = defaultFormat,
  sizeClass = 'c-title-2',
}: CounterStatProps) {
  const current = Math.round(progress * target)

  return (
    <div className={styles.counterItem}>
      <div className={`${styles.counterValue} ${sizeClass}`}>
        {prefix}
        {formatNumber(current)}
      </div>
      <div className={styles.counterLabel}>{label}</div>
    </div>
  )
}
