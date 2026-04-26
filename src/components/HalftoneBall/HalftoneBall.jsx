import { useRef, useEffect, useCallback } from 'react'
import './HalftoneBall.css'

const BLOCK = 8  // pixel art block size
const DISPLAY = 320  // canvas display size

export default function HalftoneBall() {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    blocks: null,
    hovering: false,
    animId: null,
    intensity: 0,
    cols: 0,
    rows: 0,
  })

  const draw = useCallback(() => {
    const s = stateRef.current
    const canvas = canvasRef.current
    if (!canvas || !s.blocks) return
    const ctx = canvas.getContext('2d')
    const size = DISPLAY

    const target = s.hovering ? 1 : 0
    s.intensity += (target - s.intensity) * 0.06

    ctx.clearRect(0, 0, size, size)

    const blockSize = size / s.cols
    const maxShift = blockSize * 0.6 * s.intensity
    const time = performance.now() * 0.004

    for (let r = 0; r < s.rows; r++) {
      for (let c = 0; c < s.cols; c++) {
        const color = s.blocks[r * s.cols + c]
        if (!color) continue

        const x = c * blockSize
        const y = r * blockSize

        let dx = 0, dy = 0
        if (s.intensity > 0.005) {
          dx = Math.sin(time + r * 0.9 + c * 0.4) * maxShift
          dy = Math.cos(time * 0.7 + c * 0.6 + r * 0.5) * maxShift
        }

        ctx.fillStyle = color
        ctx.fillRect(
          Math.round(x + dx),
          Math.round(y + dy),
          Math.ceil(blockSize) + 1,
          Math.ceil(blockSize) + 1
        )
      }
    }

    if (s.intensity > 0.005 || s.hovering) {
      s.animId = requestAnimationFrame(draw)
    } else {
      s.intensity = 0
      s.animId = null
      // Redraw clean
      ctx.clearRect(0, 0, size, size)
      for (let r = 0; r < s.rows; r++) {
        for (let c = 0; c < s.cols; c++) {
          const color = s.blocks[r * s.cols + c]
          if (!color) continue
          ctx.fillStyle = color
          ctx.fillRect(
            Math.round(c * blockSize),
            Math.round(r * blockSize),
            Math.ceil(blockSize) + 1,
            Math.ceil(blockSize) + 1
          )
        }
      }
    }
  }, [])

  const startAnim = useCallback(() => {
    if (!stateRef.current.animId) {
      stateRef.current.animId = requestAnimationFrame(draw)
    }
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = DISPLAY * dpr
    canvas.height = DISPLAY * dpr
    canvas.style.width = DISPLAY + 'px'
    canvas.style.height = DISPLAY + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    // Load image, sample into blocks
    const img = new Image()
    img.src = '/ball-8bit.webp'
    img.onload = () => {
      // Draw image to offscreen canvas to read pixels
      const off = document.createElement('canvas')
      const ow = img.naturalWidth
      const oh = img.naturalHeight
      off.width = ow
      off.height = oh
      const octx = off.getContext('2d')
      octx.drawImage(img, 0, 0)
      const imgData = octx.getImageData(0, 0, ow, oh)

      const cols = Math.ceil(ow / BLOCK)
      const rows = Math.ceil(oh / BLOCK)
      const blocks = new Array(rows * cols).fill(null)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Sample center of each block
          const sx = Math.min(c * BLOCK + Math.floor(BLOCK / 2), ow - 1)
          const sy = Math.min(r * BLOCK + Math.floor(BLOCK / 2), oh - 1)
          const idx = (sy * ow + sx) * 4
          const a = imgData.data[idx + 3]
          if (a < 40) continue
          const red = imgData.data[idx]
          const g = imgData.data[idx + 1]
          const b = imgData.data[idx + 2]
          blocks[r * cols + c] = `rgb(${red},${g},${b})`
        }
      }

      const s = stateRef.current
      s.blocks = blocks
      s.cols = cols
      s.rows = rows

      // Initial draw
      const blockSize = DISPLAY / cols
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const color = blocks[r * cols + c]
          if (!color) continue
          ctx.fillStyle = color
          ctx.fillRect(
            Math.round(c * blockSize),
            Math.round(r * blockSize),
            Math.ceil(blockSize) + 1,
            Math.ceil(blockSize) + 1
          )
        }
      }
    }

    return () => {
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId)
      }
    }
  }, [])

  const onEnter = () => {
    stateRef.current.hovering = true
    startAnim()
  }

  const onLeave = () => {
    stateRef.current.hovering = false
  }

  return (
    <div
      className="halftone"
      aria-hidden="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <canvas
        ref={canvasRef}
        className="halftone__canvas"
      />
    </div>
  )
}
