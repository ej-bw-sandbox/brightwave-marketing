'use client'

import { useRef, useEffect, useCallback } from 'react'
import styles from './hyperscale-hero.module.css'

/* ---------- geometry helpers ---------- */

interface NodePos {
  x: number
  y: number
}

function computeLayout(w: number, h: number, nodeCount: number) {
  const cx = w / 2
  const stemBottom = h * 0.85
  const stemTop = h * 0.32
  const nodeY = h * 0.18
  const totalSpread = Math.min(w * 0.85, 1100)
  const startX = cx - totalSpread / 2
  const step = totalSpread / (nodeCount - 1)

  const nodes: NodePos[] = []
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ x: startX + step * i, y: nodeY })
  }

  return { cx, stemBottom, stemTop, nodeY, nodes }
}

function drawCurvedArc(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  progress: number,
) {
  if (progress <= 0) return
  const cpOffsetY = (fromY - toY) * 0.55
  const cpX1 = fromX
  const cpY1 = fromY - cpOffsetY
  const cpX2 = toX
  const cpY2 = toY + cpOffsetY * 0.3

  ctx.beginPath()
  ctx.moveTo(fromX, fromY)

  if (progress >= 1) {
    ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, toX, toY)
  } else {
    // Partial bezier - approximate by splitting
    const steps = 40
    const maxStep = Math.floor(steps * progress)
    for (let s = 1; s <= maxStep; s++) {
      const t = s / steps
      const it = 1 - t
      const px =
        it * it * it * fromX +
        3 * it * it * t * cpX1 +
        3 * it * t * t * cpX2 +
        t * t * t * toX
      const py =
        it * it * it * fromY +
        3 * it * it * t * cpY1 +
        3 * it * t * t * cpY2 +
        t * t * t * toY
      ctx.lineTo(px, py)
    }
  }
  ctx.stroke()
}

/* ---------- component ---------- */

interface BranchCanvasProps {
  /** 0..1 controls how far the tree has grown (Act 2) */
  growProgress: number
  /** 0..1 controls retraction back to center (Act 4) */
  retractProgress: number
  /** index of the currently highlighted node (-1 = none) */
  activeNodeIndex: number
  /** callback to report computed node positions */
  onNodePositions?: (positions: NodePos[]) => void
  reducedMotion: boolean
}

export function BranchCanvas({
  growProgress,
  retractProgress,
  activeNodeIndex,
  onNodePositions,
  reducedMotion,
}: BranchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef<NodePos[]>([])
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const nodeCount = 7
    const layout = computeLayout(w, h, nodeCount)

    // Report positions
    if (onNodePositions) {
      const changed =
        posRef.current.length !== layout.nodes.length ||
        posRef.current.some(
          (p, i) =>
            Math.abs(p.x - layout.nodes[i].x) > 1 ||
            Math.abs(p.y - layout.nodes[i].y) > 1,
        )
      if (changed) {
        posRef.current = layout.nodes
        onNodePositions(layout.nodes)
      }
    }

    // Effective progress after retraction
    const effectiveGrow = growProgress * (1 - retractProgress)

    // Colors
    const lineColor = 'rgba(231, 231, 13, 0.45)'
    const lineActiveColor = 'rgba(231, 231, 13, 0.9)'
    const lineWidth = 1.5

    // Draw stem
    if (effectiveGrow > 0) {
      const stemProgress = Math.min(effectiveGrow / 0.2, 1)
      const stemEndY = layout.stemBottom - (layout.stemBottom - layout.stemTop) * stemProgress
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.moveTo(layout.cx, layout.stemBottom)
      ctx.lineTo(layout.cx, stemEndY)
      ctx.stroke()
    }

    // Draw arcs to nodes
    if (effectiveGrow > 0.15) {
      const arcBase = (effectiveGrow - 0.15) / 0.85
      for (let i = 0; i < nodeCount; i++) {
        const delay = i / (nodeCount * 1.5)
        const arcProg = Math.max(0, Math.min(1, (arcBase - delay) / (1 - delay)))
        if (arcProg <= 0) continue

        const isActive = i === activeNodeIndex
        ctx.strokeStyle = isActive ? lineActiveColor : lineColor
        ctx.lineWidth = isActive ? 2.2 : lineWidth

        drawCurvedArc(
          ctx,
          layout.cx,
          layout.stemTop,
          layout.nodes[i].x,
          layout.nodes[i].y,
          arcProg,
        )
      }
    }

    // Act 4: convergence lines from top to output center
    if (retractProgress > 0.6) {
      const convProg = Math.min(1, (retractProgress - 0.6) / 0.4)
      ctx.strokeStyle = `rgba(231, 231, 13, ${0.3 * convProg})`
      ctx.lineWidth = 1
      const outputY = h * 0.5
      for (let i = 0; i < nodeCount; i++) {
        const fromX = layout.nodes[i].x
        const fromY = layout.nodes[i].y
        drawCurvedArc(ctx, fromX, fromY, layout.cx, outputY, convProg)
      }
    }
  }, [growProgress, retractProgress, activeNodeIndex, onNodePositions, dpr])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const handleResize = () => draw()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={styles.branchCanvas}
      aria-hidden="true"
    />
  )
}
