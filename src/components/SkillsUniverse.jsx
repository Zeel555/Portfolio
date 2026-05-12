import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

gsap.registerPlugin(ScrollTrigger)

const PI2 = Math.PI * 2

const NODES = [
  { id: 'js', lb: 'JavaScript', col: '#F7DF1E', layer: 0, z: 0.95, imp: 1.0 },
  { id: 'py', lb: 'Python', col: '#4B8EF1', layer: 0, z: 0.85, imp: 1.0 },
  { id: 'ts', lb: 'TypeScript', col: '#A78BFA', layer: 0, z: 0.75, imp: 0.8 },
  { id: 'react', lb: 'React', col: '#06B6D4', layer: 1, z: 0.9, imp: 1.0 },
  { id: 'next', lb: 'Next.js', col: '#e2e8f0', layer: 1, z: 0.7, imp: 0.85 },
  { id: 'node', lb: 'Node.js', col: '#6EBF4A', layer: 1, z: 0.88, imp: 1.0 },
  { id: 'expr', lb: 'Express', col: '#94A3B8', layer: 1, z: 0.6, imp: 0.7 },
  { id: 'tf', lb: 'TensorFlow', col: '#FF6F00', layer: 1, z: 0.85, imp: 1.0 },
  { id: 'fast', lb: 'FastAPI', col: '#00BFA5', layer: 1, z: 0.72, imp: 0.8 },
  { id: 'gsap', lb: 'GSAP', col: '#7C3AED', layer: 1, z: 0.65, imp: 0.75 },
  { id: 'mongo', lb: 'MongoDB', col: '#10B981', layer: 2, z: 0.88, imp: 1.0 },
  { id: 'pg', lb: 'PostgreSQL', col: '#4A90D9', layer: 2, z: 0.78, imp: 0.9 },
  { id: 'aws', lb: 'AWS', col: '#FF9900', layer: 2, z: 0.82, imp: 0.9 },
  { id: 'docker', lb: 'Docker', col: '#2496ED', layer: 2, z: 0.72, imp: 0.85 },
  { id: 'redis', lb: 'Redis', col: '#E53E3E', layer: 2, z: 0.62, imp: 0.7 },
]

const CONNS = [
  { a: 'js', b: 'react', w: 1.0 },
  { a: 'js', b: 'next', w: 0.8 },
  { a: 'js', b: 'node', w: 1.0 },
  { a: 'js', b: 'expr', w: 0.7 },
  { a: 'js', b: 'gsap', w: 0.8 },
  { a: 'py', b: 'tf', w: 1.0 },
  { a: 'py', b: 'fast', w: 0.85 },
  { a: 'ts', b: 'react', w: 0.9 },
  { a: 'ts', b: 'next', w: 0.85 },
  { a: 'ts', b: 'node', w: 0.8 },
  { a: 'react', b: 'mongo', w: 0.8 },
  { a: 'react', b: 'pg', w: 0.7 },
  { a: 'next', b: 'mongo', w: 0.8 },
  { a: 'next', b: 'pg', w: 0.75 },
  { a: 'next', b: 'redis', w: 0.6 },
  { a: 'node', b: 'mongo', w: 1.0 },
  { a: 'node', b: 'pg', w: 0.8 },
  { a: 'node', b: 'aws', w: 0.85 },
  { a: 'node', b: 'docker', w: 0.8 },
  { a: 'node', b: 'redis', w: 0.75 },
  { a: 'expr', b: 'mongo', w: 0.85 },
  { a: 'expr', b: 'pg', w: 0.75 },
  { a: 'tf', b: 'aws', w: 0.9 },
  { a: 'tf', b: 'docker', w: 0.85 },
  { a: 'fast', b: 'pg', w: 0.85 },
  { a: 'fast', b: 'mongo', w: 0.8 },
  { a: 'fast', b: 'docker', w: 0.75 },
  { a: 'gsap', b: 'aws', w: 0.5 },
]

import {
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiTypescript,
  SiNodedotjs, SiExpress, SiFastapi, SiPython, SiSocketdotio,
  SiTensorflow, SiOpencv, SiScikitlearn, SiPandas, SiNumpy,
  SiMongodb, SiPostgresql, SiFirebase, SiRedis,
  SiGit, SiDocker, SiVercel, SiFigma, SiPostman, SiGithub
} from 'react-icons/si'
import { TbApi, TbBrandFramerMotion } from 'react-icons/tb'
import { MdOutlineWaves } from 'react-icons/md'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { VscCode } from 'react-icons/vsc'

const STACK_TABS = [
  {
    id: 'frontend',
    label: 'Frontend',
    atmosphere: 'rgba(6,182,212,0.04)',
    hoverColor: '#06B6D4',
    hoverBorder: 'rgba(6,182,212,0.5)',
    hoverBg: 'rgba(6,182,212,0.06)',
    hoverShadow: '0 0 20px rgba(6,182,212,0.1)',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'GSAP', icon: <TbBrandFramerMotion /> },
      { name: 'Framer Motion', icon: <SiFramer /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    atmosphere: 'rgba(124,58,237,0.04)',
    hoverColor: '#A78BFA',
    hoverBorder: 'rgba(124,58,237,0.5)',
    hoverBg: 'rgba(124,58,237,0.06)',
    hoverShadow: '0 0 20px rgba(124,58,237,0.1)',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'REST APIs', icon: <TbApi /> },
      { name: 'WebSocket', icon: <MdOutlineWaves /> },
      { name: 'Socket.io', icon: <SiSocketdotio /> },
    ],
  },
  {
    id: 'aiml',
    label: 'AI/ML',
    atmosphere: 'rgba(59,130,246,0.04)',
    hoverColor: '#60A5FA',
    hoverBorder: 'rgba(59,130,246,0.5)',
    hoverBg: 'rgba(59,130,246,0.06)',
    hoverShadow: '0 0 20px rgba(59,130,246,0.1)',
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
      { name: 'Mistral AI', icon: <HiOutlineLightningBolt /> },
      { name: 'Whisper', icon: <HiOutlineLightningBolt /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'NumPy', icon: <SiNumpy /> },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    atmosphere: 'rgba(16,185,129,0.04)',
    hoverColor: '#34D399',
    hoverBorder: 'rgba(16,185,129,0.5)',
    hoverBg: 'rgba(16,185,129,0.06)',
    hoverShadow: '0 0 20px rgba(16,185,129,0.1)',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Redis', icon: <SiRedis /> },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    atmosphere: 'rgba(245,158,11,0.04)',
    hoverColor: '#FCD34D',
    hoverBorder: 'rgba(245,158,11,0.5)',
    hoverBg: 'rgba(245,158,11,0.06)',
    hoverShadow: '0 0 20px rgba(245,158,11,0.1)',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'VS Code', icon: <VscCode /> },
      { name: 'GitHub', icon: <SiGithub /> },
    ],
  },
]

function getVC() {
  return CONNS
}

function nd(id) {
  return NODES.find((n) => n.id === id)
}

const revealVariant = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: MOTION_DURATION.reveal, ease: MOTION_EASE_STANDARD },
  },
}

function FloatingOrb({ className, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={shouldReduceMotion ? undefined : { y: [0, -14, 0], opacity: [0.04, 0.065, 0.04] }}
      transition={{ delay, duration: 12, ease: 'easeInOut', repeat: Infinity }}
    />
  )
}

function SkillPill({ active, skill, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      key={skill.name}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.045, duration: 0.25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-2 overflow-hidden rounded-[10px] border px-[18px] py-3 font-display text-sm font-medium transition-all duration-200"
      style={{
        background: isHovered ? active.hoverBg : 'rgba(255,255,255,0.02)',
        borderColor: isHovered ? active.hoverBorder : 'rgba(255,255,255,0.06)',
        boxShadow: isHovered ? active.hoverShadow : 'none',
        color: isHovered ? active.hoverColor : '#94A3B8',
      }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        initial={false}
        animate={isHovered ? { x: ['-120%', '260%'] } : { x: '-120%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <span className="relative z-10 shrink-0 text-lg opacity-80" style={{ color: isHovered ? active.hoverColor : 'inherit' }}>
        {skill.icon}
      </span>
      <span className="relative z-10">{skill.name}</span>
    </motion.span>
  )
}

export default function SkillsUniverse() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const stateRef = useRef({ hov: null, pulses: [], frame: 0 })
  const shouldReduceMotion = useReducedMotion()
  const [activeStackTab, setActiveStackTab] = useState('frontend')

  const activeStack = STACK_TABS.find((t) => t.id === activeStackTab) || STACK_TABS[0]

  useEffect(() => {
    NODES.forEach((n) => {
      if (n.driftT === undefined) {
        n.driftT = Math.random() * PI2
        n.driftS = 0.28 + Math.random() * 0.32
        n.driftA = 2.5 + Math.random() * 4
        n.ox = 0
        n.oy = 0
        n.pulse = Math.random() * PI2
      }
    })
  }, [])

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.to('.skills-universe-glow', {
        yPercent: 8,
        opacity: 0.82,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [shouldReduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let W = 0
    let H = 0
    let cancelled = false
    let rafId = 0

    function layoutNodes() {
      const LX = [W * 0.14, W * 0.5, W * 0.86]
      ;[0, 1, 2].forEach((layer) => {
        const arr = NODES.filter((n) => n.layer === layer)
        arr.forEach((n, i) => {
          n.bx = LX[layer]
          n.by = (H / (arr.length + 1)) * (i + 1)
        })
      })
    }

    function nodeR(n) {
      const base = n.layer === 1 ? 6.5 : 7.5
      return base * n.imp * (0.85 + n.z * 0.15)
    }

    function nx(n) {
      return (n.bx || 0) + (n.ox || 0)
    }

    function ny(n) {
      return (n.by || 0) + (n.oy || 0)
    }

    function nodeAnchor(n) {
      const x = nx(n)
      const y = ny(n)
      const r = nodeR(n)
      return { x, y, r }
    }

    function spawnPulse() {
      const s = stateRef.current
      const vc = getVC()
      if (!vc.length) return
      const c = vc[Math.floor(Math.random() * vc.length)]
      const a = nd(c.a)
      const b = nd(c.b)
      if (!a || !b) return
      s.pulses.push({
        ax: nx(a),
        ay: ny(a),
        bx: nx(b),
        by: ny(b),
        col: a.col,
        t: 0,
        spd: 0.005 + Math.random() * 0.004,
        w: c.w,
        za: a.z,
      })
    }

    function toHex(alpha) {
      return Math.round(Math.max(0, Math.min(1, alpha)) * 255)
        .toString(16)
        .padStart(2, '0')
    }

    function drawFrame() {
      if (!W || !H) return
      const s = stateRef.current
      s.frame += 1
      ctx.clearRect(0, 0, W, H)

      NODES.forEach((n) => {
        n.driftT = (n.driftT || 0) + 0.007 * (n.driftS || 0.3)
        n.ox = Math.sin(n.driftT) * (n.driftA || 3)
        n.oy = Math.cos(n.driftT * 0.68) * (n.driftA || 3) * 0.55
        n.pulse = (n.pulse || 0) + 0.035
      })

      if (!shouldReduceMotion) {
        if (s.frame % 30 === 0) spawnPulse()
        if (s.frame % 58 === 0 && Math.random() > 0.4) spawnPulse()
      }

      const vn = NODES
      const vc = getVC()
      const { hov } = s

      const isLit = (n) => {
        if (!hov) return true
        if (n.id === hov) return true
        return vc.some((c) => (c.a === hov && c.b === n.id) || (c.b === hov && c.a === n.id))
      }

      const connLit = (c) => !hov || c.a === hov || c.b === hov

      vc.forEach((c) => {
        const a = nd(c.a), b = nd(c.b)
        if (!a || !b) return
        const ax = nx(a), ay = ny(a), bx = nx(b), by = ny(b)
        if (!ax || !ay || !bx || !by) return

        const lit = connLit(c)
        const isL1 = a.layer === 0

        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = isL1
          ? `rgba(124, 58, 237, ${lit ? 0.35 : 0.06})`
          : `rgba(6, 182, 212, ${lit ? 0.25 : 0.05})`
        ctx.lineWidth = lit ? 1 : 0.5
        ctx.stroke()
      })

      s.pulses = s.pulses.filter((p) => p.t <= 1)
      s.pulses.forEach((p) => {
        p.t += p.spd
        const t = p.t
        const mx = (p.ax + p.bx) / 2
        const my = (p.ay + p.by) / 2 - 14
        const x = (1 - t) * (1 - t) * p.ax + 2 * (1 - t) * t * mx + t * t * p.bx
        const y = (1 - t) * (1 - t) * p.ay + 2 * (1 - t) * t * my + t * t * p.by
        const rad = 5 * p.za
        const grd = ctx.createRadialGradient(x, y, 0, x, y, rad)
        grd.addColorStop(0, `${p.col}CC`)
        grd.addColorStop(0.4, `${p.col}44`)
        grd.addColorStop(1, `${p.col}00`)
        ctx.beginPath()
        ctx.arc(x, y, rad, 0, PI2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, PI2)
        ctx.fillStyle = `${p.col}FF`
        ctx.fill()
      })

      const sorted = [...vn].sort((a, b) => a.z - b.z)
      sorted.forEach((n) => {
        const { x, y, r: r0 } = nodeAnchor(n)
        const lit = isLit(n)
        const isH = n.id === hov
        const r = r0 * (isH ? 1.2 : 1)
        const depthFade = 0.38 + n.z * 0.62
        const baseA = lit ? depthFade : depthFade * 0.18

        if (n.z < 0.72) {
          const bgR = r * 5
          const bg = ctx.createRadialGradient(x, y, 0, x, y, bgR)
          bg.addColorStop(0, `${n.col}${toHex(baseA * 0.18)}`)
          bg.addColorStop(1, `${n.col}00`)
          ctx.beginPath()
          ctx.arc(x, y, bgR, 0, PI2)
          ctx.fillStyle = bg
          ctx.fill()
        }

        const glowR = r * (isH ? 4.5 : 3.2) * n.imp
        const glow = ctx.createRadialGradient(x, y, r * 0.35, x, y, glowR)
        glow.addColorStop(0, `${n.col}${toHex(baseA * 0.5)}`)
        glow.addColorStop(0.5, `${n.col}${toHex(baseA * 0.1)}`)
        glow.addColorStop(1, `${n.col}00`)
        ctx.beginPath()
        ctx.arc(x, y, glowR, 0, PI2)
        ctx.fillStyle = glow
        ctx.fill()

        if (isH || n.imp >= 1.0) {
          const pA = isH ? 0.4 : 0.09
          const pR = r + 2.5 + Math.sin(n.pulse) * 2
          ctx.beginPath()
          ctx.arc(x, y, pR, 0, PI2)
          ctx.strokeStyle = `${n.col}${toHex(pA * (isH ? 1 : 0.45))}`
          ctx.lineWidth = isH ? 1 : 0.45
          ctx.stroke()
        }

        ctx.globalAlpha = baseA
        ctx.beginPath()
        ctx.arc(x, y, r, 0, PI2)
        ctx.fillStyle = n.col
        ctx.fill()
        ctx.globalAlpha = 1

        if (n.z > 0.68) {
          ctx.beginPath()
          ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.18, 0, PI2)
          ctx.fillStyle = `rgba(255,255,255,${baseA * 0.28})`
          ctx.fill()
        }

        ctx.font = `500 9px 'Space Grotesk', sans-serif`
        ctx.fillStyle = lit ? 'rgba(148,163,184,0.55)' : 'rgba(71,85,105,0.45)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(n.lb, x, y + r + 5)
      })
    }

    function loop() {
      if (cancelled) return
      drawFrame()
      rafId = requestAnimationFrame(loop)
      animRef.current = rafId
    }

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      W = Math.max(1, rect.width)
      H = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layoutNodes()
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const found = NODES.find((n) => {
        const { x, y, r } = nodeAnchor(n)
        const hitR = r * 1.2 * 2.8
        return (mx - x) ** 2 + (my - y) ** 2 < hitR ** 2
      })
      stateRef.current.hov = found ? found.id : null
      canvas.style.cursor = found ? 'pointer' : 'default'
    }

    function onLeave() {
      stateRef.current.hov = null
    }

    resize()
    if (shouldReduceMotion) {
      drawFrame()
    } else {
      loop()
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [shouldReduceMotion])

  return (
    <section
      id="skills-universe"
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-1px] z-20 h-24 bg-gradient-to-b from-[#020817] via-[#020817]/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,8,23,0.95),rgba(2,8,23,0.88)_50%,rgba(2,8,23,0.96))]" />
      <div className="skills-universe-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_42%),radial-gradient(circle_at_20%_60%,rgba(6,182,212,0.08),transparent_35%)] opacity-75" />
      <FloatingOrb className="pointer-events-none absolute left-[-5%] top-[20%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-500 opacity-[0.05] blur-[100px]" />
      <FloatingOrb className="pointer-events-none absolute bottom-[10%] right-[-5%] -z-10 h-[250px] w-[250px] rounded-full bg-cyan-400 opacity-[0.04] blur-[80px]" delay={2} />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
          variants={revealVariant}
          className="mb-10 text-center"
        >
          <div className="mb-5 inline-flex rounded-full border border-violet-200/20 bg-white/[0.035] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/90 backdrop-blur-xl">
            Neural stack
          </div>
          <h2
            className="font-display font-medium leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Skills Universe
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-display text-base text-slate-400 sm:text-lg">
            Tools and technologies that power intelligent products, organized the way I think about the stack.
          </p>
        </motion.div>


        <div className="text-center">
          <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1.5">
            {STACK_TABS.map((tab) => {
              const isActive = activeStackTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveStackTab(tab.id)}
                  className="skill-tab rounded-full border px-4 py-2 font-display text-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))'
                      : 'transparent',
                    borderColor: isActive ? 'rgba(124,58,237,0.4)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_0_54px_rgba(2,8,23,0.46)] backdrop-blur-xl sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 transition duration-500"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${activeStack.atmosphere}, transparent 62%)`,
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStackTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative flex flex-wrap justify-center gap-3"
            >
              {activeStack.skills.map((skill, index) => (
                <SkillPill active={activeStack} index={index} key={skill} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
          <p className="relative mt-6 text-center font-display text-xs text-slate-500">
            Neural pathways respond below — hover nodes to trace the graph.
          </p>
        </div>

        <h3 className="mt-14 text-center font-display text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
          Live neural map
        </h3>
        <p className="mx-auto mt-2 max-w-md text-center font-display text-xs text-slate-500">
          Hover a node to trace its connections through the stack.
        </p>

        <div className="relative mx-auto mt-6 max-w-[920px] overflow-hidden rounded-[1.25rem] border border-violet-500/20 bg-slate-950/70 shadow-[0_0_54px_rgba(2,8,23,0.46)] backdrop-blur-xl">
          <canvas ref={canvasRef} className="block h-[min(480px,52vw)] min-h-[380px] w-full sm:min-h-[420px]" />
        </div>

        <div className="mx-auto mt-2 flex max-w-[920px]">
          {['LAYER 1 · LANGUAGES', 'LAYER 2 · FRAMEWORKS', 'LAYER 3 · INFRA & DB'].map((l) => (
            <div
              key={l}
              className="flex-1 text-center font-display text-[9px] tracking-[0.14em] text-slate-500/40"
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-24 bg-gradient-to-b from-transparent via-[#020817]/65 to-[#020817]" />
    </section>
  )
}
