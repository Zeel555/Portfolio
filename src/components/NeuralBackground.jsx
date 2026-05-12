// npm install @tsparticles/react @tsparticles/slim

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const INTENSITY_CONFIG = {
  low: {
    particles: 35,
    linkDistance: 85,
    linkOpacity: 0.08,
    opacity: {
      min: 0.18,
      max: 0.42,
    },
  },
  medium: {
    particles: 90,
    linkDistance: 140,
    linkOpacity: 0.15,
    opacity: {
      min: 0.3,
      max: 0.7,
    },
  },
  high: {
    particles: 130,
    linkDistance: 180,
    linkOpacity: 0.15,
    opacity: {
      min: 0.3,
      max: 0.7,
    },
  },
}

let particlesEngineInit

function NeuralBackground({ intensity = 'medium' }) {
  const [isReady, setIsReady] = useState(false)
  const config = INTENSITY_CONFIG[intensity] || INTENSITY_CONFIG.medium
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  useEffect(() => {
    let isMounted = true

    particlesEngineInit ||= initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })

    particlesEngineInit.then(() => {
      if (isMounted) {
        setIsReady(true)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: '#020817',
        },
      },
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: !isTouchDevice,
            mode: ['repulse', 'bubble'],
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          bubble: {
            distance: 120,
            duration: 1.6,
            opacity: 0.9,
            size: 3.5,
          },
          repulse: {
            distance: 120,
            duration: 0.45,
            factor: 4,
          },
        },
      },
      particles: {
        color: {
          value: ['#7C3AED', '#06B6D4', '#3B82F6'],
        },
        links: {
          color: '#7C3AED',
          distance: config.linkDistance,
          enable: true,
          opacity: config.linkOpacity,
          width: 0.5,
        },
        move: {
          bounce: true,
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: {
            min: 0.3,
            max: 0.8,
          },
          straight: false,
        },
        number: {
          density: {
            enable: false,
          },
          value: config.particles,
        },
        opacity: {
          value: config.opacity,
          animation: {
            enable: true,
            speed: 0.25,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: {
            min: 1.5,
            max: 3,
          },
        },
      },
      pauseOnBlur: true,
      responsive: [
        {
          maxWidth: 768,
          options: {
            interactivity: {
              events: {
                onHover: {
                  enable: false,
                },
              },
            },
            particles: {
              number: {
                value: 50,
              },
            },
          },
        },
      ],
    }),
    [
      config.linkDistance,
      config.linkOpacity,
      config.opacity,
      config.particles,
      isTouchDevice,
    ],
  )

  if (!isReady) {
    return null
  }

  return (
    <Particles
      id="neural-background"
      options={options}
      style={{
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 0,
      }}
    />
  )
}

export default NeuralBackground

// <NeuralBackground intensity="medium" />
// Place inside App.jsx above your router/content
// Content needs position: relative and z-index: 1
