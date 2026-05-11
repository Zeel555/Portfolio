import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { assistantKnowledgeBase, assistantPrompts } from '../data/assistantKnowledge'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../lib/motionTokens'

const SECTION_PROMPTS = {
  home: ['Tell me about Jeel', 'What technologies does he use?', 'How can I contact him?'],
  'skills-universe': ['Ask about Jeel frontend stack', 'Explore AI technologies', 'What tools power this portfolio?'],
  systems: ['Show AI projects', 'Explain FleetFlow AI', 'What is ISLR?'],
}

function resolveResponse(input) {
  const query = input.toLowerCase()
  const entries = Object.values(assistantKnowledgeBase)
  const match = entries.find((entry) =>
    entry.keywords.some((keyword) => query.includes(keyword)),
  )
  return (
    match || {
      title: 'Neural Core Response',
      summary:
        "I can guide you through Jeel's profile, AI projects, technologies, architecture, internship context, or contact path.",
      bullets: [
        'Try: "Tell me about Jeel"',
        'Try: "Show AI projects"',
        'Try: "Explain FleetFlow AI"',
      ],
    }
  )
}

function NeuralAssistant() {
  const shouldReduceMotion = useReducedMotion()
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Neural Core online. Ask about Jeel, projects, architecture, or stack details.',
      payload: null,
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const orbRef = useRef(null)
  const inputRef = useRef(null)

  const quickActions = useMemo(
    () => SECTION_PROMPTS[activeSection] || assistantPrompts.slice(0, 6),
    [activeSection],
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }
    inputRef.current?.focus()
    return undefined
  }, [isOpen])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const sectionIds = ['home', 'skills-universe', 'systems']
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element) => element instanceof HTMLElement)

    if (targets.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: '-20% 0px -20% 0px',
      },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const handleOpen = () => setIsOpen((state) => !state)

  const pushResponse = (question) => {
    const response = resolveResponse(question)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: question, payload: null },
      {
        role: 'assistant',
        text: response.summary,
        payload: response,
      },
    ])
  }

  const handlePromptClick = (prompt) => {
    pushResponse(prompt)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed) {
      return
    }
    setInputValue('')
    pushResponse(trimmed)
  }

  const handleOrbMove = (event) => {
    if (!orbRef.current || shouldReduceMotion || isTouchDevice) {
      return
    }
    const rect = orbRef.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    gsap.to(orbRef.current, {
      x: gsap.utils.clamp(-8, 8, dx * 0.14),
      y: gsap.utils.clamp(-8, 8, dy * 0.14),
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleOrbLeave = () => {
    if (!orbRef.current || shouldReduceMotion || isTouchDevice) {
      return
    }
    gsap.to(orbRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const handlePanelKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-[12000] sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.aside
            key="assistant-panel"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: MOTION_DURATION.panel, ease: MOTION_EASE_STANDARD }}
            onKeyDown={handlePanelKeyDown}
            role="dialog"
            aria-modal="false"
            aria-label="Neural assistant panel"
            className="pointer-events-auto relative w-[calc(100vw-1.5rem)] max-w-[22.5rem] overflow-hidden rounded-3xl border border-white/12 bg-slate-950/84 shadow-[0_20px_60px_rgba(2,8,23,0.5)] backdrop-blur-lg sm:w-[94vw] sm:max-w-[24rem]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(6,182,212,0.2),transparent_36%),radial-gradient(circle_at_88%_26%,rgba(124,58,237,0.24),transparent_42%)]" />
            <header className="relative flex items-start justify-between border-b border-white/10 px-4 pb-3 pt-4 sm:px-5">
              <div>
                <div className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-200/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  Neural Core
                </div>
                <h3 className="mt-2 text-base font-medium text-white">AI Assistant System</h3>
              </div>
              <button
                type="button"
                onClick={handleOpen}
                aria-label="Close assistant panel"
                className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-200/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                Close
              </button>
            </header>

            <div className="relative max-h-[45vh] space-y-3 overflow-y-auto px-4 py-4 sm:max-h-[47vh] sm:px-5">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className={
                    message.role === 'assistant'
                      ? 'rounded-2xl border border-cyan-200/20 bg-cyan-300/[0.06] p-3'
                      : 'ml-auto w-fit max-w-[85%] rounded-2xl border border-violet-200/20 bg-violet-300/[0.08] p-3'
                  }
                >
                  <p className="text-sm leading-6 text-slate-100">{message.text}</p>
                  {message.payload && (
                    <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/70 p-2.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                        {message.payload.title}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-300">
                        {message.payload.bullets.map((bullet) => (
                          <li key={bullet}>- {bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative border-t border-white/10 px-4 pb-4 pt-3 sm:px-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handlePromptClick(action)}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.11] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask the neural core..."
                  className="min-w-0 w-full rounded-full border border-white/12 bg-slate-900/75 px-3.5 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-200/40 focus-visible:ring-2 focus-visible:ring-cyan-300/35"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full border border-cyan-200/35 bg-cyan-200/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100 transition hover:bg-cyan-200/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.aside>
        ) : (
          <motion.button
            key="assistant-orb"
            ref={orbRef}
            type="button"
            onClick={handleOpen}
            onMouseMove={handleOrbMove}
            onMouseLeave={handleOrbLeave}
            aria-label="Open neural assistant"
            className="pointer-events-auto relative h-14 w-14 rounded-full border border-cyan-200/35 bg-slate-950/72 shadow-[0_0_18px_rgba(6,182,212,0.28)] backdrop-blur-lg transition hover:border-cyan-100/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:h-16 sm:w-16"
            animate={
              shouldReduceMotion || isTouchDevice
                ? undefined
                : {
                    y: [0, -6, 0],
                    boxShadow: [
                      '0 0 18px rgba(6,182,212,0.25)',
                      '0 0 30px rgba(6,182,212,0.4)',
                      '0 0 18px rgba(6,182,212,0.25)',
                    ],
                  }
            }
            transition={{
              duration: 4.4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            whileHover={shouldReduceMotion || isTouchDevice ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion || isTouchDevice ? undefined : { scale: 0.97 }}
          >
            <span className="pointer-events-none absolute inset-[5px] rounded-full border border-violet-200/30" />
            <motion.span
              className="pointer-events-none absolute inset-3 rounded-full bg-gradient-to-br from-cyan-300/35 via-violet-300/30 to-blue-300/20"
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="absolute inset-0 grid place-items-center text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cyan-50">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NeuralAssistant
