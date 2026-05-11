import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import './Hero.css'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

const navItems = ['About', 'Systems', 'Projects', 'Contact']
const headlineLines = ['Building neural-grade', 'digital systems.']

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

  return {
    x: [0, x, 0],
    y: [0, y, 0],
  }
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

function PremiumNav() {
  return (
    <motion.nav
      aria-label="Primary navigation"
      className="mx-auto flex max-w-7xl items-center justify-between py-4 sm:py-7"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softEase }}
    >
      <a
        href="#home"
        className="group flex min-h-11 items-center gap-3 text-left text-sm font-semibold uppercase tracking-[0.22em] text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:tracking-[0.28em]"
      >
        <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.78)] transition group-hover:scale-110" />
        Neural
      </a>

      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 p-1 text-sm text-slate-300 shadow-[0_0_40px_rgba(124,58,237,0.1)] backdrop-blur-xl md:flex">
        {navItems.map((item, index) => (
          <a
            className={`rounded-full px-5 py-2.5 transition duration-300 hover:bg-white/[0.06] hover:text-cyan-100 ${
              index === 0 ? 'bg-white/[0.055] text-white' : ''
            }`}
            href={`#${item.toLowerCase()}`}
            key={item}
          >
            {item}
          </a>
        ))}
      </div>

      <a
        className="min-h-11 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-xl transition duration-300 hover:border-cyan-200/70 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
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
    'group relative inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold tracking-wide transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:min-h-14 sm:w-auto sm:px-8'
  const variantClasses =
    variant === 'primary'
      ? 'border border-cyan-200/70 bg-cyan-200 text-slate-950 shadow-[0_0_34px_rgba(6,182,212,0.28)] hover:bg-cyan-100 hover:shadow-[0_0_46px_rgba(6,182,212,0.38)]'
      : 'border border-violet-200/20 bg-white/[0.045] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl hover:border-cyan-200/45 hover:bg-white/[0.075] hover:shadow-[0_0_28px_rgba(124,58,237,0.14)]'

  return (
    <motion.a
      href={variant === 'primary' ? '#systems' : '#contact'}
      aria-label={typeof children === 'string' ? children : undefined}
      className={`magnetic ${baseClasses} ${variantClasses}`}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
    >
      <motion.span
        className="absolute inset-y-0 w-24 -skew-x-12 bg-white/30 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
        animate={floatingAnimation(shouldReduceMotion, 0, -10)}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="absolute -inset-8 rounded-full bg-cyan-300/10 blur-2xl" />
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 shadow-[0_24px_86px_rgba(6,182,212,0.14)] backdrop-blur-xl">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-200/10 to-transparent"
            animate={shouldReduceMotion ? undefined : { y: ['-40%', '325%'] }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
          />
          <div className="relative grid h-full place-items-center rounded-[1.45rem] border border-violet-300/20 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),rgba(2,8,23,0.04)_48%,rgba(124,58,237,0.12))]">
            <div className="absolute inset-7 rounded-[1.1rem] border border-cyan-200/10" />
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 420 420"
            >
              <path
                d="M82 252 L154 164 L246 206 L326 126"
                fill="none"
                stroke="url(#neural-line)"
                strokeWidth="1"
              />
              <path
                d="M120 294 L214 242 L304 288"
                fill="none"
                stroke="url(#neural-line)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient
                  id="neural-line"
                  x1="82"
                  x2="326"
                  y1="252"
                  y2="126"
                >
                  <stop stopColor="#7C3AED" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              className="relative h-56 w-56 rounded-full border border-cyan-200/25 lg:h-64 lg:w-64"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
            >
              <div className="absolute inset-8 rounded-full border border-violet-300/20" />
              <div className="absolute inset-20 rounded-full bg-cyan-300/20 blur-xl" />
              <div className="absolute inset-24 rounded-full bg-cyan-100/10 shadow-[0_0_44px_rgba(6,182,212,0.42)]" />
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.78)]" />
              <div className="absolute bottom-8 right-5 h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_22px_rgba(124,58,237,0.78)]" />
              <div className="absolute left-8 top-32 h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.78)]" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

function Hero() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 text-slate-100 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_80%_45%,rgba(6,182,212,0.12),transparent_28%),linear-gradient(180deg,rgba(2,8,23,0.08),rgba(2,8,23,0.78)_74%,#020817)]" />
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
        className="relative mx-auto min-h-[calc(100vh-76px)] max-w-7xl pb-16 pt-6 sm:min-h-[calc(100vh-88px)] sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10 xl:pb-24"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 max-w-3xl text-left">
          <motion.div
            className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-violet-300/20 bg-white/[0.045] px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_28px_rgba(124,58,237,0.09)] backdrop-blur-xl sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.22em]"
            variants={badgeMotion}
          >
            <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(124,58,237,0.82)]" />
            AI Portfolio Interface
          </motion.div>

          <h1
            className="hero-title flex max-w-5xl flex-col gap-1 font-medium tracking-normal text-white"
            style={{
              lineHeight: 0.98,
            }}
          >
            {headlineLines.map((line, index) => (
              <motion.span
                className={
                  index === 1
                    ? 'block bg-gradient-to-r from-violet-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent'
                    : 'block'
                }
                key={line}
                style={{ lineHeight: 0.98 }}
                variants={lineMotion}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-slate-300/92 sm:mt-6 sm:text-lg sm:leading-8"
            variants={contentMotion}
          >
            A futuristic portfolio for intelligent interfaces, cinematic web
            experiences, and AI-powered products with a polished cosmos-grade
            visual language.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3.5 sm:mt-8 sm:flex-row sm:gap-4"
            variants={contentMotion}
          >
            <MagneticButton>Explore Projects</MagneticButton>
            <MagneticButton variant="secondary">Start a Signal</MagneticButton>
          </motion.div>
        </div>

        <HeroVisual />
      </motion.section>
    </main>
  )
}

export default Hero
