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
    color: '#a855f7',
    colorDark: 'rgba(168,85,247,0.15)',
    gradient: 'from-purple-600 to-blue-600',
    tag: 'Full Stack · MERN',
    description:
      'Full-stack MERN application for personal expense tracking, budgeting, and financial analytics. Features interactive dashboards, category filters, trend charts, and JWT-based authentication.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Chart.js'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://expense-tracker-demo.vercel.app',
    demoVideo: null,
    // Simulated screenshot colors (gradient placeholders)
    screens: [
      { label: 'Dashboard', grad: 'from-purple-900 via-purple-800 to-blue-900', img: null },
      { label: 'Analytics', grad: 'from-blue-900 via-indigo-800 to-purple-900', img: null },
    ],
  },
  {
    id: 2,
    title: 'Routing Engine',
    emoji: '📍',
    color: '#3b82f6',
    colorDark: 'rgba(59,130,246,0.15)',
    gradient: 'from-blue-600 to-cyan-600',
    tag: 'Algorithms · C++',
    description:
      'Google Maps-style routing engine using efficient graph-based optimization. Implemented Dijkstra and A* algorithms to handle 10,000+ nodes, achieving a 60% boost in pathfinding performance using STL and custom heuristics.',
    tech: ['C++', 'STL', 'Graph Algorithms', 'Dijkstra', 'A*', 'Heuristics'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://github.com/vinyaaggarwal',
    demoVideo: null,
    screens: [
      { label: 'Route Optimization', grad: 'from-blue-900 via-cyan-900 to-teal-900', img: '/screenshots/Routing1.png' },
      { label: 'Network Graph', grad: 'from-cyan-900 via-blue-900 to-indigo-900', img: '/screenshots/Routing2.png' },
    ],
  },
  {
    id: 3,
    title: 'PERRY',
    emoji: '🧠',
    color: '#ec4899',
    colorDark: 'rgba(236,72,153,0.15)',
    gradient: 'from-pink-600 to-rose-600',
    tag: 'AI/ML · Mental Health',
    description:
      'AI-powered mental health & productivity hub integrating real-time emotion detection via webcam, guided journaling, and productivity analytics powered by TensorFlow, OpenCV, and NLP transformers.',
    tech: ['TensorFlow', 'OpenCV', 'Python', 'NLP', 'React.js', 'MongoDB'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://perry-hub.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Emotion Recognition', grad: 'from-pink-900 via-rose-900 to-red-900', img: '/screenshots/perry1.png' },
      { label: 'AI Journaling', grad: 'from-rose-900 via-pink-900 to-purple-900', img: '/screenshots/perry2.png' },
      { label: 'Analytics Dashboard', grad: 'from-purple-900 via-pink-800 to-rose-900', img: '/screenshots/perry3.png' },
      { label: 'Voice Assistant', grad: 'from-rose-800 via-red-900 to-pink-900', img: '/screenshots/perry4.png' },
      { label: 'Platform Overview', grad: 'from-red-900 via-rose-800 to-pink-800', img: '/screenshots/perry5.png' },
    ],
  },
  {
    id: 4,
    title: 'InternX',
    emoji: '🚀',
    color: '#06b6d4',
    colorDark: 'rgba(6,182,212,0.15)',
    gradient: 'from-cyan-600 to-teal-600',
    tag: 'Platform · Career Tech',
    description:
      'Comprehensive platform helping students discover, manage, and track internship opportunities. Features AI-driven RL recommendations, smart filters, ATS resume builder, and multi-role authentication.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Python', 'AI/ML'],
    github: 'https://github.com/vinyaaggarwal',
    demo: 'https://internx.vercel.app',
    demoVideo: null,
    screens: [
      { label: 'Job Explorer', grad: 'from-cyan-900 via-teal-900 to-emerald-900', img: '/screenshots/internx1.png' },
      { label: 'Application Portal', grad: 'from-teal-900 via-cyan-900 to-blue-900', img: '/screenshots/internx2.png' },
      { label: 'Smart Filters', grad: 'from-emerald-900 via-teal-800 to-cyan-900', img: '/screenshots/internx3.png' },
      { label: 'AI Analytics', grad: 'from-cyan-800 via-teal-900 to-emerald-800', img: '/screenshots/internx4.png' },
      { label: 'Resume Analyzer', grad: 'from-teal-800 via-blue-900 to-cyan-800', img: '/screenshots/internx5.png' },
      { label: 'User Dashboard', grad: 'from-blue-900 via-indigo-900 to-purple-900', img: '/screenshots/internx6.png' },
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
        className="relative z-10 text-xs font-semibold whitespace-nowrap px-2 py-0.5 rounded-full"
        style={{
          color: isActive ? project.color : '#94a3b8',
          background: isActive ? `${project.colorDark}` : 'transparent',
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

/* ─── Browser Gallery (interactive screenshot showcase) ──────────── */
const BrowserGallery = ({ screens, color }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const realScreens = screens.filter(s => s.img);
  if (realScreens.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Primary browser window */}
      <div
        className="relative w-full rounded-xl overflow-hidden border shadow-2xl bg-[#0d1224]"
        style={{ borderColor: `${color}25` }}
      >
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#131929] border-b border-white/5">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 mx-2 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/8">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
            <span className="text-[9px] text-slate-400 font-mono truncate">
              app/{realScreens[activeIdx].label.toLowerCase().replace(/ /g, '-')}
            </span>
          </div>
        </div>
        {/* Main screenshot */}
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={realScreens[activeIdx].img}
              alt={realScreens[activeIdx].label}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224]/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Thumbnail row */}
      <div className="flex gap-2 w-full">
        {realScreens.map((s, idx) => (
          <motion.button
            key={idx}
            onHoverStart={() => setActiveIdx(idx)}
            onClick={() => setActiveIdx(idx)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative flex-1 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
              activeIdx === idx
                ? 'ring-1'
                : 'border-white/8 hover:border-white/20'
            }`}
            style={activeIdx === idx
              ? { borderColor: `${color}70`, boxShadow: `0 0 12px ${color}25`, outlineColor: `${color}40` }
              : {}
            }
          >
            {/* Mini chrome */}
            <div className="flex items-center gap-0.5 px-1.5 py-1 bg-[#131929] border-b border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            </div>
            {/* Thumbnail */}
            <div className="relative h-14">
              <img
                src={s.img}
                alt={s.label}
                className="w-full h-full object-cover object-top"
              />
              {activeIdx !== idx && (
                <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors duration-300" />
              )}
              {activeIdx === idx && (
                <div className="absolute inset-0" style={{ background: `${color}15` }} />
              )}
            </div>
            {/* Label */}
            <div className="bg-[#0d1224] px-1 py-0.5 text-center">
              <span
                className="text-[7px] font-bold uppercase tracking-wider truncate block transition-colors"
                style={{ color: activeIdx === idx ? color : '#475569' }}
              >
                {s.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const DetailPanel = ({ project, onClose }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="glass rounded-2xl border overflow-hidden"
    style={{ borderColor: `${project.color}40` }}
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
        {project.screens.some(s => s.img) ? (
          <BrowserGallery screens={project.screens} color={project.color} />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {project.screens.map((s) => (
              <ScreenMockup key={s.label} screen={s} color={project.color} />
            ))}
          </div>
        )}
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
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-white/30 text-slate-300 hover:text-white text-sm font-medium transition-all"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <GithubIcon size={16} /> GitHub
        </motion.a>

        <motion.a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium bg-gradient-to-r ${project.gradient} shadow-lg`}
          style={{ boxShadow: `0 4px 20px ${project.color}40` }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ExternalLink size={16} /> Live Demo
        </motion.a>

        <motion.button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
          style={{
            background: `${project.color}15`,
            color: project.color,
            borderColor: `${project.color}40`,
          }}
          whileHover={{ scale: 1.04, background: `${project.color}25` }}
          whileTap={{ scale: 0.96 }}
          onClick={() => alert('Demo video coming soon!')}
        >
          <Play size={16} fill="currentColor" /> Demo Video
        </motion.button>
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
  }, []);

  const handleSelect = (project) => {
    setActiveProject(project);
  };

  const handleClose = () => {
    setActiveProject(null);
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
            className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 border border-cyan-500/30 px-3 py-1 rounded-full"
          >
            // active_missions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-md mx-auto text-sm"
          >
            Click any orbiting mission to explore its details, screenshots &amp; demo.
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
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <ChevronRight size={24} className="text-purple-400" />
                  </div>
                  <p className="text-slate-500 font-mono text-sm">Select a mission to view details</p>
                  <div className="flex gap-2 mt-2">
                    {projects.map(p => (
                      <div key={p.id} className="w-2 h-2 rounded-full" style={{ background: p.color + '60' }} />
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
