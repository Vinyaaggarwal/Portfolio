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
    return Array.from({ length: 250 }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 2000,
      radius: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      depth: Math.floor(Math.random() * 3) + 1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      velocityX: (Math.random() - 0.5) * 0.2, // Small horizontal drift
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;
    
    // Shooting stars state
    let shootingStars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw background stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.opacity * (0.6 + 0.4 * twinkle);
        
        // Apply drift
        star.x = (star.x + star.velocityX + 1920) % 1920;
        const x = (star.x / 1920) * canvas.width;
        
        // Parallax
        const parallaxOffset = scrollY * (star.depth * 0.1);
        let y = ((star.y - parallaxOffset) % canvas.height + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.radius * (star.depth * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Shooting stars logic
      if (Math.random() < 0.01 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          length: Math.random() * 100 + 50,
          speed: Math.random() * 15 + 10,
          opacity: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2
        });
      }

      shootingStars = shootingStars.filter(s => s.opacity > 0);
      shootingStars.forEach(s => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;
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
