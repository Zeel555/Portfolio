import { useEffect } from "react";
import { useAnimate, animate, useReducedMotion } from "framer-motion";

/**
 * useAntigravity - A custom hook for smooth, weightless floating animations.
 * 
 * @param {Object} options - Animation configuration
 * @param {number} options.yRange - Vertical float distance (px)
 * @param {number} options.xRange - Horizontal drift distance (px)
 * @param {number} options.duration - Cycle duration (s)
 * @param {number} options.delay - Start delay (s)
 * @param {number} options.rotate - Max rotation (deg)
 * @param {string} options.easing - Framer Motion easing
 * @param {string} options.speed - Preset speed ("slow", "medium", "fast")
 */
const useAntigravity = (options = {}) => {
  const [scope, animateElement] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  // Preset Mapping
  const presets = {
    slow: { duration: 6, yRange: 12 },
    medium: { duration: 4, yRange: 18 },
    fast: { duration: 2.5, yRange: 24 },
  };

  const preset = presets[options.speed] || {};
  
  const {
    yRange = preset.yRange || options.yRange || 18,
    xRange = options.xRange || 0,
    duration = preset.duration || options.duration || 4,
    delay = options.delay || 0,
    rotate = options.rotate || 2,
    easing = options.easing || "easeInOut",
  } = options;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const controls = [];

    // Y Animation: 0 → -yRange → 0 → yRange → 0
    controls.push(
      animate(
        scope.current,
        { y: [0, -yRange, 0, yRange, 0] },
        {
          duration,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: easing,
        }
      )
    );

    // X Animation: 0 → xRange → 0 → -xRange → 0
    if (xRange !== 0) {
      controls.push(
        animate(
          scope.current,
          { x: [0, xRange, 0, -xRange, 0] },
          {
            duration: duration * 1.2, // Slightly offset to feel independent
            delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: easing,
          }
        )
      );
    }

    // Rotation Animation: 0 → rotate → 0 → -rotate → 0
    if (rotate !== 0) {
      controls.push(
        animate(
          scope.current,
          { rotate: [0, rotate, 0, -rotate, 0] },
          {
            duration: duration * 1.5, // Slightly offset to feel independent
            delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: easing,
          }
        )
      );
    }

    return () => controls.forEach((control) => control.stop());
  }, [scope, yRange, xRange, duration, delay, rotate, easing, shouldReduceMotion]);

  return {
    ref: scope,
    style: {
      willChange: "transform",
    },
  };
};

export default useAntigravity;
