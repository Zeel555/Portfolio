// npm install gsap
// GSAP version: 3.x
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ACCENT_COLORS = {
  purple: '#7C3AED',
  cyan: '#06B6D4',
  white: '#FFFFFF',
}

function hexToRgba(hex, alpha = 1) {
  const normalized = hex.replace('#', '')
  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized
  const intValue = Number.parseInt(fullHex, 16)
  const r = (intValue >> 16) & 255
  const g = (intValue >> 8) & 255
  const b = intValue & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function NeuralCursor({ disabled = false, color = 'purple' }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (disabled || typeof window === 'undefined') {
      return undefined
    }

    if (isTouchDevice || prefersReducedMotion) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    if (!dot || !ring || !label) {
      return undefined
    }

    const accentColor = ACCENT_COLORS[color] || ACCENT_COLORS.purple
    const cursorStyleTag = document.createElement('style')
    cursorStyleTag.setAttribute('data-neural-cursor', 'true')
    cursorStyleTag.textContent = '* { cursor: none !important; }'
    document.head.appendChild(cursorStyleTag)

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }
    const defaultState = {
      dotScale: 1,
      dotSize: 8,
      dotColor: '#06B6D4',
      ringScale: 1,
      ringSize: 36,
      ringBorderColor: accentColor,
      ringBorderOpacity: 0.6,
      ringBg: 'transparent',
      label: '',
      labelColor: '#06B6D4',
    }
    const textState = {
      dotScale: 0.375,
      dotSize: 8,
      dotColor: '#FFFFFF',
      ringScale: 24 / 36,
      ringSize: 36,
      ringBorderColor: accentColor,
      ringBorderOpacity: 0.3,
      ringBg: 'transparent',
      label: '',
      labelColor: '#FFFFFF',
    }

    const currentState = { ...defaultState }
    let isInteracting = false
    let activeHoverKind = 'default'
    let pulseTween = null
    let currentMagneticElement = null
    let ringSpinTween = null

    gsap.set(dot, {
      x: mouse.x - defaultState.dotSize / 2,
      y: mouse.y - defaultState.dotSize / 2,
      width: defaultState.dotSize,
      height: defaultState.dotSize,
      opacity: 1,
      scale: defaultState.dotScale,
      backgroundColor: defaultState.dotColor,
      borderRadius: '999px',
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      boxShadow: '0 0 8px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.6)',
      force3D: true,
    })

    gsap.set(ring, {
      x: ringPos.x - defaultState.ringSize / 2,
      y: ringPos.y - defaultState.ringSize / 2,
      width: defaultState.ringSize,
      height: defaultState.ringSize,
      opacity: 1,
      scale: defaultState.ringScale,
      border: `1px solid ${hexToRgba(defaultState.ringBorderColor, defaultState.ringBorderOpacity)}`,
      borderColor: hexToRgba(defaultState.ringBorderColor, defaultState.ringBorderOpacity),
      borderRadius: '999px',
      backgroundColor: defaultState.ringBg,
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9998,
      boxShadow: 'inset 0 0 8px rgba(124, 58, 237, 0.15)',
      force3D: true,
    })

    gsap.set(label, {
      opacity: 0,
      color: defaultState.labelColor,
      fontSize: '8px',
      letterSpacing: '0.18em',
      fontWeight: 400,
      textTransform: 'uppercase',
      fontFamily: 'Space Grotesk, sans-serif',
    })

    const startPulse = () => {
      if (pulseTween) {
        pulseTween.kill()
      }
      pulseTween = gsap.to(ring, {
        scale: 1.08,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    const stopPulse = () => {
      if (!pulseTween) {
        return
      }
      pulseTween.kill()
      pulseTween = null
    }

    const stopRingSpin = () => {
      if (ringSpinTween) {
        ringSpinTween.kill()
        ringSpinTween = null
      }
      gsap.killTweensOf(ring, 'rotation')
      gsap.set(ring, { rotation: 0 })
    }

    const startRingSpin = () => {
      if (ringSpinTween) {
        ringSpinTween.kill()
      }
      ringSpinTween = gsap.to(ring, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      })
    }

    const applyState = (nextState, duration = 0.3) => {
      currentState.dotScale = nextState.dotScale
      currentState.dotSize = nextState.dotSize
      currentState.dotColor = nextState.dotColor
      currentState.ringScale = nextState.ringScale
      currentState.ringSize = nextState.ringSize
      currentState.ringBorderColor = nextState.ringBorderColor
      currentState.ringBorderOpacity = nextState.ringBorderOpacity
      currentState.ringBg = nextState.ringBg
      currentState.label = nextState.label
      currentState.labelColor = nextState.labelColor

      gsap.to(dot, {
        scale: nextState.dotScale,
        width: nextState.dotSize,
        height: nextState.dotSize,
        backgroundColor: nextState.dotColor,
        duration,
        ease: duration <= 0.2 ? 'power1.out' : 'power2.out',
      })

      gsap.to(ring, {
        scale: nextState.ringScale,
        width: nextState.ringSize,
        height: nextState.ringSize,
        borderColor: hexToRgba(nextState.ringBorderColor, nextState.ringBorderOpacity),
        backgroundColor: nextState.ringBg,
        duration,
        ease: duration <= 0.2 ? 'power1.out' : 'power2.out',
      })

      if (nextState.label) {
        label.textContent = nextState.label
        gsap.to(label, {
          opacity: 1,
          color: nextState.labelColor,
          duration: 0.2,
          ease: 'power1.out',
        })
      } else {
        gsap.to(label, {
          opacity: 0,
          duration: 0.16,
          ease: 'power1.out',
        })
      }
    }

    const setHoverState = (hoverKind) => {
      if (activeHoverKind === hoverKind) {
        return
      }

      activeHoverKind = hoverKind

      if (hoverKind === 'default') {
        applyState(defaultState, 0.3)
        stopRingSpin()
        startPulse()
        return
      }

      stopPulse()

      if (hoverKind === 'card') {
        applyState(
          {
            ...defaultState,
            dotScale: 0,
            ringScale: 60 / 36,
            ringBorderColor: '#7C3AED',
            ringBg: 'rgba(124, 58, 237, 0.04)',
            ringBorderOpacity: 0.5,
            label: 'OPEN',
            labelColor: '#7C3AED',
          },
          0.3,
        )
        startRingSpin()
        return
      }

      if (hoverKind === 'link') {
        applyState(
          {
            ...defaultState,
            dotScale: 0,
            ringScale: 52 / 36,
            ringBorderColor: '#06B6D4',
            ringBg: 'rgba(6, 182, 212, 0.04)',
            ringBorderOpacity: 0.5,
            label: 'GO',
            labelColor: '#06B6D4',
          },
          0.3,
        )
        startRingSpin()
        return
      }

      if (hoverKind === 'button') {
        applyState(
          {
            ...defaultState,
            dotScale: 0,
            ringScale: 52 / 36,
            ringBorderColor: '#06B6D4',
            ringBg: 'rgba(6, 182, 212, 0.04)',
            ringBorderOpacity: 0.5,
            label: 'VIEW',
            labelColor: '#06B6D4',
          },
          0.3,
        )
        startRingSpin()
        return
      }

      if (hoverKind === 'text') {
        stopRingSpin()
        applyState(textState, 0.2)
      }
    }

    const resetMagnetic = (element) => {
      if (!element) {
        return
      }
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    const updateHoverAndMagnet = (eventTarget) => {
      const target = eventTarget instanceof Element ? eventTarget : null
      const card = target?.closest('.project-card')
      const link = target?.closest('a')
      const button = target?.closest('button, [role="button"]')
      const text = target?.closest('p, h1, h2, h3, span')

      if (card) {
        setHoverState('card')
      } else if (link) {
        setHoverState('link')
      } else if (button) {
        setHoverState('button')
      } else if (text) {
        setHoverState('text')
      } else {
        setHoverState('default')
      }

      const magneticElement = target?.closest('.magnetic') || null
      if (magneticElement !== currentMagneticElement) {
        resetMagnetic(currentMagneticElement)
        currentMagneticElement = magneticElement
      }
    }

    const handleMouseMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY

      gsap.set(dot, {
        x: mouse.x - currentState.dotSize / 2,
        y: mouse.y - currentState.dotSize / 2,
      })

      updateHoverAndMagnet(event.target)

      if (currentMagneticElement) {
        const rect = currentMagneticElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = mouse.x - centerX
        const deltaY = mouse.y - centerY
        const distance = Math.hypot(deltaX, deltaY)

        if (distance <= 80) {
          const translateX = gsap.utils.clamp(-12, 12, deltaX * 0.35)
          const translateY = gsap.utils.clamp(-10, 10, deltaY * 0.35)
          gsap.to(currentMagneticElement, {
            x: translateX,
            y: translateY,
            duration: 0.22,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else {
          resetMagnetic(currentMagneticElement)
        }
      }
    }

    const tickerUpdate = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12
      ringPos.y += (mouse.y - ringPos.y) * 0.12

      gsap.set(ring, {
        x: ringPos.x - currentState.ringSize / 2,
        y: ringPos.y - currentState.ringSize / 2,
      })
    }

    const handleMouseDown = () => {
      isInteracting = true
      gsap.to(dot, { scale: currentState.dotScale * 0.6, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { scale: currentState.ringScale * 0.85, duration: 0.1, ease: 'power2.out' })
    }

    const handleMouseUp = () => {
      if (!isInteracting) {
        return
      }
      isInteracting = false
      gsap.to(dot, { scale: currentState.dotScale, duration: 0.15, ease: 'power2.out' })
      gsap.to(ring, { scale: currentState.ringScale, duration: 0.15, ease: 'power2.out' })
    }

    const handleWindowLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3, ease: 'power1.out' })
      resetMagnetic(currentMagneticElement)
      currentMagneticElement = null
    }

    const handleWindowEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: 'power1.out' })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleWindowLeave)
    document.addEventListener('mouseenter', handleWindowEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    gsap.ticker.add(tickerUpdate)
    setHoverState('default')

    return () => {
      gsap.ticker.remove(tickerUpdate)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleWindowLeave)
      document.removeEventListener('mouseenter', handleWindowEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      stopPulse()
      stopRingSpin()
      resetMagnetic(currentMagneticElement)
      gsap.killTweensOf([dot, ring, label])

      if (cursorStyleTag.parentNode) {
        cursorStyleTag.parentNode.removeChild(cursorStyleTag)
      }
    }
  }, [color, disabled, isTouchDevice, prefersReducedMotion])

  if (disabled || isTouchDevice || prefersReducedMotion) {
    return null
  }

  return (
    <>
      <div ref={dotRef} />
      <div
        ref={ringRef}
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span ref={labelRef} />
      </div>
    </>
  )
}

export default NeuralCursor

// Place <NeuralCursor /> once, directly inside App.jsx
// Must be OUTSIDE any scroll containers
// Example:
// function App() {
//   return (
//     <>
//       <NeuralCursor />
//       <NeuralBackground />
//       <div style={{ position: 'relative', zIndex: 1 }}>
//         ... your pages
//       </div>
//     </>
//   )
// }
