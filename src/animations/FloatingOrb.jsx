import React from "react";
import FloatWrapper from "./FloatWrapper";

/**
 * FloatingOrb - A decorative atmospheric glow element.
 * 
 * @param {number} size - Diameter in px
 * @param {string} color - Preset color name
 * @param {number} opacity - Overall opacity (0-1)
 * @param {string} top, left, right, bottom - CSS position
 * @param {string} speed - Float preset speed
 * @param {number} delay - Animation start delay
 * @param {number} blur - CSS blur radius in px
 */
const FloatingOrb = ({
  size = 120,
  color = "purple",
  opacity = 0.15,
  top,
  left,
  right,
  bottom,
  speed = "slow",
  delay = 0,
  blur = 60,
}) => {
  const colorMap = {
    purple: "#7C3AED",
    cyan: "#06B6D4",
    blue: "#3B82F6",
    pink: "#EC4899",
  };

  const hexColor = colorMap[color] || colorMap.purple;

  const style = {
    position: "absolute",
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${hexColor} 0%, transparent 70%)`,
    filter: `blur(${blur}px)`,
    opacity,
    pointerEvents: "none",
    zIndex: 0,
    willChange: "transform",
  };

  return (
    <FloatWrapper speed={speed} delay={delay} pauseOnHover={false}>
      <div style={style} aria-hidden="true" />
    </FloatWrapper>
  );
};

export default FloatingOrb;
