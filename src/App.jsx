import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CursorSpotlight from './components/CursorSpotlight';
import FallingParticles from './components/FallingParticles';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll progress logic
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* Interactive Background Effects */}
      <StarField />
      <FallingParticles />
      <CursorSpotlight />

      {/* Fixed grid overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Navbar */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Section divider */}
        <div className="section-divider" />

        <About />

        <div className="section-divider" />

        <Skills />

        <div className="section-divider" />

        <Experience />

        <div className="section-divider" />

        <Projects />

        <div className="section-divider" />

        <Contact />
      </main>
    </div>
  );
}

export default App;
