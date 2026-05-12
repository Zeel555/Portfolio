import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AboutNeural from './components/AboutNeural'
import ContactNeural from './components/ContactNeural'
import Hero from './components/Hero'
import IntelligentSystems from './components/IntelligentSystems'
import NeuralAssistant from './components/NeuralAssistant'
import NeuralBackground from './components/NeuralBackground'
import NeuralCursor from './components/NeuralCursor'
import ProjectModal from './components/ProjectModal'
import SkillsUniverse from './components/SkillsUniverse'
import useLenisSmoothScroll from './hooks/useLenisSmoothScroll'

function App() {
  const [backgroundIntensity, setBackgroundIntensity] = useState('medium')
  const [selectedProject, setSelectedProject] = useState(null)

  useLenisSmoothScroll()

  useEffect(() => {
    const projectsSection = document.querySelector('#projects')

    if (!projectsSection) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBackgroundIntensity(entry.isIntersecting ? 'low' : 'medium')
      },
      { threshold: 0.18 },
    )

    observer.observe(projectsSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <>
      <NeuralCursor />
      <NeuralBackground intensity={backgroundIntensity} />
      <NeuralAssistant />
      <div className="relative z-10">
        <Hero />
        <AboutNeural />
        <SkillsUniverse />
        <IntelligentSystems onProjectClick={setSelectedProject} />
        <ContactNeural />
      </div>
      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default App
