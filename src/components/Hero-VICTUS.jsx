import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Rocket } from 'lucide-react';
import MagneticButton from './MagneticButton';

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{
      y: [0, -30, 0],
      scale: [1, 1.1, 1],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Hero = () => {
  const titleRef = useRef(null);

  const handleViewMissions = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background orbs */}
      <FloatingOrb className="w-96 h-96 bg-primary/20 top-20 -left-20" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-accent/10 bottom-20 -right-20" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={4} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="glass px-5 py-1.5 rounded-full text-xs text-primary font-semibold tracking-[0.2em] uppercase border border-primary/20">
              🚀 Open to Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
              <span className="text-text-primary">Vinya</span>{' '}
              <span className="gradient-primary">Aggarwal</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-text-secondary mb-3 font-medium tracking-wide flex flex-wrap justify-center items-center gap-2 md:gap-4">
              <span>Software Engineer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
              <span>MERN Stack</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
              <span>DSA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
              <span>AI/ML</span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants}>
            <p className="text-2xl md:text-3xl font-light text-text-secondary mb-12 italic">
              "Exploring the{' '}
              <span className="text-text-primary font-semibold not-italic border-b border-primary/40">universe</span>
              {' '}of code"
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Magnetic: View Missions */}
            <MagneticButton radius={90} strength={0.45}>
              <motion.button
                id="view-missions-btn"
                onClick={handleViewMissions}
                className="btn-primary group relative px-10 py-4 rounded-xl font-bold overflow-hidden"
                whileTap={{ scale: 0.93 }}
              >
                <span className="flex items-center gap-2">
                  <Rocket size={18} />
                  View Projects
                </span>
              </motion.button>
            </MagneticButton>

            {/* Magnetic: Download Resume */}
            <MagneticButton radius={90} strength={0.45}>
              <motion.a
                id="download-resume-btn"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Vinya_Aggarwal_Resume.pdf"
                className="btn-secondary group px-10 py-4 rounded-xl font-bold flex items-center gap-2"
                whileTap={{ scale: 0.93 }}
              >
                <Download size={18} className="group-hover:text-primary transition-colors" />
                Download Resume
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { value: '8.36', label: 'CGPA' },
              { value: '10+', label: 'Projects' },
              { value: '1', label: 'Internship' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-text-primary">{stat.value}</div>
                <div className="text-[10px] text-text-secondary mt-1 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={28} className="text-text-secondary opacity-40" />
      </motion.div>
    </section>
  );
};

export default Hero;
