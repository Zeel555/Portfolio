import { useEffect, useRef } from 'react'

const WIDTH = 340
const HEIGHT = 400

const nodes = [
  { id: 'A', label: 'JavaScript', layer: 1, x: 60, y: 120, color: '#F7DF1E' },
  { id: 'B', label: 'Python', layer: 1, x: 60, y: 250, color: '#3B82F6' },
  { id: 'C', label: 'React', layer: 2, x: 170, y: 76, color: '#06B6D4' },
  { id: 'D', label: 'Node.js', layer: 2, x: 170, y: 134, color: '#6EBF4A' },
  { id: 'E', label: 'Express.js', layer: 2, x: 170, y: 192, color: '#94A3B8' },
  { id: 'F', label: 'TensorFlow', layer: 2, x: 170, y: 250, color: '#FF6F00' },
  { id: 'G', label: 'FastAPI', layer: 2, x: 170, y: 308, color: '#009688' },
  { id: 'H', label: 'MongoDB', layer: 3, x: 280, y: 92, color: '#10B981' },
  { id: 'I', label: 'PostgreSQL', layer: 3, x: 280, y: 164, color: '#336791' },
  { id: 'J', label: 'AWS', layer: 3, x: 280, y: 236, color: '#FF9900' },
  { id: 'K', label: 'Docker', layer: 3, x: 280, y: 308, color: '#2496ED' },
]

const connections = [
  ['A', 'C', 'primary'],
  ['A', 'D', 'primary'],
  ['A', 'E', 'primary'],
  ['B', 'F', 'primary'],
  ['B', 'G', 'primary'],
  ['C', 'H', 'secondary'],
  ['C', 'I', 'secondary'],
  ['D', 'H', 'secondary'],
  ['D', 'I', 'secondary'],
  ['D', 'J', 'secondary'],
  ['D', 'K', 'secondary'],
  ['E', 'H', 'secondary'],
  ['E', 'I', 'secondary'],
  ['F', 'J', 'secondary'],
  ['F', 'K', 'secondary'],
  ['G', 'I', 'secondary'],
  ['G', 'H', 'secondary'],
  ['G', 'K', 'secondary'],
]

const nodeById = new Map(nodes.map((node) => [node.id, node]))

function hexToRgba(hex, alpha) {
  const value = hex.replace('#', '')
  const int = Number.parseInt(value, 16)
  return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`
}

export default function NeuralNetworkViz() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const pulsesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return undefined
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = WIDTH * dpr
    canvas.height = HEIGHT * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let frame = 0

    const spawnPulse = () => {
      const connection = connections[Math.floor(Math.random() * connections.length)]
      pulsesRef.current.push({
        connection,
        progress: 0,
        duration: 60,
      })
    }

    const drawConnection = ([fromId, toId, type]) => {
      const from = nodeById.get(fromId)
      const to = nodeById.get(toId)

      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle =
        type === 'primary' ? 'rgba(124,58,237,0.2)' : 'rgba(6,182,212,0.15)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    const drawPulses = () => {
      pulsesRef.current = pulsesRef.current.filter(
        (pulse) => pulse.progress <= pulse.duration,
      )

      pulsesRef.current.forEach((pulse) => {
        const [fromId, toId, type] = pulse.connection
        const from = nodeById.get(fromId)
        const to = nodeById.get(toId)
        const t = pulse.progress / pulse.duration
        const x = from.x + (to.x - from.x) * t
        const y = from.y + (to.y - from.y) * t
        const color = type === 'primary' ? '#06B6D4' : '#7C3AED'
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 13)

        glow.addColorStop(0, hexToRgba(color, 0.95))
        glow.addColorStop(0.35, hexToRgba(color, 0.35))
        glow.addColorStop(1, hexToRgba(color, 0))

        ctx.beginPath()
        ctx.arc(x, y, 13, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        pulse.progress += 1
      })
    }

    const drawNode = (node) => {
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 18)

      glow.addColorStop(0, hexToRgba(node.color, 0.3))
      glow.addColorStop(1, hexToRgba(node.color, 0))

      ctx.beginPath()
      ctx.arc(node.x, node.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = node.color
      ctx.fill()

      ctx.font = '500 11px Space Grotesk, sans-serif'
      ctx.fillStyle = '#F1F5F9'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y - 14)
    }

    const drawLayerLabels = () => {
      ctx.save()
      ctx.font = '500 9px Space Grotesk, sans-serif'
      ctx.fillStyle = 'rgba(148,163,184,0.4)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('INPUT', 60, 360)
      ctx.fillText('FRAMEWORKS', 170, 360)
      ctx.fillText('OUTPUT', 280, 360)
      ctx.restore()
    }

    const draw = () => {
      frame += 1
      ctx.clearRect(0, 0, WIDTH, HEIGHT)

      ctx.save()
      const ambient = ctx.createRadialGradient(170, 185, 0, 170, 185, 230)
      ambient.addColorStop(0, 'rgba(6,182,212,0.1)')
      ambient.addColorStop(0.5, 'rgba(124,58,237,0.08)')
      ambient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ambient
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      ctx.restore()

      connections.forEach(drawConnection)

      if (frame % 30 === 0) {
        spawnPulse()
      }

      drawPulses()
      nodes.forEach(drawNode)
      drawLayerLabels()

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      pulsesRef.current = []
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: 340,
        height: 400,
        overflow: 'hidden',
        borderRadius: 24,
        border: '1px solid rgba(124,58,237,0.2)',
        background: 'rgba(13,18,36,0.6)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Live neural stack visualization"
        role="img"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 0,
          right: 0,
          textAlign: 'center',
          font: '500 10px Space Grotesk, sans-serif',
          color: 'rgba(148,163,184,0.5)',
          letterSpacing: '0.18em',
        }}
      >
        NEURAL STACK · LIVE
      </div>
    </div>
  )
}
