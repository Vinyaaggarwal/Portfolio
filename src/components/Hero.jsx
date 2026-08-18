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
      <FloatingOrb className="w-96 h-96 bg-purple-600 top-20 -left-20" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-blue-600 bottom-20 -right-20" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-cyan-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={4} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="glass px-4 py-2 rounded-full text-sm text-cyan-400 border border-cyan-400/30 font-medium tracking-wide">
              🚀 Open to Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-none">
              <span className="text-white">Vinya</span>{' '}
              <span className="gradient-text">Aggarwal</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-slate-300 mb-3 font-medium tracking-wide">
              Aspiring Software Engineer
              <span className="mx-2 text-purple-400">|</span>
              MERN Stack
              <span className="mx-2 text-blue-400">|</span>
              DSA
              <span className="mx-2 text-cyan-400">|</span>
              AI/ML
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants}>
            <p className="text-2xl md:text-3xl font-light text-slate-400 mb-12 italic">
              "Exploring the{' '}
              <span className="gradient-text font-semibold not-italic">universe</span>
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
                className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
                whileTap={{ scale: 0.93 }}
              >
                <span className="flex items-center gap-2">
                  <Rocket size={18} />
                  View Missions
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
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
                className="group px-8 py-4 rounded-xl font-semibold text-white border border-white/20 glass hover:border-purple-500/60 transition-all duration-300 flex items-center gap-2"
                whileTap={{ scale: 0.93 }}
              >
                <Download size={18} className="group-hover:text-purple-400 transition-colors" />
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
              { value: '8.48', label: 'CGPA' },
              { value: '10+', label: 'Projects' },
              { value: '2', label: 'Internship' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</div>
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
        <ChevronDown size={28} className="text-purple-400 opacity-60" />
      </motion.div>
    </section>
  );
};

export default Hero;
