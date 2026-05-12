import { useEffect } from 'react'
import { motion } from 'framer-motion'

function CircuitPreview({ project, large = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] ${
        large ? 'min-h-[400px]' : 'h-[200px]'
      }`}
      style={{
        background:
          'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.04))',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.categoryColor}33, transparent 36%)`,
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute right-4 top-4 h-28 w-28 opacity-[0.18]"
        viewBox="0 0 120 120"
      >
        <path d="M12 70 C38 22 72 98 108 34" fill="none" stroke="#06B6D4" strokeWidth="1" />
        <path d="M18 28 H52 V54 H92" fill="none" stroke="#7C3AED" strokeWidth="1" />
        <circle cx="18" cy="28" r="3" fill="#06B6D4" />
        <circle cx="52" cy="54" r="3" fill="#7C3AED" />
        <circle cx="108" cy="34" r="3" fill="#06B6D4" />
      </svg>
      <div className="absolute bottom-4 left-5 font-display text-6xl font-bold leading-none text-white/[0.05] sm:text-7xl">
        {project.name}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="rgba(6,182,212,0.15)" />
      <path
        d="M4.5 8.1 6.8 10.4 11.8 5.4"
        fill="none"
        stroke="#06B6D4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[1000] bg-[#020817]/85 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed left-1/2 top-1/2 z-[1001] max-h-[85vh] w-[min(900px,90vw)] overflow-y-auto rounded-[20px] border border-violet-500/25 bg-[rgba(10,14,30,0.98)] shadow-[0_0_80px_rgba(124,58,237,0.15),0_0_160px_rgba(6,182,212,0.05)]"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border px-3 py-1 font-display text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{
                borderColor: `${project.categoryColor}66`,
                background: `${project.categoryColor}18`,
                color: '#F1F5F9',
              }}
            >
              {project.category}
            </span>
            <span className="font-display text-[11px] uppercase tracking-[0.15em] text-slate-500">
              {project.system}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close project modal"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            x
          </button>
        </header>

        <div className="grid gap-8 px-6 pb-7 sm:px-7 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <h3
              id="project-modal-title"
              className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
              style={{
                color:
                  project.category.includes('AI') || project.category.includes('VISION')
                    ? '#7C3AED'
                    : '#FFFFFF',
              }}
            >
              {project.name}
            </h3>
            <p className="mt-2 font-display text-base text-slate-400">{project.subtitle}</p>
            <p className="mb-5 mt-2 font-display text-[13px] font-medium text-cyan-400">
              {project.metric}
            </p>
            <p className="mb-6 font-display text-sm leading-[1.7] text-slate-400">
              {project.description}
            </p>

            <p className="mb-3 font-display text-[11px] font-medium uppercase tracking-[0.12em] text-violet-400">
              Key features
            </p>
            <div className="space-y-3">
              {project.features.slice(0, 5).map((feature) => (
                <div className="flex gap-3 font-display text-sm leading-6 text-slate-400" key={feature}>
                  <CheckIcon />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <p className="mb-2 mt-5 font-display text-[11px] font-medium uppercase tracking-[0.12em] text-violet-400">
              Tech stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  className="rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-display text-xs font-medium text-slate-400"
                  key={tech}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="magnetic rounded-full bg-violet-600 px-5 py-3 font-display text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                href={project.demo || project.github || '#projects'}
              >
                View Project
              </a>
              <a
                className="rounded-full border border-white/15 px-5 py-3 font-display text-sm font-semibold text-slate-200 transition hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                href={project.github || '#projects'}
              >
                GitHub
              </a>
              {project.demo ? (
                <a
                  className="rounded-full border border-cyan-300/35 px-5 py-3 font-display text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  href={project.demo}
                >
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>

          <div>
            {project.image ? (
              <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                <img alt={`${project.name} screenshot`} className="w-full" src={project.image} />
              </div>
            ) : (
              <CircuitPreview large project={project} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProjectModal
