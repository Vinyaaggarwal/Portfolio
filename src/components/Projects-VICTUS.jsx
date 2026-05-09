import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ExternalLink, X, Play, ChevronRight, Code2, Monitor } from 'lucide-react';
import GithubIcon from './GithubIcon';

/* ─── Project Data ────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: 'Expense Tracker',
    emoji: '💰',
    color: '#6366f1',
    colorDark: 'rgba(99, 102, 241, 0.1)',
    gradient: 'from-indigo-600 to-blue-700',
    tag: 'Full Stack · MERN',
    description:
      'Full-stack MERN application for personal expense tracking, budgeting, and financial analytics. Features interactive dashboards, category filters, trend charts, and JWT-based authentication.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Chart.js'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://expense-tracker-demo.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Dashboard', grad: 'from-slate-900 to-indigo-950', img: null },
      { label: 'Analytics', grad: 'from-indigo-950 to-slate-900', img: null },
    ],
  },
  {
    id: 2,
    title: 'TripMate',
    emoji: '🗺️',
    color: '#f59e0b',
    colorDark: 'rgba(245, 158, 11, 0.1)',
    gradient: 'from-amber-600 to-orange-700',
    tag: 'Algorithms · Graph Theory',
    description:
      'Graph-based route optimization system implementing Dijkstra and A* algorithms. Handles 10,000+ node graphs with optimized data structures for blazing-fast pathfinding.',
    tech: ['C++', 'Python', 'Graph Theory', 'React.js', 'D3.js', 'Visualization'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://tripmate-demo.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Route Map', grad: 'from-slate-900 to-amber-950', img: null },
      { label: 'Graph View', grad: 'from-amber-950 to-slate-900', img: null },
    ],
  },
  {
    id: 3,
    title: 'PERRY',
    emoji: '🧠',
    color: '#10b981',
    colorDark: 'rgba(16, 185, 129, 0.1)',
    gradient: 'from-emerald-600 to-teal-700',
    tag: 'AI/ML · Mental Health',
    description:
      'AI-powered mental health & productivity hub integrating real-time emotion detection via webcam, guided journaling, and productivity analytics powered by TensorFlow, OpenCV, and NLP transformers.',
    tech: ['TensorFlow', 'OpenCV', 'Python', 'NLP', 'React.js', 'MongoDB'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://perry-hub.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Emotion Detect', grad: 'from-slate-900 to-emerald-950', img: null },
      { label: 'Journal', grad: 'from-emerald-950 to-slate-900', img: null },
    ],
  },
  {
    id: 4,
    title: 'InternX',
    emoji: '🚀',
    color: '#6366f1',
    colorDark: 'rgba(99, 102, 241, 0.1)',
    gradient: 'from-indigo-600 to-blue-700',
    tag: 'Platform · Career Tech',
    description:
      'Comprehensive platform helping students discover, manage, and track internship opportunities. Features AI-driven RL recommendations, smart filters, ATS resume builder, and multi-role authentication.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Python', 'AI/ML'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://internx.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Job Board', grad: 'from-slate-900 to-indigo-950', img: null },
      { label: 'Resume Builder', grad: 'from-indigo-950 to-slate-900', img: null },
    ],
  },
];

/* ─── Orbital Node ────────────────────────────────────────────────── */
const RADIUS = 170; // px from center to node

const OrbitalNode = ({ project, index, total, orbitAngle, isActive, onClick }) => {
  const angle = (index / total) * 360 + orbitAngle;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * RADIUS;
  const y = Math.sin(rad) * RADIUS;

  return (
    <motion.button
      id={`project-node-${project.id}`}
      onClick={() => onClick(project)}
      className="absolute flex flex-col items-center gap-1.5 focus:outline-none group"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      animate={{ x, y }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-150"
        style={{ background: project.color }}
      />
      {/* Icon circle */}
      <motion.div
        animate={{
          boxShadow: isActive
            ? `0 0 0 3px ${project.color}, 0 0 30px ${project.color}99`
            : `0 0 0 1px ${project.color}40`,
          scale: isActive ? 1.2 : 1,
        }}
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all duration-300"
        style={{ background: `radial-gradient(circle, ${project.colorDark} 0%, rgba(2,6,23,0.9) 100%)` }}
      >
        {project.emoji}
      </motion.div>
      {/* Label */}
      <span
        className="relative z-10 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded-full transition-all duration-300"
        style={{
          color: isActive ? 'white' : 'var(--color-text-secondary)',
          background: isActive ? project.color : 'rgba(255,255,255,0.03)',
          border: isActive ? 'none' : '1px solid var(--color-border-subtle)',
        }}
      >
        {project.title}
      </span>
    </motion.button>
  );
};

/* ─── Screenshot Mockup ───────────────────────────────────────────── */
const ScreenMockup = ({ screen, color }) => (
  <div className={`relative rounded-xl overflow-hidden ${screen.img ? 'bg-slate-900' : `bg-gradient-to-br ${screen.grad}`} border border-white/10 aspect-video flex flex-col group/screen`}>
    {screen.img ? (
      <img 
        src={screen.img} 
        alt={screen.label} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/screen:scale-110"
      />
    ) : (
      <>
        {/* Fake browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-2 h-4 rounded bg-white/10 flex items-center px-2">
            <span className="text-white/30 text-xs font-mono">localhost:5173</span>
          </div>
        </div>
        {/* Fake UI content */}
        <div className="flex-1 p-3 flex flex-col gap-2 z-10">
          <div className="h-4 rounded bg-white/10 w-3/4" />
          <div className="flex gap-2">
            <div className="h-16 rounded bg-white/5 flex-1" style={{ borderLeft: `3px solid ${color}` }} />
            <div className="h-16 rounded bg-white/5 flex-1" style={{ borderLeft: `3px solid ${color}60` }} />
          </div>
          <div className="h-3 rounded bg-white/8 w-full" />
          <div className="h-3 rounded bg-white/5 w-2/3" />
        </div>
      </>
    )}
    
    {/* Overlay Gradient for legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

    {/* Label badge */}
    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-xs font-mono z-20" style={{ background: `${color}30`, color, backdropFilter: 'blur(4px)' }}>
      {screen.label}
    </div>
  </div>
);

/* ─── Detail Panel ────────────────────────────────────────────────── */
const DetailPanel = ({ project, onClose }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="glass rounded-2xl border overflow-hidden"
    style={{ borderColor: 'var(--color-border-subtle)' }}
  >
    {/* Top gradient bar */}
    <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{project.emoji}</span>
          <div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${project.color}20`, color: project.color }}
            >
              {project.tag}
            </span>
            <h3 className="text-xl font-black text-white mt-1">{project.title}</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg glass border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>

      {/* Screenshots */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Monitor size={14} style={{ color: project.color }} />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Screenshots</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {project.screens.map((s) => (
            <ScreenMockup key={s.label} screen={s} color={project.color} />
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Code2 size={14} style={{ color: project.color }} />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-md font-medium border"
              style={{
                background: `${project.color}12`,
                color: project.color,
                borderColor: `${project.color}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <GithubIcon size={16} /> GitHub
        </motion.a>

        <motion.a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ExternalLink size={16} /> Live Demo
        </motion.a>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Component ──────────────────────────────────────────────── */
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [orbitAngle, setOrbitAngle] = useState(-90); // start top
  const [paused, setPaused] = useState(false);
  const frameRef = useRef(null);
  const lastTime = useRef(null);

  // Slow continuous rotation
  useEffect(() => {
    if (paused) return;
    const animate = (ts) => {
      if (lastTime.current !== null) {
        const delta = ts - lastTime.current;
        setOrbitAngle((a) => a + delta * 0.012); // ~0.7 rpm
      }
      lastTime.current = ts;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      lastTime.current = null;
    };
  }, [paused]);

  const handleSelect = (project) => {
    setPaused(true);
    setActiveProject(project);
  };

  const handleClose = () => {
    setActiveProject(null);
    setPaused(false);
  };

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-bold text-primary tracking-[0.3em] uppercase mb-4 border border-primary/20 px-4 py-1.5 rounded-full glass"
          >
            Mission Logs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-text-primary mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-md mx-auto text-sm leading-relaxed"
          >
            A curated selection of technical explorations and engineering solutions.
          </motion.p>
        </div>

        {/* Main layout: orbit + detail */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ── Orbital Ring ── */}
          <div className="relative flex-shrink-0 flex items-center justify-center"
            style={{ width: 420, height: 420 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { if (!activeProject) setPaused(false); }}
          >
            {/* Outer decorative rings */}
            <div className="absolute rounded-full border border-white/5"
              style={{ width: RADIUS * 2 + 60, height: RADIUS * 2 + 60 }} />
            <div className="absolute rounded-full border border-dashed border-white/10"
              style={{ width: RADIUS * 2, height: RADIUS * 2 }} />
            <div className="absolute rounded-full border border-white/5"
              style={{ width: RADIUS * 2 - 60, height: RADIUS * 2 - 60 }} />

            {/* Rotating orbit dots */}
            <motion.div
              className="absolute rounded-full border border-purple-500/20"
              style={{ width: RADIUS * 2, height: RADIUS * 2 }}
              animate={{ rotate: paused ? orbitAngle : 360 }}
              transition={paused ? { duration: 0 } : { duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center orb */}
            <motion.div
              className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10"
              style={{
                background: activeProject
                  ? `radial-gradient(circle, ${activeProject.colorDark}, rgba(2,6,23,0.9))`
                  : 'radial-gradient(circle, rgba(168,85,247,0.15), rgba(2,6,23,0.9))',
                boxShadow: activeProject
                  ? `0 0 30px ${activeProject.color}60, 0 0 60px ${activeProject.color}20`
                  : '0 0 30px rgba(168,85,247,0.3)',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {activeProject ? (
                <span className="text-3xl">{activeProject.emoji}</span>
              ) : (
                <span className="text-2xl">⚡</span>
              )}
            </motion.div>

            {/* Project nodes */}
            {projects.map((project, i) => (
              <OrbitalNode
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
                orbitAngle={orbitAngle}
                isActive={activeProject?.id === project.id}
                onClick={handleSelect}
              />
            ))}

            {/* Hint text */}
            {!activeProject && (
              <motion.p
                className="absolute bottom-0 text-xs text-slate-600 font-mono"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                hover to pause · click to explore
              </motion.p>
            )}
          </div>

          {/* ── Detail Panel ── */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <DetailPanel key={activeProject.id} project={activeProject} onClose={handleClose} />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl border border-white/5 p-10 flex flex-col items-center justify-center text-center gap-4 min-h-64"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <ChevronRight size={24} className="text-primary" />
                  </div>
                  <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">Select a project to explore</p>
                  <div className="flex gap-2 mt-2">
                    {projects.map(p => (
                      <div key={p.id} className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a
            href="https://github.com/vinyaaggarwal"
            target="_blank"
            rel="noopener noreferrer"
            id="github-profile-btn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all duration-300 font-medium text-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <GithubIcon size={17} />
            View all on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
