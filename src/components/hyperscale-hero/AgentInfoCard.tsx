'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './hyperscale-hero.module.css'

interface AgentInfoCardProps {
  agentName: string
  description: string
  visible: boolean
  x: number
  y: number
  reducedMotion: boolean
}

export function AgentInfoCard({
  agentName,
  description,
  visible,
  x,
  y,
  reducedMotion,
}: AgentInfoCardProps) {
  const [typed, setTyped] = useState('')
  const idx = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevName = useRef(agentName)

  useEffect(() => {
    if (prevName.current !== agentName) {
      idx.current = 0
      setTyped('')
      prevName.current = agentName
    }
    if (!visible) return
    if (reducedMotion) {
      setTyped(description)
      return
    }
    const tick = () => {
      idx.current += 1
      setTyped(description.slice(0, idx.current))
      if (idx.current < description.length) {
        timer.current = setTimeout(tick, 18 + Math.random() * 14)
      }
    }
    timer.current = setTimeout(tick, 200)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [visible, agentName, description, reducedMotion])

  const opacity = visible ? 1 : 0
  const translateY = visible ? 0 : -20

  return (
    <div
      className={styles.infoCard}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity,
        transform: `translate(-50%, 0) translateY(${translateY}px)`,
        transition: reducedMotion ? 'none' : 'opacity 0.4s ease, transform 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-hidden={!visible}
    >
      <div className={styles.infoCardHeader}>
        <span className={styles.infoCardName}>{agentName} AGENT</span>
        <span className={styles.infoCardDots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </div>
      <div className={styles.infoCardBody}>
        {typed}
        {visible && typed.length < description.length && (
          <span className={styles.cursor} />
        )}
      </div>
      <div className={styles.infoCardActions}>
        <button className={styles.promptBtn} aria-label="Expand" type="button">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className={styles.promptBtn} aria-label="View detail" type="button">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
