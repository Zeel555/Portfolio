import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'ISLR',
    title: 'Indian Sign Language Recognition System',
    category: 'AI / Computer Vision',
    signal: 'Vision model',
    features: [
      'Real-time sign language recognition',
      'CNN deep learning model',
      'OpenCV gesture tracking',
      'Text conversion system',
      'High-accuracy evaluation',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas'],
  },
  {
    name: 'FleetFlow AI',
    title: 'Autonomous Fleet Intelligence Platform',
    category: 'Full Stack SaaS + AI',
    signal: 'Logistics intelligence',
    features: [
      'AI-powered logistics intelligence',
      'Predictive risk analysis',
      'RBAC system',
      'Real-time Socket.io updates',
      'Analytics dashboards',
      'Gemini AI integration',
    ],
    tech: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.io',
      'Gemini API',
    ],
  },
  {
    name: 'AI Interview System',
    title: 'AI-Powered Technical Interview System',
    category: 'AI + LLM Systems',
    signal: 'Conversational engine',
    features: [
      'AI-generated interviews',
      'Voice-based interview flow',
      'Whisper speech-to-text',
      'Local LLM integration',
      'Candidate analytics dashboard',
      'Coding interview simulation',
    ],
    tech: [
      'React',
      'Node.js',
      'FastAPI',
      'MongoDB',
      'Python',
      'Ollama',
      'Whisper',
      'Mistral',
    ],
  },
  {
    name: 'RevoraX',
    title: 'Product Lifecycle & Change Management',
    category: 'Enterprise Full Stack System',
    signal: 'Enterprise control',
    features: [
      'PLM workflow system',
      'ECO approval flow',
      'Audit logging',
      'Role-based access control',
      'Product version management',
      'Enterprise dashboards',
    ],
    tech: ['React', 'Vite', 'Express.js', 'MongoDB', 'JWT'],
  },
  {
    name: 'Pizza Delight',
    title: 'Full Stack E-Commerce Platform',
    category: 'Full Stack E-Commerce Platform',
    signal: 'Commerce system',
    features: [
      'Custom pizza builder',
      'Dynamic pricing',
      'Admin dashboard',
      'Inventory management',
      'Razorpay integration',
      'JWT authentication',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay'],
  },
  {
    name: 'Skill Swap',
    title: 'Real-Time Full Stack Platform',
    category: 'Real-Time Full Stack Platform',
    signal: 'Matching network',
    features: [
      'Skill exchange system',
      'Real-time Socket.io chat',
      'Notifications',
      'Matching system',
      'Authentication & security',
      'Admin controls',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
  },
]

const revealMotion = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: MOTION_DURATION.reveal, ease: MOTION_EASE_STANDARD },
  },
}

function ProjectVisual({ project, index }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative min-h-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:min-h-80 sm:p-5"
      whileHover={
        shouldReduceMotion
          ? undefined
          : { rotateX: 1.3, rotateY: index % 2 === 0 ? -1.3 : 1.3, scale: 1.008 }
      }
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(6,182,212,0.18),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(124,58,237,0.16),transparent_30%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cyan-200/10 to-transparent"
        animate={shouldReduceMotion ? undefined : { y: ['-30%', '310%'] }}
        transition={{
          delay: index * 0.35,
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      <div className="relative h-full rounded-2xl border border-cyan-200/10 bg-slate-950/35 p-4 sm:p-5">
        <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.18em] text-cyan-100/70 sm:text-xs sm:tracking-[0.22em]">
          <span>{project.signal}</span>
          <span>0{index + 1}</span>
        </div>

        <div className="mt-8 grid place-items-center">
          <motion.div
            className="relative h-36 w-36 rounded-full border border-cyan-100/25 sm:h-44 sm:w-44"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
          >
            <div className="absolute inset-7 rounded-full border border-violet-200/20" />
            <div className="absolute inset-16 rounded-full bg-cyan-300/15 blur-xl" />
            <div className="absolute left-6 top-12 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.75)]" />
            <div className="absolute bottom-8 right-5 h-3.5 w-3.5 rounded-full bg-violet-300 shadow-[0_0_22px_rgba(124,58,237,0.75)]" />
            <div className="absolute right-10 top-2 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.75)]" />
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
          <div className="mb-3 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-200/50 to-violet-300/0" />
          <div className="grid grid-cols-3 gap-2">
            {[64, 82, 47].map((value) => (
              <div
                className="rounded-xl border border-white/10 bg-slate-950/45 p-2 text-center sm:p-3"
                key={value}
              >
                <div className="text-base font-semibold text-white sm:text-lg">{value}%</div>
                <div className="text-[0.58rem] uppercase tracking-[0.14em] text-slate-500 sm:text-[0.62rem] sm:tracking-[0.18em]">
                  signal
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectShowcase({ project, index }) {
  const isReversed = index % 2 === 1

  return (
    <motion.article
      className="project-card system-card group relative grid gap-6 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_20px_76px_rgba(2,8,23,0.38)] backdrop-blur-xl transition duration-500 hover:border-cyan-200/24 hover:shadow-[0_22px_88px_rgba(6,182,212,0.09)] sm:rounded-[2rem] sm:p-4 md:p-5 lg:grid-cols-2 lg:gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
      variants={revealMotion}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-300/[0.045] via-transparent to-violet-400/[0.055] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className={isReversed ? 'lg:order-2' : ''}>
        <ProjectVisual index={index} project={project} />
      </div>

      <div className="relative flex flex-col justify-center p-2 sm:p-3 md:p-5">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-200/20 bg-cyan-200/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-100 sm:text-xs sm:tracking-[0.2em]">
            {project.category}
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
            System 0{index + 1}
          </span>
        </div>

        <h3 className="max-w-xl text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
          {project.title}
        </p>

        <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
          {project.features.map((feature) => (
            <div
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 text-sm leading-6 text-slate-300"
              key={feature}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.75)]" />
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              className="rounded-full border border-violet-200/15 bg-violet-200/[0.045] px-3 py-1.5 text-xs font-medium text-slate-300"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {['View Project', 'GitHub', 'Live Demo'].map((label, actionIndex) => (
            <a
              aria-label={`${label} for ${project.name}`}
              className={`min-h-11 rounded-full border px-5 py-3 text-center text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 max-sm:w-full ${
                actionIndex === 0
                  ? 'border-cyan-200/60 bg-cyan-200 text-slate-950 hover:bg-cyan-100'
                  : 'border-white/15 bg-white/[0.035] text-slate-100 hover:border-cyan-200/40 hover:bg-white/[0.065]'
              }`}
              href="#contact"
              key={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function IntelligentSystems() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.systems-orbit',
        { yPercent: -8, opacity: 0.45 },
        {
          yPercent: 8,
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1.2,
            start: 'top bottom',
            end: 'bottom top',
          },
        },
      )
    }, sectionRef)

    return () => context.revert()
  }, [shouldReduceMotion])

  return (
    <section
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      id="systems"
      ref={sectionRef}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-1px] z-20 h-24 bg-gradient-to-b from-[#020817] via-[#020817]/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[#020817]/92" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.09),transparent_32%),linear-gradient(180deg,#020817_0%,rgba(2,8,23,0.94)_45%,#020817_100%)]" />
      <div className="systems-orbit pointer-events-none absolute right-[-10rem] top-28 -z-10 h-72 w-72 rounded-full border border-cyan-200/12 bg-cyan-300/5 blur-2xl sm:h-80 sm:w-80" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
          variants={revealMotion}
        >
          <div className="mb-5 inline-flex rounded-full border border-violet-200/20 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-xl">
            Core showcase
          </div>
          <h2
            className="font-medium leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
          >
            Intelligent Systems
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl">
            A collection of AI-powered platforms, full-stack systems, real-time
            applications, and intelligent digital products.
          </p>
        </motion.div>

        <div className="space-y-10 lg:space-y-14">
          {projects.map((project, index) => (
            <ProjectShowcase index={index} key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntelligentSystems
