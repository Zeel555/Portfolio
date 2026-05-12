import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const PI2 = Math.PI * 2

const stackLabels = [
  { label: 'React', color: '#06B6D4', orbit: 0.18, speed: 0.004 },
  { label: 'Node.js', color: '#6EBF4A', orbit: 1.75, speed: 0.0035 },
  { label: 'FastAPI', color: '#00BFA5', orbit: 3.25, speed: 0.0045 },
  { label: 'MongoDB', color: '#10B981', orbit: 4.65, speed: 0.003 },
  { label: 'TensorFlow', color: '#FF6F00', orbit: 5.75, speed: 0.004 },
]

const palette = ['#7C3AED', '#06B6D4', '#4B8EF1', '#A78BFA', '#10B981', '#F59E0B']

function createSpherePoints(count) {
  const points = []
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * index
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      color: palette[index % palette.length],
      phase: index * 0.37,
      size: index % 9 === 0 ? 2.2 : 1.45,
    })
  }

  return points
}

function project(point, centerX, centerY, radius, rotY, rotX) {
  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const cosX = Math.cos(rotX)
  const sinX = Math.sin(rotX)

  const x1 = point.x * cosY - point.z * sinY
  const z1 = point.x * sinY + point.z * cosY
  const y1 = point.y * cosX - z1 * sinX
  const z2 = point.y * sinX + z1 * cosX
  const perspective = 1.1 + z2 * 0.45

  return {
    x: centerX + x1 * radius * perspective,
    y: centerY + y1 * radius * perspective,
    z: z2,
    alpha: Math.max(0.16, Math.min(1, 0.36 + perspective * 0.44)),
    scale: perspective,
  }
}

function drawOrbital(ctx, centerX, centerY, width, height, angle, color, alpha) {
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.ellipse(0, 0, width, height, 0, 0, PI2)
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 0.8
  ctx.stroke()
  ctx.restore()
}

function drawLabel(ctx, label, x, y, color, alpha) {
  ctx.save()
  ctx.font = '600 11px "Space Grotesk", sans-serif'
  const width = ctx.measureText(label).width + 18
  const height = 24
  ctx.globalAlpha = alpha
  ctx.fillStyle = 'rgba(3,7,18,0.72)'
  ctx.strokeStyle = `${color}66`
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.roundRect(x - width / 2, y - height / 2, width, height, 8)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#E2E8F0'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, x, y + 0.5)
  ctx.restore()
}

function NeuralNetworkViz() {
  const canvasRef = useRef(null)
  const shellRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const shell = shellRef.current
    if (!canvas || !shell) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const points = createSpherePoints(118)
    const links = points
      .map((point, index) => ({ point, index }))
      .filter(({ index }) => index % 3 === 0)
      .map(({ index }) => [index, (index + 17) % points.length])

    let width = 1
    let height = 1
    let frame = 0
    let rafId = 0
    let cancelled = false

    const resize = () => {
      const rect = shell.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      frame += 1
      ctx.clearRect(0, 0, width, height)

      const centerX = width * 0.52
      const centerY = height * 0.51
      const radius = Math.min(width, height) * 0.31
      const rotY = frame * 0.004
      const rotX = -0.28 + Math.sin(frame * 0.006) * 0.05
      const projected = points.map((point) => project(point, centerX, centerY, radius, rotY, rotX))

      const bgGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.08, centerX, centerY, radius * 1.55)
      bgGlow.addColorStop(0, 'rgba(6,182,212,0.22)')
      bgGlow.addColorStop(0.42, 'rgba(124,58,237,0.13)')
      bgGlow.addColorStop(1, 'rgba(2,8,23,0)')
      ctx.fillStyle = bgGlow
      ctx.fillRect(0, 0, width, height)

      drawOrbital(ctx, centerX, centerY, radius * 1.22, radius * 0.34, 0.42 + frame * 0.0015, 'rgba(6,182,212,0.62)', 0.28)
      drawOrbital(ctx, centerX, centerY, radius * 1.28, radius * 0.48, -0.58 - frame * 0.0012, 'rgba(124,58,237,0.72)', 0.24)
      drawOrbital(ctx, centerX, centerY, radius * 0.78, radius * 1.16, 0.1 + frame * 0.001, 'rgba(148,163,184,0.48)', 0.18)

      links.forEach(([aIndex, bIndex], index) => {
        const a = projected[aIndex]
        const b = projected[bIndex]
        const averageDepth = (a.z + b.z) / 2
        const alpha = Math.max(0.035, 0.14 + averageDepth * 0.11)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = index % 2 === 0 ? `rgba(6,182,212,${alpha})` : `rgba(124,58,237,${alpha})`
        ctx.lineWidth = 0.55
        ctx.stroke()
      })

      const ribbonOffset = (frame * 0.012) % PI2
      for (let band = 0; band < 3; band += 1) {
        ctx.beginPath()
        for (let step = 0; step <= 120; step += 1) {
          const t = (step / 120) * PI2
          const point = {
            x: Math.cos(t + ribbonOffset + band * 1.9) * Math.cos(0.5 + band * 0.25),
            y: Math.sin(t * 2 + band) * 0.22,
            z: Math.sin(t + ribbonOffset + band * 1.9),
          }
          const p = project(point, centerX, centerY, radius * 1.04, rotY * 0.7, rotX)
          if (step === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = band === 1 ? 'rgba(124,58,237,0.34)' : 'rgba(6,182,212,0.28)'
        ctx.lineWidth = band === 1 ? 1.5 : 1
        ctx.stroke()
      }

      projected
        .map((point, index) => ({ ...point, source: points[index] }))
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          const pulse = 0.72 + Math.sin(frame * 0.035 + point.source.phase) * 0.28
          const dotRadius = point.source.size * point.scale * pulse
          const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, dotRadius * 5)
          glow.addColorStop(0, `${point.source.color}AA`)
          glow.addColorStop(0.5, `${point.source.color}22`)
          glow.addColorStop(1, `${point.source.color}00`)
          ctx.globalAlpha = point.alpha
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(point.x, point.y, dotRadius * 5, 0, PI2)
          ctx.fill()
          ctx.fillStyle = point.source.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, dotRadius, 0, PI2)
          ctx.fill()
          ctx.globalAlpha = 1
        })

      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.36)
      coreGlow.addColorStop(0, 'rgba(248,250,252,0.34)')
      coreGlow.addColorStop(0.38, 'rgba(6,182,212,0.18)')
      coreGlow.addColorStop(1, 'rgba(124,58,237,0)')
      ctx.fillStyle = coreGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.36, 0, PI2)
      ctx.fill()

      stackLabels.forEach((item, index) => {
        const theta = item.orbit + frame * item.speed
        const labelRadius = radius * (1.08 + (index % 2) * 0.15)
        const x = centerX + Math.cos(theta) * labelRadius
        const y = centerY + Math.sin(theta) * labelRadius * 0.62
        drawLabel(ctx, item.label, x, y, item.color, 0.84)
      })

      ctx.font = '500 9px "Space Grotesk", sans-serif'
      ctx.fillStyle = 'rgba(148,163,184,0.34)'
      ctx.textAlign = 'center'
      ctx.fillText('REALTIME AI SYSTEM MAP', centerX, height - 26)

      if (!cancelled && !shouldReduceMotion) {
        rafId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [shouldReduceMotion])

  return (
    <div ref={shellRef} className="relative h-full min-h-[400px] w-full overflow-visible">
      <canvas
        ref={canvasRef}
        aria-label="Animated AI neural sphere with connected data nodes"
        role="img"
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-cyan-300/20 bg-slate-950/55 px-4 py-1.5 font-display text-[9px] font-medium uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md">
        Neural intelligence core
      </div>
    </div>
  )
}

export default NeuralNetworkViz
