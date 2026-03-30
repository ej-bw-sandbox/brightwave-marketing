'use client'

import { useRef, useEffect, useCallback } from 'react'
import styles from './hyperscale-hero.module.css'

/* ---------- geometry helpers ---------- */

interface NodePos {
  x: number
  y: number
}

const NODE_LABELS = [
  'RESEARCH',
  'DATA EXTRACTION',
  'FINANCIAL ANALYSIS',
  'MARKET CONTEXT',
  'RISK ASSESSMENT',
  'SYNTHESIS',
  'IC MEMO',
]

const NODE_XS = [0.08, 0.20, 0.33, 0.50, 0.67, 0.80, 0.92]

/** Sub-agent offsets relative to parent node (angle in radians, distance) */
function getSubAgentOffsets(nodeIndex: number, total: number): { angle: number; dist: number }[] {
  const centerBias = (nodeIndex - (total - 1) / 2) / ((total - 1) / 2)
  const baseAngle = Math.PI / 2 + centerBias * 0.6
  const spread = 0.55
  const count = nodeIndex === 3 ? 4 : 3
  const offsets: { angle: number; dist: number }[] = []
  for (let i = 0; i < count; i++) {
    const a = baseAngle + (i - (count - 1) / 2) * spread
    offsets.push({ angle: a, dist: 36 + (i % 2) * 16 })
  }
  return offsets
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function bezierPoint(
  t: number,
  x0: number, y0: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x3: number, y3: number,
): [number, number] {
  const it = 1 - t
  return [
    it * it * it * x0 + 3 * it * it * t * cx1 + 3 * it * t * t * cx2 + t * t * t * x3,
    it * it * it * y0 + 3 * it * it * t * cy1 + 3 * it * t * t * cy2 + t * t * t * y3,
  ]
}

function drawPartialBezier(
  ctx: CanvasRenderingContext2D,
  x0: number, y0: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x3: number, y3: number,
  progress: number,
) {
  if (progress <= 0) return
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  const steps = 48
  const maxStep = Math.floor(steps * Math.min(progress, 1))
  for (let s = 1; s <= maxStep; s++) {
    const t = s / steps
    const [px, py] = bezierPoint(t, x0, y0, cx1, cy1, cx2, cy2, x3, y3)
    ctx.lineTo(px, py)
  }
  ctx.stroke()
}

/* ---------- component ---------- */

interface BranchCanvasProps {
  /** 0..1 overall scroll progress */
  scrollProgress: number
  /** callback to report computed node positions */
  onNodePositions?: (positions: NodePos[]) => void
  reducedMotion: boolean
  /** which node indices are currently active (for glow) */
  activeNodeIndices?: number[]
  /** callback to report merge point and output card target Y for line drawing */
  onMergePoint?: (point: { x: number; y: number }) => void
}

export function BranchCanvas({
  scrollProgress,
  onNodePositions,
  reducedMotion,
  activeNodeIndices = [],
}: BranchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef<NodePos[]>([])
  const rafRef = useRef<number>(0)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    // Fix 1: Always set canvas size and clear completely
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const p = scrollProgress
    const nodeCount = 7
    const cx = w / 2

    // Layout constants
    const stemTopY = h * 0.08
    const splitY = h * 0.55
    const nodeY = h * 0.75
    // Merge point: center of canvas (Fix 2)
    const mergeX = w * 0.5
    const mergeY = h * 0.5
    // Output card top edge position (for the descending line)
    const outputCardTopY = h * 0.82

    // Compute node positions
    const nodes: NodePos[] = NODE_XS.map((xPct) => ({
      x: w * xPct,
      y: nodeY,
    }))

    // Report positions
    if (onNodePositions) {
      const changed =
        posRef.current.length !== nodes.length ||
        posRef.current.some(
          (prev, i) =>
            Math.abs(prev.x - nodes[i].x) > 1 ||
            Math.abs(prev.y - nodes[i].y) > 1,
        )
      if (changed) {
        posRef.current = nodes
        onNodePositions(nodes)
      }
    }

    // Shared styles
    const brandYellow = '#e7e70d'
    const lineColor = 'rgba(231, 231, 13, 0.5)'
    const lineActiveColor = 'rgba(231, 231, 13, 0.95)'
    const dimColor = 'rgba(231, 231, 13, 0.18)'

    // Active node set for quick lookup (Fix 4)
    const activeSet = new Set(activeNodeIndices)
    const hasActiveNodes = activeSet.size > 0

    // Convergence progress (Fix 2): scroll 65% -> 85%
    const convergenceProgress = p > 0.65 ? Math.min((p - 0.65) / 0.20, 1) : 0

    // ==========================================
    // Phase 1: Stem Down (scroll 0 -> 15%)
    // ==========================================
    if (p > 0 && p <= 1) {
      const stemProgress = Math.min(p / 0.15, 1)
      const stemEndY = stemTopY + (splitY - stemTopY) * stemProgress

      ctx.save()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1.5
      ctx.shadowColor = brandYellow
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.moveTo(cx, stemTopY)
      ctx.lineTo(cx, stemEndY)
      ctx.stroke()
      ctx.restore()
    }

    // ==========================================
    // Phase 2: Fan Out + Convergence Merge (scroll 15% -> 85%)
    // Fix 2: Instead of retracting arcs backward, lerp endpoints toward MERGE_POINT
    // Fix 1: Only ONE set of arcs drawn (no duplicate Phase 5 lines)
    // ==========================================
    if (p > 0.15 && convergenceProgress < 1) {
      const fanBase = Math.min((p - 0.15) / 0.25, 1) // 0->1 over 15%-40%

      for (let i = 0; i < nodeCount; i++) {
        // Stagger: left-to-right
        const delay = i / (nodeCount * 1.8)
        const arcProg = Math.max(0, Math.min(1, (fanBase - delay) / (1 - delay)))
        if (arcProg <= 0) continue

        // Fix 4: Check if this node is in the active pair
        const isActive = activeSet.has(i)
        const isActivePhase = hasActiveNodes && p > 0.40 && p < 0.65

        // Arc bezier: from split point to node position
        const fromX = cx
        const fromY = splitY
        const baseToX = nodes[i].x
        const baseToY = nodes[i].y

        // Fix 2: During convergence, lerp endpoints toward merge point
        const toX = convergenceProgress > 0 ? lerp(baseToX, mergeX, convergenceProgress) : baseToX
        const toY = convergenceProgress > 0 ? lerp(baseToY, mergeY, convergenceProgress) : baseToY

        const dx = toX - fromX
        const dy = toY - fromY

        // Control points: curve bows outward and downward (fountain spray)
        // During convergence, flatten the control points proportionally
        const cpX1 = fromX + dx * 0.15
        const cpY1 = fromY + dy * 0.7
        const cpX2 = fromX + dx * 0.65
        const cpY2 = fromY + dy * 1.15

        ctx.save()
        if (isActive && isActivePhase) {
          ctx.strokeStyle = lineActiveColor
          ctx.lineWidth = 2.2
          ctx.shadowColor = brandYellow
          ctx.shadowBlur = 12
        } else if (isActivePhase) {
          ctx.strokeStyle = dimColor
          ctx.lineWidth = 1
          ctx.shadowBlur = 0
        } else {
          ctx.strokeStyle = lineColor
          ctx.lineWidth = 1.5
          ctx.shadowColor = brandYellow
          ctx.shadowBlur = 4
        }

        // During convergence, fade arcs slightly
        if (convergenceProgress > 0) {
          ctx.globalAlpha = 1 - convergenceProgress * 0.3
        }

        drawPartialBezier(ctx, fromX, fromY, cpX1, cpY1, cpX2, cpY2, toX, toY, arcProg)
        ctx.restore()

        // Draw node circle at arc tip (only when not converging significantly)
        if (arcProg > 0.85 && convergenceProgress < 0.7) {
          const nodeScale = Math.min(1, (arcProg - 0.85) / 0.15)
          // Fade out during convergence (Fix 2)
          const nodeOpacity = convergenceProgress > 0 ? Math.max(0, 1 - convergenceProgress * 1.5) : 1
          if (nodeOpacity <= 0) continue

          const radius = isActive && isActivePhase ? 23 : 20
          const [tipX, tipY] = bezierPoint(
            arcProg, fromX, fromY, cpX1, cpY1, cpX2, cpY2, toX, toY,
          )

          ctx.save()
          ctx.globalAlpha = nodeOpacity
          ctx.beginPath()
          ctx.arc(tipX, tipY, radius * nodeScale, 0, Math.PI * 2)
          if (isActive && isActivePhase) {
            ctx.strokeStyle = brandYellow
            ctx.lineWidth = 2.5
            ctx.shadowColor = brandYellow
            ctx.shadowBlur = 20
          } else if (isActivePhase) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
            ctx.lineWidth = 1.5
            ctx.shadowBlur = 0
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
            ctx.lineWidth = 2
            ctx.shadowBlur = 0
          }
          ctx.fillStyle = 'rgba(10, 10, 10, 0.85)'
          ctx.fill()
          ctx.stroke()
          ctx.restore()

          // Draw label below node
          if (nodeScale > 0.5 && nodeOpacity > 0.3) {
            ctx.save()
            ctx.globalAlpha = nodeOpacity * nodeScale * (isActivePhase && !isActive ? 0.3 : 0.75)
            ctx.font = '600 9px sans-serif'
            ctx.letterSpacing = '1.2px'
            ctx.fillStyle = isActive && isActivePhase ? brandYellow : 'rgba(255, 255, 255, 0.65)'
            ctx.textAlign = 'center'
            ctx.fillText(NODE_LABELS[i], tipX, tipY + radius * nodeScale + 16)
            ctx.restore()
          }
        }
      }
    }

    // ==========================================
    // Phase 3: Sub-Agent Clusters (scroll 40% -> 65%)
    // ==========================================
    if (p > 0.40 && p < 0.65) {
      const act3Progress = (p - 0.40) / 0.25

      for (let i = 0; i < nodeCount; i++) {
        const nodePhaseStart = i / nodeCount
        const nodePhaseEnd = (i + 1.3) / nodeCount
        const subProg = Math.max(0, Math.min(1, (act3Progress - nodePhaseStart) / (nodePhaseEnd - nodePhaseStart)))
        if (subProg <= 0) continue

        const offsets = getSubAgentOffsets(i, nodeCount)
        const parentX = nodes[i].x
        const parentY = nodes[i].y
        const isActive = activeSet.has(i)

        for (let j = 0; j < offsets.length; j++) {
          const { angle, dist } = offsets[j]
          const subDelay = j * 0.15
          const subArcProg = Math.max(0, Math.min(1, (subProg - subDelay) / (1 - subDelay)))
          if (subArcProg <= 0) continue

          const endX = parentX + Math.cos(angle) * dist
          const endY = parentY + Math.sin(angle) * dist
          const midX = parentX + Math.cos(angle) * dist * 0.5
          const midY = parentY + Math.sin(angle) * dist * 0.5

          ctx.save()
          ctx.strokeStyle = isActive
            ? 'rgba(231, 231, 13, 0.55)'
            : 'rgba(231, 231, 13, 0.15)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(parentX, parentY)
          const drawEndX = parentX + (endX - parentX) * subArcProg
          const drawEndY = parentY + (endY - parentY) * subArcProg
          ctx.quadraticCurveTo(midX, midY, drawEndX, drawEndY)
          ctx.stroke()
          ctx.restore()

          // Sub-agent mini node
          if (subArcProg > 0.7) {
            const miniScale = Math.min(1, (subArcProg - 0.7) / 0.3)
            const miniR = 8 * miniScale
            ctx.save()
            ctx.beginPath()
            ctx.arc(drawEndX, drawEndY, miniR, 0, Math.PI * 2)
            ctx.fillStyle = isActive
              ? 'rgba(231, 231, 13, 0.2)'
              : 'rgba(231, 231, 13, 0.07)'
            ctx.fill()
            ctx.strokeStyle = isActive
              ? 'rgba(231, 231, 13, 0.5)'
              : 'rgba(231, 231, 13, 0.12)'
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // ==========================================
    // Phase 5: Output line from merge point down (scroll 85% -> 100%)
    // Fix 5: Single line descends from merge point to output card top
    // Fix 1: No duplicate convergence lines - arcs already merged above
    // ==========================================
    if (p > 0.85) {
      const outProg = Math.min((p - 0.85) / 0.15, 1)

      // At this point convergenceProgress = 1, all arcs have merged to mergePoint
      // Draw a single vertical line from merge point down to output card
      ctx.save()
      ctx.strokeStyle = `rgba(231, 231, 13, ${0.6 * outProg})`
      ctx.lineWidth = 1.5
      ctx.shadowColor = brandYellow
      ctx.shadowBlur = 8

      const lineEndY = mergeY + (outputCardTopY - mergeY) * outProg

      ctx.beginPath()
      ctx.moveTo(mergeX, mergeY)
      ctx.lineTo(mergeX, lineEndY)
      ctx.stroke()

      // Small glow dot at the descending tip
      ctx.beginPath()
      ctx.arc(mergeX, lineEndY, 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(231, 231, 13, ${0.8 * outProg})`
      ctx.fill()

      ctx.restore()

      // Also keep the single merged vertical line from junction to merge point visible
      ctx.save()
      ctx.strokeStyle = `rgba(231, 231, 13, ${0.5})`
      ctx.lineWidth = 1.5
      ctx.shadowColor = brandYellow
      ctx.shadowBlur = 4
      ctx.beginPath()
      ctx.moveTo(cx, splitY)
      ctx.lineTo(cx, mergeY)
      ctx.stroke()
      ctx.restore()
    }
  }, [scrollProgress, onNodePositions, dpr, activeNodeIndices])

  // Fix 1: Use rAF with proper cancellation to avoid multiple draw loops
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      draw()
      rafRef.current = 0
    })
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [draw])

  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        draw()
        rafRef.current = 0
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={styles.branchCanvas}
      aria-hidden="true"
    />
  )
}
