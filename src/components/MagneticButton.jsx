import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * MagneticButton
 * ──────────────
 * Wraps any content. When the cursor enters within `radius` px of
 * the button's center the element glides toward the cursor.
 * The inner content shifts at a subtler rate creating a parallax feel.
 *
 * Props
 *   radius      – detection distance in px  (default 80)
 *   strength    – how far the button moves  (default 0.4, 0-1)
 *   innerStrength – how far inner content moves (default 0.2)
 *   className   – forwarded to the outer wrapper
 *   children    – any React node
 *   ...rest     – forwarded to the <motion.div> (onClick, href etc.)
 */
const MagneticButton = ({
  radius = 80,
  strength = 0.4,
  innerStrength = 0.2,
  className = '',
  children,
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring config – feels snappy but smooth
  const springConfig = { stiffness: 180, damping: 18, mass: 0.6 };

  const rawX = useSpring(0, springConfig);
  const rawY = useSpring(0, springConfig);

  // Outer element moves at `strength` factor
  const outerX = useTransform(rawX, (v) => v * strength);
  const outerY = useTransform(rawY, (v) => v * strength);

  // Inner content moves at `innerStrength` factor (parallax)
  const innerX = useTransform(rawX, (v) => v * innerStrength);
  const innerY = useTransform(rawY, (v) => v * innerStrength);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      setIsHovered(true);
      rawX.set(dx);
      rawY.set(dy);
    } else {
      setIsHovered(false);
      rawX.set(0);
      rawY.set(0);
    }
  }, [radius, rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    // Detection zone – slightly larger than the button itself
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Expand clickable/detection area without visual change
      style={{ padding: radius * 0.3, margin: -(radius * 0.3), display: 'inline-flex' }}
    >
      {/* Outer wrapper – moves toward cursor */}
      <motion.div
        style={{ x: outerX, y: outerY }}
        className={`relative inline-flex ${className}`}
        {...rest}
      >
        {/* Glow ring that appears on hover */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          animate={isHovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Inner content – subtle parallax offset */}
        <motion.div
          style={{ x: innerX, y: innerY }}
          className="relative z-10 flex items-center justify-center w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MagneticButton;
