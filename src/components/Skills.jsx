import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Terminal,
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
  Cpu,
  Code2
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const skillCategories = [
  {
    label: 'Languages',
    description: 'Programming foundations for building efficient and reliable solutions.',
    color: 'from-purple-500 to-violet-600',
    border: 'border-purple-500/30',
    glow: 'group-hover:shadow-purple-500/20',
    icon: <Terminal size={18} />,
    skills: ['C++', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'C', 'MATLAB'],
  },
  {
    label: 'Frontend',
    description: 'Creating responsive, interactive, and modern user interfaces.',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    glow: 'group-hover:shadow-blue-500/20',
    icon: <Layout size={18} />,
    skills: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    label: 'Backend',
    description: 'Building APIs, authentication systems, and real-time server features.',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/20',
    icon: <Server size={18} />,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'WebSockets'],
  },
  {
    label: 'Databases',
    description: 'Designing, querying, and managing structured and NoSQL data.',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    glow: 'group-hover:shadow-emerald-500/20',
    icon: <Database size={18} />,
    skills: ['MongoDB', 'MySQL', 'Mongoose', 'SQL'],
  },
  {
    label: 'AI / ML',
    description: 'Working with machine learning, computer vision, and AI-based tools.',
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    glow: 'group-hover:shadow-pink-500/20',
    icon: <Brain size={18} />,
    skills: ['TensorFlow', 'OpenCV', 'Transformers', 'Scikit-learn'],
  },
  {
    label: 'Tools',
    description: 'Development tools for version control, productivity, and debugging.',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    glow: 'group-hover:shadow-amber-500/20',
    icon: <Wrench size={18} />,
    skills: ['Git', 'GitHub', 'Linux', 'VS Code', 'Postman'],
  },
  {
    label: 'Core CS',
    description: 'Strong computer science fundamentals for problem-solving.',
    color: 'from-violet-500 to-purple-700',
    border: 'border-violet-500/30',
    glow: 'group-hover:shadow-violet-500/20',
    icon: <Cpu size={18} />,
    skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Complexity Analysis'],
  },
];

const SkillChip = ({ skill }) => (
  <motion.span
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    }}
    whileHover={{ scale: 1.08 }}
    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-200 cursor-default"
  >
    {skill}
  </motion.span>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-mono text-purple-400 tracking-widest uppercase mb-3 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              // tech_arsenal
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4">
              Skills &amp; Technologies
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-xl mx-auto text-sm md:text-base px-4">
              A curated stack of technologies I use to build modern, scalable applications.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"
            />
          </div>

          {/* Skill grid - Responsive Flex Layout for Balance */}
          <div className="flex flex-wrap justify-center gap-6">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)"
                }}
                className={`group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] glass rounded-2xl p-6 border ${cat.border} hover:border-white/40 transition-all duration-300 flex flex-col`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl -z-10 bg-gradient-to-br ${cat.color} opacity-5`} />

                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-white text-base tracking-tight">{cat.label}</h3>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-5 group-hover:text-slate-300 transition-colors">
                  {cat.description}
                </p>

                {/* Chips */}
                <motion.div
                  variants={stagger}
                  className="mt-auto flex flex-wrap gap-2"
                >
                  {cat.skills.map(s => (
                    <SkillChip key={s} skill={s} />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
