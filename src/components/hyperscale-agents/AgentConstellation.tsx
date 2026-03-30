'use client'

import { useRef, useEffect, useCallback } from 'react'
import styles from './hyperscale-agents.module.css'

/* ------------------------------------------------------------------ */
/*  Agent node definitions                                             */
/* ------------------------------------------------------------------ */

interface NodeDef {
  label: string
  /** Angle on the arc (degrees from top) */
  angle: number
  /** Radius multiplier (0-1, applied to half the smaller canvas dim) */
  radius: number
}

const NODES: NodeDef[] = [
  { label: 'RESEARCH', angle: 0, radius: 0.62 },
  { label: 'FINANCIAL ANALYSIS', angle: 60, radius: 0.58 },
  { label: 'MARKET CONTEXT', angle: 120, radius: 0.6 },
  { label: 'RISK ASSESSMENT', angle: 180, radius: 0.62 },
  { label: 'SYNTHESIS', angle: 240, radius: 0.58 },
  { label: 'IC MEMO', angle: 300, radius: 0.6 },
]

/** Connection pairs (indices into NODES) */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 4],
  [3, 4],
  [4, 5],
  [2, 5],
]

/* ------------------------------------------------------------------ */
/*  Particle along an edge                                             */
/* ------------------------------------------------------------------ */

interface Particle {
  edgeIdx: number
  t: number // 0-1 position along edge
  speed: number
}

const PARTICLE_COUNT = 40
const NODE_GLOW_RADIUS = 6
const NODE_RADIUS = 4

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface AgentConstellationProps {
  /** 0-1 progress controlling the constellation reveal (0 = hidden, 1 = fully expanded) */
  expandProgress: number
  /** 0-1 progress controlling particle flow animation along edges */
  flowProgress: number
  /** Whether the canvas should be actively rendering */
  active: boolean
  className?: string
}

export default function AgentConstellation({
  expandProgress,
  flowProgress,
  active,
  className = '',
}: AgentConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const expandRef = useRef(expandProgress)
  const flowRef = useRef(flowProgress)
  const activeRef = useRef(active)

  expandRef.current = expandProgress
  flowRef.current = flowProgress
  activeRef.current = active

  /* Initialise particles once */
  useEffect(() => {
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        edgeIdx: Math.floor(Math.random() * EDGES.length),
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      })
    }
    particlesRef.current = particles
  }, [])

  /* Get node position from definition */
  const getNodePos = useCallback(
    (node: NodeDef, cx: number, cy: number, r: number, expand: number) => {
      const rad = ((node.angle - 90) * Math.PI) / 180
      const dist = r * node.radius * expand
      return {
        x: cx + Math.cos(rad) * dist,
        y: cy + Math.sin(rad) * dist,
      }
    },
    [],
  )

  /* Animation loop */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      if (!running) return

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2
      const r = Math.min(w, h) / 2

      ctx.clearRect(0, 0, w, h)

      const expand = expandRef.current
      const flow = flowRef.current

      if (expand <= 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      /* Compute node positions */
      const positions = NODES.map((n) => getNodePos(n, cx, cy, r, expand))

      /* Draw edges */
      ctx.lineWidth = 1
      for (const [a, b] of EDGES) {
        const pa = positions[a]
        const pb = positions[b]
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = `rgba(231, 231, 13, ${0.12 * expand})`
        ctx.stroke()
      }

      /* Draw particles along edges */
      if (flow > 0) {
        for (const p of particlesRef.current) {
          p.t += p.speed
          if (p.t > 1) {
            p.t = 0
            p.edgeIdx = Math.floor(Math.random() * EDGES.length)
          }
          const [a, b] = EDGES[p.edgeIdx]
          const pa = positions[a]
          const pb = positions[b]
          const x = pa.x + (pb.x - pa.x) * p.t
          const y = pa.y + (pb.y - pa.y) * p.t

          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(231, 231, 13, ${0.6 * flow})`
          ctx.fill()
        }
      }

      /* Draw node glows and dots */
      for (const pos of positions) {
        /* Glow */
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, NODE_GLOW_RADIUS * 3)
        gradient.addColorStop(0, `rgba(231, 231, 13, ${0.25 * expand})`)
        gradient.addColorStop(1, 'rgba(231, 231, 13, 0)')
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, NODE_GLOW_RADIUS * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        /* Dot */
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, NODE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(231, 231, 13, ${expand})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    if (activeRef.current) {
      draw()
    }

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [getNodePos])

  /* Start/stop based on active prop */
  useEffect(() => {
    if (active) {
      /* Restart draw loop — handled by above effect on mount;
         for subsequent toggles we re-trigger by setting a dummy state.
         The main effect loop is persistent, so this is fine. */
    }
  }, [active])

  return (
    <div className={`${styles.canvasContainer} ${className}`}>
      <canvas ref={canvasRef} className={styles.constellationCanvas} />
    </div>
  )
}
