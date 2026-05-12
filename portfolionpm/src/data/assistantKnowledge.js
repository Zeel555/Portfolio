/** @typedef {{ role: 'user' | 'assistant'; text: string }} ChatMessage */

export const assistantPrompts = [
  'Tell me about Jeel',
  'Show AI projects',
  'What technologies does he use?',
  'Explain FleetFlow AI',
  'What is ISLR?',
  'Internship experience',
  'How can I contact him?',
]

/**
 * System context for the Neural Core (used as single source of truth;
 * wire this into any future LLM API system prompt).
 */
export const JEEL_CONTEXT = `
You are the Neural Core — Jeel Sadariya's AI portfolio assistant.
Only answer questions about Jeel. For anything else say:
"I'm the Neural Core. I only know about Jeel and his work."
Never output raw JSON or structured data. Max 3 sentences per reply.
Speak in a confident, futuristic, direct tone.

ABOUT JEEL:
Full name: Jeel Sadariya
Email: zeelsadariya@gmail.com
Phone: 9664665296
Location: Rajkot, Gujarat, India
GitHub: github.com/JeelSadariya
LinkedIn: linkedin.com/in/JeelSadariya
Role: Full Stack Developer & AI Engineer

EDUCATION:
Charotar University of Science and Technology (CHARUSAT)
B.Tech Information Technology | July 2024 – July 2027
CGPA: 8.20 (up to 5th Semester)

EXPERIENCE:
Full Stack Development Intern @ OASIS INFOBYTE
May 2025 – June 2025
- Developed full-stack web features using React, Node.js, MongoDB
- Built and optimized RESTful APIs with database integration
- Created responsive UI components

PROJECTS:
1. FleetFlow AI — Autonomous Fleet Intelligence System
   Next.js, Node.js, Express.js, MongoDB, Socket.io, Gemini API
   Real-time tracking, RBAC auth, predictive risk scoring, AI insights

2. AI Interview System — AI-Powered Technical Interview Platform
   React, Node.js, MongoDB, Python, FastAPI, Mistral via Ollama
   Voice-based interviews, AI evaluation, microservice architecture

3. Pizza Delight — Scalable Food Ordering System
   React, Node.js, Express.js, MongoDB, Razorpay
   Custom pizza builder, JWT auth, payment gateway, admin dashboard

4. ISLR — Indian Sign Language Recognition
   Python, TensorFlow, Keras, OpenCV, NumPy
   Real-time CNN-based recognition, gesture tracking, text conversion
   Smart India Hackathon project

5. RevoraX — Product Lifecycle Management
   MERN Stack (React, Node.js, Express, MongoDB)
   RBAC, approval workflows, audit trails, change management

SKILLS:
Languages: Python, C/C++, JavaScript, SQL
Frontend: React.js, Next.js, Tailwind CSS, GSAP, Framer Motion
Backend: Node.js, Express.js, FastAPI
Database: MongoDB, MySQL, PostgreSQL
Tools: Git, Docker, AWS, Postman

CERTIFICATIONS:
- IBM Machine Learning Professional Certificate (Coursera, 2025)
- Data Analysis Using Python — University of Pennsylvania (2025)
- AWS Academy Graduate — Cloud Developing Training (2026)

ACHIEVEMENTS:
- CGPA: 8.20 at CHARUSAT
- 150+ LeetCode problems solved
- Smart India Hackathon participant (ISLR + RevoraX)
- Odoo Hackathon participant

AVAILABILITY:
Seeking full-time or internship roles in full-stack,
frontend, or AI engineering. Responds within 24 hours.
`

const OFF_TOPIC_REPLY =
  "I'm the Neural Core. I only know about Jeel and his work."

function normalizeQuery(input) {
  return input.trim().toLowerCase()
}

function mentionsJeelOrPortfolio(query) {
  const jeelSignals = [
    'jeel',
    'sadariya',
    'portfolio',
    'projects',
    'neural',
    'project',
    'stack',
    'skill',
    'contact',
    'email',
    'github',
    'linkedin',
    'intern',
    'internship',
    'charusat',
    'university',
    'placement',
    'hire',
    'resume',
    'cv',
    'islr',
    'fleetflow',
    'interview system',
    'revorax',
    'revora',
    'skill swap',
    'mistral',
    'whisper',
    'tensorflow',
    'opencv',
    'react',
    'node',
    'fastapi',
    'mongo',
    'postgres',
    'about you',
    'who are you',
  ]
  return jeelSignals.some((token) => query.includes(token))
}

/**
 * Deterministic replies shaped by JEEL_CONTEXT — plain sentences only, max ~3 short sentences.
 * @param {string} rawInput
 * @returns {string}
 */
export function getNeuralCoreReply(rawInput) {
  const query = normalizeQuery(rawInput)
  if (!query) {
    return 'Ask me anything about Jeel, his projects, stack, or how to reach him.'
  }

  if (!mentionsJeelOrPortfolio(query)) {
    return OFF_TOPIC_REPLY
  }

  if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
    return 'Reach Jeel at zeelsadariya@gmail.com, or connect on LinkedIn and GitHub from his portfolio. He typically responds within a day for serious opportunities.'
  }

  if (query.includes('intern')) {
    return 'Jeel completed a Full Stack Development internship at OASIS INFOBYTE from May 2025 to June 2025, building React + Node + MongoDB features and REST APIs. He is currently pursuing B.Tech Information Technology at CHARUSAT.'
  }

  if (query.includes('who') || query.includes('about jeel') || query.includes('tell me about')) {
    return 'Jeel Sadariya is a Full Stack Developer and AI Engineer from Rajkot, Gujarat, currently pursuing B.Tech Information Technology at CHARUSAT. He builds intelligent, real-time products where AI is the core, not just a feature.'
  }

  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('technology')) {
    return 'His stack spans React and Next.js on the frontend, Node.js, Express, and FastAPI on the backend, plus TensorFlow, OpenCV, Mistral, and Whisper for AI workloads. Data layers include MongoDB, PostgreSQL, Firebase, and Redis.'
  }

  if (query.includes('project') || query.includes('show ai') || query.includes('portfolio work')) {
    return 'Flagship builds include FleetFlow AI, AI Interview System, Pizza Delight, ISLR, and RevoraX. These projects combine full-stack architecture with practical AI integration and production-focused UX.'
  }

  if (query.includes('fleetflow')) {
    return 'FleetFlow AI is a fleet management platform using React, Node.js, MongoDB, Socket.io, and Python. It emphasizes real-time GPS tracking, predictive maintenance signals, and route intelligence for operators.'
  }

  if (query.includes('islr') || query.includes('sign language')) {
    return 'ISLR is Jeel’s Indian Sign Language recognition system built with Python, TensorFlow, OpenCV, FastAPI, and React. It targets very high real-time recognition accuracy with a full gesture-to-text pipeline.'
  }

  if (query.includes('interview')) {
    return 'The AI Interview System is a voice-first interview platform using React, Node.js, FastAPI, Mistral, and Whisper. It runs structured interviews, captures speech, and surfaces analytics for reviewers.'
  }

  if (query.includes('revorax') || query.includes('revora')) {
    return 'RevoraX is an enterprise PLM-style product on React, Node, Express, MongoDB, and JWT. It ships RBAC, approval workflows, change orders, and audit trails for regulated teams.'
  }

  if (query.includes('skill swap')) {
    return 'Jeel’s portfolio currently highlights FleetFlow AI, AI Interview System, Pizza Delight, ISLR, and RevoraX. Ask for any of these by name and I can explain architecture and stack.'
  }

  if (query.includes('placement') || query.includes('hiring') || query.includes('job') || query.includes('opportunit')) {
    return 'Jeel is actively seeking placement across frontend, full stack, and AI engineering roles, and stays open to internships or full-time teams building intelligent products. Lead with the product vision and timeline when you reach out.'
  }

  return 'Jeel engineers cinematic web experiences and AI-first systems—think real-time data, thoughtful motion, and production-grade architecture. Ask about a specific project or layer of the stack for a deeper brief.'
}

/**
 * Strip characters that look like leaked JSON delimiters from displayed assistant text.
 * @param {string} text
 * @returns {string}
 */
export function stripJsonDelimiters(text) {
  return text.replace(/[{}]/g, '')
}
