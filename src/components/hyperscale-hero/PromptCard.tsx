'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './hyperscale-hero.module.css'

const PROMPT_TEXT =
  'Screen every inbound CIM from this quarter and build an investment committee memo for the top 3.'

interface PromptCardProps {
  /** 0 = fully visible, 1 = fully dissolved into tree */
  dissolve: number
  reducedMotion: boolean
}

export function PromptCard({ dissolve, reducedMotion }: PromptCardProps) {
  const [typed, setTyped] = useState('')
  const idx = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setTyped(PROMPT_TEXT)
      return
    }
    const tick = () => {
      idx.current += 1
      setTyped(PROMPT_TEXT.slice(0, idx.current))
      if (idx.current < PROMPT_TEXT.length) {
        timer.current = setTimeout(tick, 28 + Math.random() * 22)
      }
    }
    timer.current = setTimeout(tick, 600)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [reducedMotion])

  const opacity = 1 - dissolve
  const scale = 1 - dissolve * 0.15

  return (
    <div
      className={styles.promptCard}
      style={{
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: dissolve > 0.5 ? 'none' : 'auto',
      }}
      aria-hidden={dissolve > 0.5}
    >
      <div className={styles.promptText}>
        {typed}
        <span
          className={styles.cursor}
          style={reducedMotion ? { animation: 'none', opacity: 0 } : undefined}
        />
      </div>
      <div className={styles.promptActions}>
        <button className={styles.promptBtn} aria-label="Attach file" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className={styles.promptBtn} aria-label="Submit prompt" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
