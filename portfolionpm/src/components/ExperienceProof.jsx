import { motion, useReducedMotion } from 'framer-motion'
import { HiOutlineUserGroup, HiOutlineLightBulb, HiOutlineLightningBolt, HiOutlineAcademicCap, HiOutlineBriefcase } from 'react-icons/hi'

const timeline = [
  {
    type: 'Education',
    date: '2023 - 2027',
    title: 'B.Tech @ CHARUSAT',
    body: 'Started Computer Information Technology with CGPA 8.20. Focused on modern web technologies, AI/ML, and building real-world projects.',
    tags: ['8.20 CGPA', 'IT Engineering', 'System Design'],
    icon: <HiOutlineAcademicCap className="h-4 w-4" />
  },
  {
    type: 'Experience',
    date: '2025',
    title: 'MERN Intern @ Oasis Infobyte',
    body: 'Full-stack development with MERN, built responsive UIs, developed REST APIs, and handled MongoDB data.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    icon: <HiOutlineBriefcase className="h-4 w-4" />
  },
  {
    type: 'Experience',
    date: '2024',
    title: 'Python Intern @ InternPe',
    body: 'Built foundational programming skills, developed a Snake Game, and gained backend development exposure.',
    tags: ['Python', 'Backend', 'Algorithms'],
    icon: <HiOutlineBriefcase className="h-4 w-4" />
  }
]

const principles = [
  {
    title: 'User-First',
    body: 'If users struggle, the feature failed—no matter how elegant the code.',
    icon: <HiOutlineUserGroup className="h-6 w-6 text-violet-400" />,
    color: 'border-violet-500/20 bg-violet-500/5'
  },
  {
    title: 'Performance',
    body: "Speed isn't a feature, it's a requirement. Every millisecond matters.",
    icon: <HiOutlineLightningBolt className="h-6 w-6 text-cyan-400" />,
    color: 'border-cyan-500/20 bg-cyan-500/5'
  },
  {
    title: 'Clarity',
    body: "Complex systems, simple interfaces. That's the real engineering challenge.",
    icon: <HiOutlineLightBulb className="h-6 w-6 text-emerald-400" />,
    color: 'border-emerald-500/20 bg-emerald-500/5'
  }
]

const stats = [
  { label: 'CGPA', value: '8.20' },
  { label: 'Projects', value: '5+' },
  { label: 'Internships', value: '2' }
]

function ExperienceProof() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.05),transparent_34%),#020817]" />
      
      <div className="mx-auto max-w-7xl text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex rounded-full border border-violet-200/20 bg-violet-300/[0.06] px-4 py-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-violet-100">
            About Me
          </div>
          <h2 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl">
            More Than <span className="text-violet-500">Just Code</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl font-display text-lg leading-relaxed text-slate-400">
            I believe the best products come from understanding both the technical possibilities and the human needs they serve.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-start">
        {/* Left Column: My Journey */}
        <div className="relative">
          <div className="mb-8 flex items-center gap-3">
             <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
             <h3 className="font-display text-xl font-bold text-white">My Journey</h3>
          </div>

          <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent" />
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="relative ml-14"
              >
                <span className="absolute -left-[2.45rem] top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/50 bg-[#020817] text-violet-400 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                  {item.icon}
                </span>
                
                <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition duration-300 hover:border-violet-500/30">
                  <span className="font-display text-xs font-semibold text-violet-400/80">{item.date}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 font-display text-sm leading-6 text-slate-400">{item.body}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 font-display text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Right Column: What I Value & Stats */}
        <div>
          <div className="mb-8 flex items-center gap-3">
             <h3 className="font-display text-xl font-bold text-white">What I Value</h3>
             <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/50 to-transparent" />
          </div>

          <div className="grid gap-4">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-5 rounded-[22px] border p-6 transition duration-300 hover:scale-[1.02] ${principle.color}`}
              >
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#020817]/60 border border-white/5">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{principle.title}</h3>
                  <p className="mt-2 font-display text-sm leading-relaxed text-slate-400">{principle.body}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-6 text-center backdrop-blur-md"
              >
                <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 font-display text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceProof
