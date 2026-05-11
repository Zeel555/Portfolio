import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import IntelligentSystems from './components/IntelligentSystems'
import NeuralAssistant from './components/NeuralAssistant'
import NeuralBackground from './components/NeuralBackground'
import NeuralCursor from './components/NeuralCursor'
import SkillsUniverse from './components/SkillsUniverse'
import useLenisSmoothScroll from './hooks/useLenisSmoothScroll'

function App() {
  const [backgroundIntensity, setBackgroundIntensity] = useState('medium')

  useLenisSmoothScroll()

  useEffect(() => {
    const systemsSection = document.querySelector('#systems')

    if (!systemsSection) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBackgroundIntensity(entry.isIntersecting ? 'low' : 'medium')
      },
      { threshold: 0.18 },
    )

    observer.observe(systemsSection)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <NeuralCursor />
      <NeuralBackground intensity={backgroundIntensity} />
      <NeuralAssistant />
      <div className="relative z-10">
        <Hero />
        <SkillsUniverse />
        <IntelligentSystems />
      </div>
    </>
  )
}

export default App
