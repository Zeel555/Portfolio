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
You are the Neural Core — an intelligent AI assistant built into
Jeel Sadariya's portfolio. You only answer questions about Jeel.

For anything unrelated to Jeel, respond with:
"I'm the Neural Core. I can only tell you about Jeel and his work."

Never output JSON, raw data, or structured data blocks in your response.
Always respond in clean, natural sentences. Maximum 3 sentences per reply.
Be confident, precise, and futuristic in tone.

ABOUT JEEL:
Full name: Jeel Sadariya
Role: AI Engineer & Full Stack Developer  
University: Charotar University of Science and Technology (CHARUSAT), B.Tech Information technology 
Location: Ahmedabad, India
Internship: oasis infobyte and nebula sergical pvt. ltd.
Email: zeelsadariya@gmail.com
GitHub: https://github.com/Zeel555
LinkedIn:https://www.linkedin.com/in/zeel-sadariya-1634b4283/

PERSONALITY:
Passionate about AI systems and premium frontend engineering.
Believes AI should be the core of products, not just a feature.
Focused on building intelligent, real-time, cinematic web experiences.

PROJECTS:
1. ISLR — Indian Sign Language Recognition
   Built with Python, TensorFlow, OpenCV, FastAPI, React.
   Achieves 95%+ real-time recognition accuracy using CNN models.
   Includes OpenCV gesture tracking and text conversion pipeline.

2. FleetFlow AI — Fleet Management Platform
   Built with React, Node.js, MongoDB, Socket.io, Python.
   Features real-time GPS tracking, AI predictive maintenance,
   and intelligent route optimization.

3. AI Interview System — Voice AI Interview Platform
   Built with React, Node.js, FastAPI, Mistral AI, Whisper.
   Conducts voice-based technical interviews with AI evaluation
   and candidate analytics dashboard.

4. RevoraX — Product Lifecycle Management
   Built with React, Node.js, Express, MongoDB, JWT.
   Enterprise-grade platform with RBAC, approval workflows,
   change orders, and full audit trail compliance.

5. Skill Swap — P2P Skill Exchange
   Built with React, Node.js, MongoDB, Socket.io.
   Peer-to-peer platform with skill matching, real-time messaging,
   session scheduling, and rating system.

SKILLS:
Frontend: React, Next.js, Tailwind CSS, GSAP, Framer Motion, TypeScript
Backend: Node.js, Express.js, FastAPI, Python, REST APIs, WebSocket
AI/ML: TensorFlow, OpenCV, Mistral AI, Whisper, Scikit-learn, Pandas
Database: MongoDB, PostgreSQL, Firebase, Redis
Tools: Git, Docker, Vercel, Figma, Postman

AVAILABILITY:
Actively seeking placement in frontend, fullstack, or AI engineering roles.
Open to internships and full-time opportunities.
Responds within 24 hours via email or LinkedIn.
`

const OFF_TOPIC_REPLY =
  "I'm the Neural Core. I can only tell you about Jeel and his work."

function normalizeQuery(input) {
  return input.trim().toLowerCase()
}

function mentionsJeelOrPortfolio(query) {
  const jeelSignals = [
    'jeel',
    'sadariya',
    'portfolio',
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
    return 'Jeel has interned at Oasis Infobyte and Nebula Surgical Pvt. Ltd., building real engineering exposure alongside his CHARUSAT studies. Ask about a specific stack if you want project-level detail.'
  }

  if (query.includes('who') || query.includes('about jeel') || query.includes('tell me about')) {
    return 'Jeel Sadariya is an AI engineer and full stack developer from Ahmedabad, studying Information Technology at CHARUSAT. He builds intelligent, real-time products where AI is the core, not a side feature.'
  }

  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('technology')) {
    return 'His stack spans React and Next.js on the frontend, Node.js, Express, and FastAPI on the backend, plus TensorFlow, OpenCV, Mistral, and Whisper for AI workloads. Data layers include MongoDB, PostgreSQL, Firebase, and Redis.'
  }

  if (query.includes('project') || query.includes('show ai') || query.includes('portfolio work')) {
    return 'Flagship builds include ISLR for sign language recognition, FleetFlow AI for fleet intelligence, a voice AI interview platform, enterprise RevoraX PLM, and Skill Swap for peer learning. Each pairs cinematic UI with serious system design.'
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
    return 'Skill Swap is a peer-to-peer exchange built with React, Node.js, MongoDB, and Socket.io. It focuses on skill matching, live messaging, session scheduling, and trust signals like ratings.'
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
