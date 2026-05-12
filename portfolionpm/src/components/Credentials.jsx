import { motion, useReducedMotion } from 'framer-motion'

const certifications = [
  {
    name: 'IBM Machine Learning Professional Certificate',
    issuer: 'IBM / Coursera',
    year: '2025',
    focus: 'ML workflows, model training, evaluation, and applied AI foundations',
  },
  {
    name: 'Data Analysis Using Python',
    issuer: 'University of Pennsylvania',
    year: '2025',
    focus: 'Python analytics, data cleaning, visualization, and insight generation',
  },
  {
    name: 'AWS Academy Graduate',
    issuer: 'AWS Academy',
    year: '2026',
    focus: 'Cloud developing fundamentals and deployment-aware engineering',
  },
]

const achievements = [
  'Smart India Hackathon participant with ISLR and RevoraX ideas',
  'Odoo Hackathon participant with enterprise workflow thinking',
  '150+ LeetCode problems solved while building full-stack products',
  'Hands-on work across RBAC, realtime updates, AI evaluation, computer vision, and payment workflows',
]

function Credentials() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="credentials"
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#020817,rgba(6,182,212,0.035),#020817)]" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-5 inline-flex rounded-full border border-emerald-200/20 bg-emerald-300/[0.06] px-4 py-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-emerald-100">
              Certifications and achievements
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Proof that backs the build.
            </h2>
          </div>
          <p className="max-w-xl font-display text-sm leading-6 text-slate-400 md:text-right">
            A stronger portfolio needs more than pretty surfaces. These entries show learning, consistency, and
            applied engineering momentum.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <div className="absolute right-4 top-4 rounded-full border border-white/[0.08] px-2 py-1 font-display text-[10px] text-slate-500">
                  {cert.year}
                </div>
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07] font-display text-sm font-bold text-emerald-100">
                  OK
                </div>
                <h3 className="font-display text-base font-semibold leading-6 text-white">{cert.name}</h3>
                <p className="mt-2 font-display text-xs font-medium uppercase tracking-[0.13em] text-cyan-200">
                  {cert.issuer}
                </p>
                <p className="mt-4 font-display text-sm leading-6 text-slate-400">{cert.focus}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-[18px] border border-violet-300/15 bg-slate-950/62 p-6"
          >
            <h3 className="font-display text-xl font-bold text-white">Achievement stream</h3>
            <div className="mt-5 space-y-4">
              {achievements.map((achievement, index) => (
                <div key={achievement} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/[0.07] font-display text-[11px] text-cyan-100">
                    {index + 1}
                  </span>
                  <p className="font-display text-sm leading-6 text-slate-400">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default Credentials
