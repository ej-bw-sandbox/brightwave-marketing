'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './hyperscale-agents.module.css'

const PROMPT_TEXT =
  'Screen every inbound CIM from this quarter and build an investment committee memo for the top 3.'

interface PromptCardProps {
  /** 0-1 progress controlling the typing animation */
  typingProgress: number
  /** Whether the card should appear shattered / hidden */
  shattered?: boolean
  className?: string
}

export default function PromptCard({
  typingProgress,
  shattered = false,
  className = '',
}: PromptCardProps) {
  const charCount = Math.floor(typingProgress * PROMPT_TEXT.length)
  const displayText = PROMPT_TEXT.slice(0, charCount)
  const showCursor = typingProgress < 1

  return (
    <div
      className={`${styles.promptCard} ${shattered ? styles.promptCardShatter : ''} ${className}`}
    >
      <div className={styles.promptLabel}>Prompt</div>
      <div className={styles.promptText}>
        {displayText}
        {showCursor && <span className={styles.cursor} aria-hidden="true" />}
      </div>
    </div>
  )
}
