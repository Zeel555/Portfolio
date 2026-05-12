import { motion, useReducedMotion } from 'framer-motion'

const timeline = [
  {
    year: '2024',
    yearClass: 'border-cyan-300/40 bg-cyan-500/15 text-cyan-200',
    title: 'B.Tech Information Technology',
    place: 'CHARUSAT — Charotar University of Science and Technology',
    detail:
      'Focused on AI/ML, full-stack development, and system design. CGPA: 8.20 (up to 5th Semester).',
  },
  {
    year: '2025',
    yearClass: 'border-violet-400/40 bg-violet-500/15 text-violet-200',
    title: 'Full Stack Development Intern',
    place: 'OASIS INFOBYTE · Remote',
    detail:
      'Built full-stack web features using React, Node.js, and MongoDB. Developed RESTful APIs and responsive UI components.',
  },
  {
    year: '2024–Now',
    yearClass: 'border-blue-400/40 bg-blue-500/12 text-blue-200',
    title: 'Building AI Systems',
    place: 'Independent Projects',
    detail:
      'FleetFlow AI, ISLR, AI Interview System, RevoraX, Pizza Delight — full-stack and AI-powered platforms.',
  },
  {
    year: '2027',
    yearClass: 'border-dashed border-white/25 bg-transparent text-slate-500',
    title: 'B.Tech Graduation',
    place: 'CHARUSAT',
    detail:
      'Expected graduation. Actively seeking placement in full-stack and AI engineering roles.',
    dimmed: true,
  },
]

const values = [
  {
    title: 'AI-first systems',
    body: 'Platforms where AI is the core — not a bolt-on. Real-time inference, intelligent data flows, and interfaces that feel alive.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle cx="18" cy="6" r="3" fill="#7C3AED" fillOpacity="0.3" />
      </svg>
    ),
    accent: 'from-violet-500/25 to-cyan-500/10',
  },
  {
    title: 'Premium frontend',
    body: 'Motion systems, interaction design, and cinematic surfaces so users feel the engineering quality beneath.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#06B6D4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    accent: 'from-cyan-500/25 to-violet-500/10',
  },
  {
    title: 'Full stack architecture',
    body: 'From React UIs to FastAPI backends, WebSockets, and cloud-ready deployments — complete systems end to end.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    accent: 'from-blue-500/20 to-cyan-500/10',
  },
]

const chips = ['CHARUSAT University', 'B.Tech Information Technology', 'AI + Full Stack', 'Rajkot, India']
const achievements = [
  'IBM ML Certificate',
  'AWS Academy Graduate',
  '150+ LeetCode',
  'Smart India Hackathon',
]

function AboutNeural() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-[120px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.12),transparent),#020817]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mb-6 inline-flex rounded-full border px-4 py-1.5 font-display text-[11px] font-medium uppercase tracking-[0.15em] text-[#7C3AED]"
            style={{
              borderColor: 'rgba(124,58,237,0.3)',
              backgroundColor: 'rgba(124,58,237,0.06)',
            }}
          >
            About the engineer
          </div>
          <h2
            className="font-display font-bold leading-tight text-[#F1F5F9]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            The developer behind the systems.
          </h2>
          <p className="mt-5 max-w-[560px] font-display text-base leading-[1.7] text-[#94A3B8]">
            Combining AI engineering, frontend craft, and system thinking to build intelligent digital experiences.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Timeline */}
          <div className="relative pl-1">
            <div
              className="absolute bottom-0 left-[11px] top-2 w-0.5 lg:left-[13px]"
              style={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
              aria-hidden
            />
            <ul className="relative space-y-8">
              {timeline.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <span
                    className={`absolute left-[7px] top-8 z-[1] h-3 w-3 rounded-full border-2 border-[#020817] shadow-[0_0_12px_rgba(124,58,237,0.35)] lg:left-[11px] ${item.dimmed ? 'bg-slate-600' : 'bg-gradient-to-br from-cyan-400 to-violet-500'}`}
                    aria-hidden
                  />
                  <div
                    className={`ml-10 rounded-xl border bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-violet-500/25 lg:ml-12 lg:p-6 ${item.dimmed ? 'border-dashed border-white/15 opacity-50' : 'border-white/[0.06]'}`}
                  >
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 font-display text-[11px] font-semibold ${item.yearClass}`}
                    >
                      {item.year}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 font-display text-sm text-slate-500">{item.place}</p>
                    <p className="mt-2 font-display text-sm leading-relaxed text-slate-400">{item.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className="flex flex-col gap-5">
            {values.map((card, index) => (
              <motion.article
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-[10px] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-cyan-200 ${card.accent}`}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 font-display text-sm leading-[1.6] text-[#94A3B8]">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex flex-wrap gap-4 lg:mt-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-display text-xs text-[#475569]"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          {achievements.map((achievement) => (
            <span
              key={achievement}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-display text-xs text-[#475569]"
            >
              {achievement}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutNeural
