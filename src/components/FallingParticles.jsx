import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FallingParticles = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: `${p.x}%`, rotate: p.rotation }}
          animate={{ 
            y: '110%', 
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            background: 'white',
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px white`,
          }}
        />
      ))}
    </div>
  );
};

export default FallingParticles;
