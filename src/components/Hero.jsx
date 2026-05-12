import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import NeuralNetworkViz from './NeuralNetworkViz'
import './Hero.css'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

const navLinks = [
  { label: 'Stats', href: '#stats' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills-universe' },
  { label: 'Projects', href: '#projects' },
  { label: 'Proof', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
]

const softEase = MOTION_EASE_STANDARD

const heroStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.14,
      staggerChildren: 0.13,
    },
  },
}

const badgeMotion = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: softEase },
  },
}

const lineMotion = {
  hidden: { opacity: 0, y: 44, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: softEase },
  },
}

const contentMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.reveal, ease: softEase },
  },
}

function floatingAnimation(shouldReduceMotion, x = 0, y = 0) {
  if (shouldReduceMotion) {
    return {}
  }
  return { x: [0, x, 0], y: [0, y, 0] }
}

function FloatingAccent({ className, delay = 0, x = 0, y = -14, duration = 14 }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={floatingAnimation(shouldReduceMotion, x, y)}
      transition={{ delay, duration, ease: 'easeInOut', repeat: Infinity }}
    />
  )
}

function Logo() {
  return (
    <div className="relative flex items-center justify-center group pointer-events-none">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] blur-[14px] opacity-25 group-hover:opacity-50 transition-opacity duration-500 rounded-full" />
      
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Animated Outer Orbital */}
        <motion.circle 
          cx="50" cy="50" r="46" 
          stroke="url(#logoGrad)" 
          strokeWidth="1.5" 
          strokeDasharray="10 15" 
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Logo Mark - Stylized JS */}
        <path 
          d="M35 30 L45 30 L45 60 C45 70 35 75 25 70" 
          stroke="url(#logoGrad)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          filter="url(#logoGlow)"
        />
        <path 
          d="M55 70 C55 70 75 75 75 55 C75 35 55 35 55 35 C55 35 75 35 75 15" 
          stroke="url(#logoGrad)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          filter="url(#logoGlow)"
        />
        
        <text 
          x="50" y="55" 
          textAnchor="middle" 
          fill="white" 
          style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-2px' }}
          className="opacity-90"
        >
          JS
        </text>
      </svg>
    </div>
  )
}

function PremiumNav() {
  return (
    <motion.nav
      aria-label="Primary navigation"
      className="mx-auto flex max-w-7xl items-center justify-between gap-3 py-4 sm:py-7"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softEase }}
    >
      <a
        href="#home"
        className="group flex min-h-11 shrink-0 items-center gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
      >
        <Logo />
        <span className="hidden font-display text-[17px] font-bold tracking-tight text-white sm:inline bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Jeel Sadariya
        </span>
      </a>

      <div className="hidden min-w-0 items-center gap-1 rounded-full border border-white/10 bg-slate-950/30 p-1 text-sm text-slate-300 shadow-[0_0_40px_rgba(124,58,237,0.1)] backdrop-blur-xl md:flex">
        {navLinks.map((item) => (
          <a
            className="rounded-full px-4 py-2 font-display text-[13px] font-medium text-slate-400 transition duration-300 hover:bg-white/[0.06] hover:text-cyan-100"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href="mailto:zeelsadariya@gmail.com?subject=Resume%20request%20for%20Jeel%20Sadariya"
        className="hidden min-h-11 items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 font-display text-[13px] text-[#94A3B8] transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-400 lg:inline-flex"
      >
        <span aria-hidden>CV</span> Request resume
      </a>

      <a
        className="magnetic min-h-11 shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 font-display text-sm font-semibold text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-xl transition duration-300 hover:border-cyan-200/70 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        href="#contact"
      >
        Let&apos;s Build
      </a>
    </motion.nav>
  )
}

function MagneticButton({ children, variant = 'primary' }) {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 170, damping: 18, mass: 0.45 })
  const springY = useSpring(mouseY, { stiffness: 170, damping: 18, mass: 0.45 })
  const sheenX = useTransform(springX, [-18, 18], ['14%', '86%'])

  const handleMouseMove = (event) => {
    if (shouldReduceMotion) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left - rect.width / 2) * 0.22)
    mouseY.set((event.clientY - rect.top - rect.height / 2) * 0.22)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const baseClasses =
    'group relative inline-flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold tracking-wide transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:w-auto'
  const variantClasses =
    variant === 'primary'
      ? 'border border-violet-500/40 bg-[#7C3AED] text-white shadow-[0_0_32px_rgba(124,58,237,0.35)] hover:bg-[#6d28d9] hover:shadow-[0_0_44px_rgba(124,58,237,0.45)]'
      : 'border border-white/[0.15] bg-transparent text-[#94A3B8] shadow-none hover:border-white/25 hover:bg-white/[0.04] hover:text-slate-200'

  return (
    <motion.a
      href={variant === 'primary' ? '#projects' : '#contact'}
      aria-label={typeof children === 'string' ? children : undefined}
      className={`magnetic font-display ${baseClasses} ${variantClasses}`}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
    >
      <motion.span
        className="absolute inset-y-0 w-24 -skew-x-12 bg-white/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ left: sheenX }}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}

function HeroVisual() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <aside className="hero-visual-shell hidden md:block">
      <motion.div
        variants={contentMotion}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -20, 0],
              }
        }
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="absolute -inset-12 rounded-full bg-cyan-300/6 blur-[72px]" />
        <div className="absolute -inset-16 rounded-full bg-violet-500/6 blur-[86px]" />
        <div className="hero-neural-stage relative z-[1] flex items-center justify-center p-0">
          <NeuralNetworkViz />
        </div>
      </motion.div>
    </aside>
  )
}

function Hero() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 text-slate-100 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_80%_45%,rgba(6,182,212,0.12),transparent_28%),linear-gradient(180deg,rgba(2,8,23,0.08),rgba(2,8,23,0.78)_74%,#020817)]" />

      {/* Neural halo — AI cosmos centerpiece */}
      <div
        className="pointer-events-none absolute left-1/2 top-[25%] z-[1] h-28 w-[min(92vw,520px)] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-violet-500/20 via-transparent to-transparent sm:h-32"
        style={{ opacity: 0.04, filter: 'blur(120px)' }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-36 bg-gradient-to-b from-transparent via-[#020817]/72 to-[#020817]" />

      <FloatingAccent
        className="pointer-events-none absolute left-[7%] top-[19%] h-40 w-40 rounded-full border border-cyan-300/14 bg-cyan-300/8 blur-2xl"
        duration={18}
        y={-16}
      />
      <FloatingAccent
        className="pointer-events-none absolute bottom-[13%] right-[9%] h-52 w-52 rounded-full border border-violet-400/14 bg-violet-500/8 blur-3xl"
        delay={1.3}
        duration={20}
        x={-10}
        y={18}
      />
      <FloatingAccent
        className="pointer-events-none absolute right-[20%] top-[24%] hidden h-20 w-20 rounded-full bg-blue-400/10 blur-xl md:block"
        delay={0.8}
        duration={16}
        x={8}
        y={-10}
      />

      <PremiumNav />

      <motion.section
        id="home"
        className="relative mx-auto min-h-[calc(100vh-76px)] max-w-7xl pb-24 pt-6 sm:min-h-[calc(100vh-88px)] sm:pb-28 sm:pt-8 lg:pb-32 lg:pt-10"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 max-w-3xl text-left">
          <motion.div
            className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-violet-300/20 bg-white/[0.045] px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_28px_rgba(124,58,237,0.09)] backdrop-blur-xl sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
            variants={badgeMotion}
          >
            <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(124,58,237,0.82)]" />
            Neural portfolio / AI systems
          </motion.div>

          <h1
            className="hero-title flex max-w-5xl flex-col gap-1 font-display font-bold tracking-normal"
            style={{ lineHeight: 0.98 }}
          >
            <motion.span className="block text-white" style={{ lineHeight: 0.98 }} variants={lineMotion}>
              Hi, I&apos;m Jeel.
            </motion.span>
            <motion.span className="block text-white" style={{ lineHeight: 0.98 }} variants={lineMotion}>
              Building full-stack
            </motion.span>
            <motion.span
              className="block text-[#7C3AED]"
              style={{ lineHeight: 0.98 }}
              variants={lineMotion}
            >
              AI products.
            </motion.span>
          </h1>

          <motion.p
            className="mt-5 max-w-2xl font-display text-base leading-7 text-slate-300/92 sm:mt-6 sm:text-lg sm:leading-8"
            variants={contentMotion}
          >
            Full stack developer and AI/ML engineer from Rajkot, building realtime products, polished interfaces,
            and production-minded systems across React, Node.js, FastAPI, MongoDB, and TensorFlow.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3.5 sm:mt-8 sm:flex-row sm:gap-4"
            variants={contentMotion}
          >
            <MagneticButton variant="primary">Explore Systems</MagneticButton>
            <MagneticButton variant="secondary">Start a Signal</MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center', padding: '0 32px 0 0', minWidth: '120px' }}>
              <div
                style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: '700',
                  color: '#F1F5F9',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: '1',
                }}
              >
                5+
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginTop: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                Projects Built
              </div>
            </div>

            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'rgba(255,255,255,0.08)',
              }}
            />

            <div style={{ textAlign: 'center', padding: '0 32px', minWidth: '120px' }}>
              <div
                style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: '700',
                  color: '#F1F5F9',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: '1',
                }}
              >
                8.20
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginTop: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                CGPA at CHARUSAT
              </div>
            </div>

            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'rgba(255,255,255,0.08)',
              }}
            />

            <div style={{ textAlign: 'center', padding: '0 0 0 32px', minWidth: '120px' }}>
              <div
                style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: '700',
                  color: '#06B6D4',
                  fontFamily: 'Space Grotesk, sans-serif',
                  lineHeight: '1',
                }}
              >
                150+
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginTop: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                DSA Problems
              </div>
            </div>
          </motion.div>
        </div>

        <HeroVisual />
      </motion.section>
    </main>
  )
}

export default Hero
