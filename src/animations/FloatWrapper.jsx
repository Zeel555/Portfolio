import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

/**
 * staggerFloat - Helper to generate staggered delay arrays
 * @param {number} count - Number of elements
 * @param {number} baseDelay - Initial delay
 * @param {number} step - Delay increment
 */
export const staggerFloat = (count, baseDelay = 0, step = 0.3) =>
  Array.from({ length: count }, (_, i) => baseDelay + i * step);

/**
 * FloatWrapper - A component that makes its children float weightlessly.
 */
const FloatWrapper = ({
  children,
  speed = "medium",
  delay = 0,
  yRange: customY,
  xRange: customX = 0,
  rotate: customRotate = 2,
  pauseOnHover = true,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Preset Mapping
  const presets = {
    slow: { duration: 6, y: 12 },
    medium: { duration: 4, y: 18 },
    fast: { duration: 2.5, y: 24 },
  };

  const preset = presets[speed];
  const duration = preset.duration;
  const yRange = customY ?? preset.y;
  const xRange = customX;
  const rotate = customRotate;

  // Animation variants
  const floatAnimation = {
    y: [0, -yRange, 0, yRange, 0],
    x: [0, xRange, 0, -xRange, 0],
    rotate: [0, rotate, 0, -rotate, 0],
  };

  const transition = {
    duration,
    delay,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        animate={floatAnimation}
        whileHover={pauseOnHover ? { y: 0, x: 0, rotate: 0 } : {}}
        transition={
          pauseOnHover
            ? { ...transition, whileHover: { duration: 0.6 } }
            : transition
        }
        style={{ willChange: "transform" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default FloatWrapper;
