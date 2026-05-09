import React, { useEffect, useRef, useMemo, useState } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 300 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 2000, // More height to cover scroll
      radius: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      // depth: 1 (back), 2 (mid), 3 (front)
      depth: Math.floor(Math.random() * 3) + 1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw stars with parallax
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.opacity * (0.6 + 0.4 * twinkle);
        
        const x = (star.x / 1920) * canvas.width;
        
        // Parallax logic: near stars move more, far stars move less
        // depth 1: slow (far), depth 2: medium, depth 3: fast (near)
        const parallaxOffset = scrollY * (star.depth * 0.15);
        let y = ((star.y - parallaxOffset) % canvas.height + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.radius * (star.depth * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [stars, scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarField;
