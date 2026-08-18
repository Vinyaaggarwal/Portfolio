import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Calendar, MapPin, Users, Shield,
  BarChart2, MessageSquare, Zap, CheckCircle,
  Rocket, Code2, Trophy, Sparkles, Building2
} from 'lucide-react';

const experiences = [
  {
    id: 'codec-ai',
    role: 'Artificial Intelligence Intern',
    company: 'Codec Technologies Pvt. Ltd.',
    period: 'Jun 2026 — Jul 2026',
    location: 'AICTE & ICAC Approved',
    badge: 'Google for Education Partner · AICTE Approved',
    badgeColor: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-300',
    accentColor: '#10b981',
    achievements: [
      { icon: Users, text: 'Completed a 2-Month AICTE & ICAC approved intensive internship in Artificial Intelligence.', highlight: '2-Month AICTE & ICAC' },
      { icon: Shield, text: 'Engineered machine learning and deep learning models for intelligent data processing and predictive tasks.', highlight: 'deep learning models' },
      { icon: BarChart2, text: 'Built computer vision pipelines using Python & OpenCV for object detection and stream analysis.', highlight: 'computer vision pipelines' },
      { icon: Zap, text: 'Optimized model inference performance and data processing workflows for real-time applications.', highlight: 'inference performance' },
    ],
    techStack: [
      { name: 'Python', color: '#3776AB', icon: '🐍' },
      { name: 'TensorFlow', color: '#FF6F00', icon: '🧠' },
      { name: 'OpenCV', color: '#5C3EE8', icon: '👁️' },
      { name: 'PyTorch', color: '#EE4C2C', icon: '🔥' },
      { name: 'AI/ML', color: '#10b981', icon: '🤖' },
      { name: 'Docker', color: '#2496ED', icon: '🐳' },
    ],
    screenshots: [
      { src: '/screenshots/upload_images1.png', label: 'AI Detection', route: 'ai-detection' },
      { src: '/screenshots/upload_videos1.png', label: 'Video Stream', route: 'video-pipeline' },
      { src: '/screenshots/webcam1.png', label: 'Realtime Vision', route: 'vision-tracking' },
    ],
  },
  {
    id: 'infosys-fsd',
    role: 'Full Stack Development Intern',
    company: 'Infosys Springboard',
    period: 'Dec 2025 — Jan 2026',
    location: 'Remote',
    badge: 'Virtual Internship Program',
    badgeColor: 'border-purple-500/25 bg-purple-500/8 text-purple-300',
    accentColor: '#a855f7',
    achievements: [
      { icon: Users, text: 'Built a MERN platform connecting volunteers with NGOs, enabling seamless service coordination.', highlight: 'MERN platform' },
      { icon: Shield, text: 'Implemented role-based authentication supporting multiple user types (admin, volunteer, NGO).', highlight: 'role-based authentication' },
      { icon: BarChart2, text: 'Developed RESTful APIs and interactive dashboards for real-time data insights.', highlight: 'RESTful APIs' },
      { icon: MessageSquare, text: 'Integrated real-time messaging using WebSockets for instant in-platform communication.', highlight: 'WebSockets' },
      { icon: Zap, text: 'Optimized React component performance with memoization, reducing re-renders significantly.', highlight: 'Optimized React' },
      { icon: CheckCircle, text: 'Wrote comprehensive backend unit tests, ensuring system reliability and code quality.', highlight: 'unit tests' },
    ],
    techStack: [
      { name: 'MongoDB', color: '#00ED64', icon: '🍃' },
      { name: 'Express.js', color: '#888', icon: '⚡' },
      { name: 'React.js', color: '#61DAFB', icon: '⚛️' },
      { name: 'Node.js', color: '#3C873A', icon: '🟢' },
      { name: 'Socket.IO', color: '#ffffff', icon: '🔌' },
      { name: 'JWT', color: '#d63aff', icon: '🔐' },
    ],
    screenshots: [
      { src: '/screenshots/Skill1.png', label: 'Dashboard', route: 'dashboard' },
      { src: '/screenshots/skill2.png', label: 'Learning', route: 'learning' },
      { src: '/screenshots/skill3.png', label: 'Courses', route: 'courses' },
      { src: '/screenshots/skill4.png', label: 'Progress', route: 'progress' },
      { src: '/screenshots/skill5.png', label: 'Certs', route: 'certifications' },
    ],
  },
];

const footerCards = [
  {
    icon: Rocket,
    title: 'IMPACT',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    desc: 'Delivered industry-level AI models & full-stack web architectures under AICTE & Infosys guidelines.',
  },
  {
    icon: Code2,
    title: 'FOCUS',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    desc: 'Artificial Intelligence, Deep Learning, Full Stack MERN Development, Computer Vision',
  },
  {
    icon: Trophy,
    title: 'ACHIEVEMENT',
    color: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
    desc: 'Completed AICTE-approved and National-level competitive internship programs.',
  },
];

const HighlightedText = ({ text, highlight }) => {
  if (!highlight) return <span>{text}</span>;
  const idx = text.indexOf(highlight);
  if (idx === -1) return <span>{text}</span>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-purple-300 font-semibold">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedExpIdx, setSelectedExpIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const currentExp = experiences[selectedExpIdx];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
    }),
  };

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[140px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[120px] translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" ref={ref}>

        {/* ── Section label ─────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-blue-500/60" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-blue-400/70">Mission Log</span>
          </div>

          {/* Internship Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass border border-white/10 self-start md:self-auto">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => {
                  setSelectedExpIdx(idx);
                  setActiveIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  selectedExpIdx === idx
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 size={14} />
                {exp.company}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Main Card ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#0d1224] via-[#0a0d1a] to-[#0d1224] shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col xl:flex-row gap-12">

                {/* ── LEFT: Text Content ─────────────────── */}
                <div className="xl:w-[46%] flex flex-col">

                  {/* Date badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar size={13} className="text-purple-400" />
                    <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                      {currentExp.period}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight tracking-tight">
                    {currentExp.role}
                  </h3>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-lg font-bold gradient-text">{currentExp.company}</span>
                    <div className="h-4 w-px bg-white/20" />
                    <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                      <MapPin size={14} /> {currentExp.location}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="mb-8">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${currentExp.badgeColor} text-xs font-semibold`}>
                      <Sparkles size={11} /> {currentExp.badge}
                    </span>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-5 flex-1">
                    {currentExp.achievements.map(({ icon: Icon, text, highlight }, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-4 group"
                      >
                        <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center group-hover:border-purple-500/30 group-hover:bg-purple-500/8 transition-all duration-300">
                          <Icon size={15} className="text-slate-400 group-hover:text-purple-400 transition-colors duration-300" />
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          <HighlightedText text={text} highlight={highlight} />
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* ── RIGHT: Screenshot Showcase ─────────── */}
                <div className="xl:w-[54%] flex flex-col gap-8">

                  {/* Interactive Browser-Window Gallery */}
                  <div className="flex flex-col gap-4 w-full">

                    {/* ── Primary Browser Window ── */}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10
                                    shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-[#0d1224]">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#131929] border-b border-white/6">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex items-center gap-2 mx-2 px-3 py-1 rounded-lg bg-white/5 border border-white/8">
                          <div className="w-2 h-2 rounded-full bg-green-500/60 shrink-0" />
                          <span className="text-[10px] text-slate-400 font-mono truncate">
                            portal/{currentExp.screenshots[activeIdx]?.route || 'overview'}
                          </span>
                        </div>
                      </div>

                      {/* Main Screenshot with crossfade */}
                      <div className="relative overflow-hidden" style={{ height: '240px' }}>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeIdx}
                            src={currentExp.screenshots[activeIdx]?.src}
                            alt={currentExp.screenshots[activeIdx]?.label}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        </AnimatePresence>
                        {/* Bottom vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224]/60 via-transparent to-transparent pointer-events-none z-10" />
                      </div>
                    </div>

                    {/* ── Thumbnail Preview Row ── */}
                    <div className="flex gap-2.5 w-full">
                      {currentExp.screenshots.map((ss, idx) => (
                        <motion.button
                          key={idx}
                          onHoverStart={() => setActiveIdx(idx)}
                          onClick={() => setActiveIdx(idx)}
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative flex-1 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer
                            ${activeIdx === idx
                              ? 'border-purple-500/60 shadow-[0_0_16px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/30'
                              : 'border-white/8 hover:border-white/20'
                            }`}
                        >
                          {/* Mini browser chrome */}
                          <div className="flex items-center gap-1 px-2 py-1.5 bg-[#131929] border-b border-white/5">
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                            </div>
                          </div>
                          {/* Thumbnail image */}
                          <div className="relative h-16">
                            <img
                              src={ss.src}
                              alt={ss.label}
                              className="w-full h-full object-cover object-top"
                            />
                            {/* Active overlay */}
                            {activeIdx === idx && (
                              <div className="absolute inset-0 bg-purple-500/10" />
                            )}
                            {/* Inactive dim */}
                            {activeIdx !== idx && (
                              <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-300" />
                            )}
                          </div>
                          {/* Label */}
                          <div className="bg-[#0d1224] px-1.5 py-1 text-center">
                            <span className={`text-[8px] font-bold uppercase tracking-wider truncate block transition-colors
                              ${activeIdx === idx ? 'text-purple-400' : 'text-slate-600'}`}>
                              {ss.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Glow bloom */}
                    <div className="relative h-0">
                      <div className="absolute -top-4 left-[10%] w-[50%] h-12 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
                    </div>
                  </div>

                  {/* ── Tech Stack ─────────────────────── */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-500">Tech Stack</span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <div className="grid grid-cols-6 gap-3">
                      {currentExp.techStack.map((t, i) => (
                        <motion.div
                          key={t.name}
                          whileHover={{ y: -4, scale: 1.05 }}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/6 cursor-default hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300"
                        >
                          <span className="text-xl leading-none">{t.icon}</span>
                          <span className="text-[9px] font-bold text-slate-500 text-center leading-tight">{t.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer Stats Row ──────────────────────── */}
            <div className="border-t border-white/[0.06] bg-white/[0.01] px-8 md:px-12 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {footerCards.map(({ icon: Icon, title, color, border, desc }, i) => (
                  <motion.div
                    key={title}
                    className={`flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br ${color} border ${border}`}
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${color} border ${border} flex items-center justify-center`}>
                      <Icon size={16} className="text-white/80" />
                    </div>
                    <div>
                      <p className={`text-[9px] font-black tracking-[0.3em] mb-1.5 ${
                        title === 'IMPACT' ? 'text-purple-400' :
                        title === 'FOCUS'  ? 'text-blue-400' : 'text-cyan-400'
                      }`}>{title}</p>
                      <p className="text-slate-300 text-xs leading-snug">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Experience;
