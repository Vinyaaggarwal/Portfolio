import React, { useEffect, useState } from 'react';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      {/* Animated starfield background */}
      <StarField />

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
