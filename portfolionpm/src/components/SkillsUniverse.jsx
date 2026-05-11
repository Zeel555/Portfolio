import { useEffect, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    name: 'Frontend',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Vite', 'GSAP', 'Framer Motion'],
  },
  {
    name: 'Backend',
    technologies: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io'],
  },
  {
    name: 'AI / Machine Learning',
    technologies: ['Python', 'TensorFlow', 'OpenCV'],
  },
  {
    name: 'Cloud & DevOps',
    technologies: ['Docker', 'AWS'],
  },
  {
    name: 'Databases',
    technologies: ['MongoDB', 'PostgreSQL'],
  },
  {
    name: 'Tools & Workflow',
    technologies: ['Git', 'GitHub', 'Postman', 'Razorpay'],
  },
]

const floatingNodes = [
  { label: 'React', x: '8%', y: '22%', delay: 0.2 },
  { label: 'Node.js', x: '18%', y: '68%', delay: 0.7 },
  { label: 'TensorFlow', x: '44%', y: '16%', delay: 0.4 },
  { label: 'FastAPI', x: '58%', y: '74%', delay: 0.9 },
  { label: 'Docker', x: '76%', y: '32%', delay: 0.5 },
  { label: 'MongoDB', x: '86%', y: '62%', delay: 1.1 },
]

const revealVariant = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: MOTION_DURATION.reveal, ease: MOTION_EASE_STANDARD },
  },
}

function SkillsUniverse() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const links = useMemo(
    () => [
      ['8%', '22%', '44%', '16%'],
      ['44%', '16%', '76%', '32%'],
      ['18%', '68%', '58%', '74%'],
      ['58%', '74%', '86%', '62%'],
      ['44%', '16%', '58%', '74%'],
    ],
    [],
  )

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.to('.skills-universe-glow', {
        yPercent: 10,
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      gsap.to('.skills-constellation', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.4,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [shouldReduceMotion])

  return (
    <section
      id="skills-universe"
      ref={sectionRef}
      className="relative isolate overflow-hidden px-5 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-1px] z-20 h-24 bg-gradient-to-b from-[#020817] via-[#020817]/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,8,23,0.92),rgba(2,8,23,0.86)_40%,rgba(2,8,23,0.95))]" />
      <div className="skills-universe-glow absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(6,182,212,0.15),transparent_35%),radial-gradient(circle_at_82%_28%,rgba(124,58,237,0.16),transparent_38%),radial-gradient(circle_at_50%_72%,rgba(59,130,246,0.08),transparent_42%)] opacity-70" />
      <div className="pointer-events-none absolute left-[-6rem] top-16 -z-10 h-64 w-64 rounded-full border border-cyan-200/12 bg-cyan-300/10 blur-2xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute bottom-10 right-[-8rem] -z-10 h-72 w-72 rounded-full border border-violet-300/12 bg-violet-400/10 blur-2xl sm:h-80 sm:w-80" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-12% 0px' }}
          variants={revealVariant}
          className="mb-14 max-w-4xl"
        >
          <div className="mb-5 inline-flex rounded-full border border-violet-200/20 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-xl">
            Neural ecosystem
          </div>
          <h2
            className="font-medium leading-none text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Skills Universe
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl">
            The technologies, systems, and tools powering intelligent digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={revealVariant}
          className="skills-constellation relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_22px_90px_rgba(2,8,23,0.44)] backdrop-blur-xl sm:mb-12 sm:p-6 md:p-8"
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
          >
            {links.map(([x1, y1, x2, y2], index) => (
              <g key={`${x1}-${y1}-${x2}-${y2}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#skills-link-gradient)"
                  strokeWidth="1.15"
                  strokeOpacity="0.42"
                />
                <motion.circle
                  cx={x1}
                  cy={y1}
                  r="1.8"
                  fill="#67E8F9"
                  opacity={0.26}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          cx: [x1, x2],
                          cy: [y1, y2],
                          opacity: [0, 0.28, 0],
                        }
                  }
                  transition={{
                    duration: 5.5 + index * 0.7,
                    delay: index * 0.45,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            ))}
            <defs>
              <linearGradient id="skills-link-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative min-h-[300px] sm:min-h-[360px] md:min-h-[420px]">
            {floatingNodes.map((node, index) => (
              <motion.div
                key={node.label}
                className="group absolute"
                style={{ left: node.x, top: node.y }}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -10, 0],
                        scale: [1, 1.02, 1],
                      }
                }
                transition={{
                  delay: node.delay,
                  duration: 7.2 + index * 0.35,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
              >
                <div className="rounded-full border border-cyan-200/25 bg-slate-900/65 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-100 shadow-[0_0_18px_rgba(6,182,212,0.14)] backdrop-blur-xl transition duration-300 group-hover:border-cyan-100/50 group-hover:shadow-[0_0_28px_rgba(6,182,212,0.26)] sm:px-4 sm:py-2.5 sm:text-xs">
                  {node.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/25"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
            >
              <div className="absolute inset-7 rounded-full border border-cyan-200/20" />
              <div className="absolute inset-16 rounded-full bg-cyan-300/15 blur-lg" />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8% 0px' }}
              variants={revealVariant}
              transition={{ delay: categoryIndex * 0.045 }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/[0.06] via-transparent to-violet-400/[0.08] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-violet-200/20 bg-white/[0.03] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {category.name}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.technologies.map((technology) => (
                    <motion.span
                      key={technology}
                      className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 shadow-[0_0_0_rgba(6,182,212,0)] transition duration-300 hover:border-cyan-100/45 hover:bg-cyan-200/[0.12] hover:text-white hover:shadow-[0_0_18px_rgba(6,182,212,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                    >
                      {technology}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-28 bg-gradient-to-b from-transparent via-[#020817]/65 to-[#020817]" />
    </section>
  )
}

export default SkillsUniverse
