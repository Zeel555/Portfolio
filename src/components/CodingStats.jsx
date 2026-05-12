import { motion, useReducedMotion } from 'framer-motion'

const stats = [
  {
    label: 'Projects shipped',
    value: '5+',
    detail: 'AI, MERN, SaaS, and computer vision systems',
    tone: '#06B6D4',
  },
  {
    label: 'LeetCode solved',
    value: '150+',
    detail: 'Problem solving across arrays, DP, graphs, and SQL',
    tone: '#F59E0B',
  },
  {
    label: 'Academic CGPA',
    value: '8.20',
    detail: 'B.Tech Information Technology at CHARUSAT',
    tone: '#7C3AED',
  },
  {
    label: 'Response window',
    value: '<24h',
    detail: 'Open for internships, full-time roles, and collaborations',
    tone: '#10B981',
  },
]

const platforms = [
  { name: 'GitHub', metric: 'Full-stack repositories', href: 'https://github.com/Zeel555' },
  { name: 'LinkedIn', metric: 'Professional profile', href: 'https://www.linkedin.com/in/zeel-sadariya-1634b4283/' },
  { name: 'Email', metric: 'Direct contact', href: 'mailto:zeelsadariya@gmail.com' },
]

function CodingStats() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="stats"
      className="relative isolate overflow-hidden px-4 pb-12 pt-20 text-slate-100 sm:px-8 sm:pb-14 sm:pt-24 lg:px-12"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#020817,rgba(2,8,23,0.94))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <div className="mb-5 inline-flex rounded-full border border-cyan-200/20 bg-cyan-300/[0.06] px-4 py-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-cyan-100">
            Proof layer
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Signals recruiters can scan fast.
          </h2>
          <p className="mt-4 max-w-2xl font-display text-base leading-7 text-slate-400">
            Measurable output, public profiles, education, availability, and project depth presented in one quick
            scan for recruiters and technical teams.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl"
                style={{ background: `${item.tone}22` }}
              />
              <p className="font-display text-xs uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
              <div className="mt-3 font-display text-4xl font-bold leading-none text-white">{item.value}</div>
              <p className="mt-3 font-display text-sm leading-6 text-slate-400">{item.detail}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target={platform.href.startsWith('http') ? '_blank' : undefined}
              rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex min-h-16 items-center justify-between rounded-xl border border-white/[0.07] bg-slate-950/55 px-5 py-4 font-display transition duration-300 hover:border-cyan-300/35 hover:bg-white/[0.045]"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-100">{platform.name}</span>
                <span className="mt-1 block text-xs text-slate-500">{platform.metric}</span>
              </span>
              <span className="text-cyan-200" aria-hidden>
                -&gt;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CodingStats
