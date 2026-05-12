import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    system: 'SYSTEM 01',
    category: 'AI / COMPUTER VISION',
    categoryColor: '#3B82F6',
    name: 'ISLR',
    subtitle: 'Indian Sign Language Recognition System',
    metric: '95%+ recognition accuracy · Real-time inference',
    description:
      'Machine learning system for real-time recognition of Indian Sign Language gestures using CNN deep learning and computer vision. Converts sign language gestures into readable text, bridging the communication gap for hearing-impaired individuals.',
    features: [
      'Real-time gesture capture and recognition',
      'CNN model for accurate gesture prediction',
      'Custom dataset collection and preprocessing',
      'Convert gestures into readable text output',
      'High accuracy model evaluation and testing',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    github: 'YOUR_GITHUB_LINK',
    demo: '',
    image: null,
  },
  {
    id: 2,
    system: 'SYSTEM 02',
    category: 'FULL STACK SAAS + AI',
    categoryColor: '#7C3AED',
    name: 'FleetFlow AI',
    subtitle: 'Autonomous Fleet Intelligence Platform',
    metric: 'Real-time tracking · AI predictive maintenance',
    description:
      'AI-powered Fleet & Logistics Management System with real-time updates, predictive risk scoring, and Gemini API integration. Features JWT/RBAC auth, vehicle registry with ROI tracking, and full trip lifecycle management.',
    features: [
      'JWT & RBAC with 4 role types (Manager, Dispatcher, Safety, Financial)',
      'Real-time vehicle & driver tracking via Socket.io',
      'Predictive risk scoring with Gemini AI integration',
      'Full trip lifecycle — create, dispatch, complete',
      'CSV/PDF export & ROI calculation per vehicle',
    ],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'YOUR_GITHUB_LINK',
    demo: '',
    image: null,
  },
  {
    id: 3,
    system: 'SYSTEM 03',
    category: 'AI / INTERVIEW TECH',
    categoryColor: '#06B6D4',
    name: 'AI Interview System',
    subtitle: 'AI-Powered Technical Interview & Evaluation',
    metric: 'Voice-based · Mistral AI evaluation · Microservices',
    description:
      'AI-driven interview platform using React, Node.js, FastAPI with local LLM (Mistral via Ollama). Designed microservice architecture for question generation, evaluation, and speech-to-text processing with performance analytics.',
    features: [
      'AI-generated technical interview questions',
      'Voice-based interview flow with Whisper STT',
      'Mistral AI answer evaluation and scoring',
      'Microservice architecture (FastAPI + Node.js)',
      'Candidate analytics dashboard',
    ],
    tech: ['React', 'Node.js', 'FastAPI', 'Python', 'Mistral'],
    github: 'YOUR_GITHUB_LINK',
    demo: '',
    image: null,
  },
  {
    id: 4,
    system: 'SYSTEM 04',
    category: 'FULL STACK / PLM',
    categoryColor: '#7C3AED',
    name: 'RevoraX',
    subtitle: 'Product Lifecycle & Change Management',
    metric: 'Multi-tenant · 4 roles · Full audit trail',
    description:
      'Multi-tenant PLM web app for managing Products, Bills of Materials, and Engineering Change Orders with approval workflows, versioning, audit trails, and role-based access control.',
    features: [
      'Multi-tenant with 4 roles: Engineering, Approver, Operations, Admin',
      'ECO approval workflow (New → Approval → Done)',
      'Version-controlled Products and Bills of Materials',
      'Full audit trail and traceability for compliance',
      'Configurable ECO stages via Settings dashboard',
    ],
    tech: ['React', 'Vite', 'Express', 'MongoDB', 'JWT'],
    github: 'YOUR_GITHUB_LINK',
    demo: '',
    image: null,
  },
  {
    id: 5,
    system: 'SYSTEM 05',
    category: 'FULL STACK / MERN',
    categoryColor: '#10B981',
    name: 'Pizza Delight',
    subtitle: 'Scalable Food Ordering System',
    metric: 'Razorpay integrated · JWT auth · Admin dashboard',
    description:
      'Full-stack pizza ordering system using React, Node.js, Express, MongoDB with JWT authentication. Custom pizza builder with dynamic pricing, Razorpay payment gateway, and admin dashboard for order and inventory management.',
    features: [
      'Custom pizza builder with dynamic pricing',
      'JWT-based authentication system',
      'Razorpay payment gateway integration',
      'Admin dashboard for order management',
      'Fully responsive UI design',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'YOUR_GITHUB_LINK',
    demo: '',
    image: null,
  },
]

function CategoryIcon({ color }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" stroke={color} strokeOpacity="0.7" strokeWidth="1.4" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke={color} strokeLinecap="round" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.5" fill={color} fillOpacity="0.55" />
    </svg>
  )
}

function CircuitDecoration({ color }) {
  return (
    <svg aria-hidden="true" className="absolute right-4 top-4 h-24 w-24 opacity-[0.18]" viewBox="0 0 96 96">
      <path d="M12 28 H38 V48 H64 V70 H84" fill="none" stroke={color} strokeWidth="1" />
      <path d="M18 76 C36 50 52 46 82 22" fill="none" stroke="#06B6D4" strokeOpacity="0.75" strokeWidth="1" />
      <circle cx="12" cy="28" r="3" fill={color} />
      <circle cx="64" cy="48" r="3" fill="#06B6D4" />
      <circle cx="84" cy="70" r="3" fill={color} />
    </svg>
  )
}

function ProjectCard({ index, onClick, project }) {
  return (
    <motion.button
      type="button"
      className="project-card group relative mx-auto w-full max-w-[380px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[rgba(13,18,36,0.8)] text-left transition duration-300 hover:-translate-y-1.5 hover:border-violet-500/35 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      aria-label={`Open ${project.name} project details`}
    >
      <div className="relative h-[200px] overflow-hidden bg-[rgba(7,11,25,0.9)]">
        <div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${project.categoryColor}55` }}
        />
        <CircuitDecoration color={project.categoryColor} />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.035]">
            <CategoryIcon color={project.categoryColor} />
          </span>
          <span
            className="rounded-full border px-3 py-1 font-display text-[10px] font-medium uppercase tracking-[0.12em] text-slate-200"
            style={{
              borderColor: `${project.categoryColor}55`,
              backgroundColor: `${project.categoryColor}18`,
            }}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 font-display text-[72px] font-extrabold leading-none text-white/[0.05]">
          {project.name}
        </div>
      </div>

      <div className="p-5">
        <p className="font-display text-[10px] uppercase tracking-[0.15em] text-slate-600">
          {project.system}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-bold leading-tight text-slate-100">
          {project.name}
        </h3>
        <p className="mb-3 mt-2 font-display text-[13px] leading-5 text-slate-400">
          {project.subtitle}
        </p>
        <p className="font-display text-xs font-medium leading-5 text-cyan-400">
          {project.metric}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 font-display text-[11px] text-slate-400"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-3 font-display text-xs font-semibold text-violet-400">
          View System →
        </p>
      </div>
    </motion.button>
  )
}

function IntelligentSystems({ onProjectClick }) {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-20 text-slate-100 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      id="projects"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-1px] z-20 h-24 bg-gradient-to-b from-[#020817] via-[#020817]/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[#020817]/92" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_32%),linear-gradient(180deg,#020817_0%,rgba(2,8,23,0.94)_45%,#020817_100%)]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14 max-w-4xl"
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex rounded-full border border-violet-200/20 bg-white/[0.035] px-4 py-2 text-xs font-medium tracking-[0.12em] text-cyan-100 backdrop-blur-xl">
            Portfolio spotlight
          </div>
          <h2
            className="font-display font-medium leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
          >
            Intelligent Systems
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl">
            A collection of AI-powered platforms, full-stack systems, real-time
            applications, and intelligent digital products.
          </p>
        </motion.div>

        <div className="grid justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.id}
              onClick={onProjectClick}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntelligentSystems
