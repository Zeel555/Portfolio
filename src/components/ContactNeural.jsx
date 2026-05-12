import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

function ContactNeural() {
  const shouldReduceMotion = useReducedMotion()
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name') || 'Portfolio visitor'
    const email = data.get('email') || 'No email provided'
    const subject = data.get('subject') || 'Portfolio opportunity'
    const message = data.get('message') || ''
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`

    window.location.href = `mailto:zeelsadariya@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-4 pb-16 pt-20 text-slate-100 sm:px-8 sm:pb-16 sm:pt-28 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_80%,rgba(6,182,212,0.08),transparent_40%),#020817]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Establish a{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              connection.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-display text-base text-slate-400">
            Have a role, project, or collaboration in mind? I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.form
            className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block font-display text-sm text-slate-400">
                Name
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2.5 font-display text-slate-100 outline-none focus:border-cyan-400/40"
                  placeholder="Your name"
                  type="text"
                  autoComplete="name"
                  name="name"
                  required
                />
              </label>
              <label className="block font-display text-sm text-slate-400">
                Email
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2.5 font-display text-slate-100 outline-none focus:border-cyan-400/40"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                />
              </label>
            </div>
            <label className="block font-display text-sm text-slate-400">
              Subject
              <input
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2.5 font-display text-slate-100 outline-none focus:border-cyan-400/40"
                placeholder="Project or opportunity"
                type="text"
                name="subject"
                required
              />
            </label>
            <label className="block font-display text-sm text-slate-400">
              Message
              <textarea
                className="mt-1.5 min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2.5 font-display text-slate-100 outline-none focus:border-cyan-400/40"
                placeholder="Tell me about timelines, stack, and goals..."
                name="message"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 py-3 font-display text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.25)] transition hover:opacity-95 sm:w-auto sm:px-10"
            >
              Send message
            </button>
            {status === 'sent' ? (
              <p className="font-display text-xs text-cyan-200">
                Opening your mail app with the message prepared.
              </p>
            ) : null}
          </motion.form>

          <motion.aside
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Quick connect</h3>
              <p className="mt-2 font-display text-sm text-slate-400">
                Prefer direct links? Use GitHub, LinkedIn, or email.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/Zeel555', ext: true },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zeel-sadariya-1634b4283/', ext: true },
                { label: 'Email', href: 'mailto:zeelsadariya@gmail.com', ext: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex min-h-12 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-display text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                  rel={link.ext ? 'noopener noreferrer' : undefined}
                  target={link.ext ? '_blank' : undefined}
                >
                  <span>{link.label}</span>
                  <span className="text-slate-500" aria-hidden>
                    -&gt;
                  </span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default ContactNeural
