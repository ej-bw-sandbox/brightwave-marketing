'use client'

import styles from './hyperscale-hero.module.css'

export const AGENTS = [
  { id: 'research', label: 'RESEARCH', desc: 'Analyzing 847 documents across 12 sources...' },
  { id: 'data-extraction', label: 'DATA EXTRACTION', desc: 'Extracting financial data from 23 CIMs...' },
  { id: 'financial-analysis', label: 'FINANCIAL ANALYSIS', desc: 'Building comparable company models for 8 targets...' },
  { id: 'market-context', label: 'MARKET CONTEXT', desc: 'Mapping sector dynamics across 4 verticals...' },
  { id: 'risk-assessment', label: 'RISK ASSESSMENT', desc: 'Evaluating 31 risk factors per candidate...' },
  { id: 'synthesis', label: 'SYNTHESIS', desc: 'Cross-referencing findings from 6 agent outputs...' },
  { id: 'ic-memo', label: 'IC MEMO', desc: 'Composing investment committee memorandum...' },
] as const

export type AgentId = (typeof AGENTS)[number]['id']

interface AgentNodeProps {
  index: number
  label: string
  visible: boolean
  active: boolean
  x: number
  y: number
  reducedMotion: boolean
}

export function AgentNode({
  label,
  visible,
  active,
  x,
  y,
  reducedMotion,
}: AgentNodeProps) {
  const scale = visible ? 1 : 0
  const transition = reducedMotion ? 'none' : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease'

  return (
    <div
      className={styles.agentNode}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition,
      }}
      aria-hidden={!visible}
    >
      <div
        className={`${styles.agentCircle} ${active ? styles.agentCircleActive : ''}`}
      />
      <span className={styles.agentLabel}>{label}</span>
    </div>
  )
}
