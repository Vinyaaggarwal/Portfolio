import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code2, Brain, Target, Trophy } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const SectionTitle = ({ label, title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.span
      variants={fadeUp}
      className="inline-block text-[10px] font-bold text-primary tracking-[0.3em] uppercase mb-4 border border-primary/20 px-4 py-1.5 rounded-full glass"
    >
      {label}
    </motion.span>
    <motion.h2
      variants={fadeUp}
      className="text-4xl md:text-5xl font-black text-text-primary mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p variants={fadeUp} className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
        {subtitle}
      </motion.p>
    )}
  </div>
);

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: <GraduationCap size={22} className="text-primary" />,
      title: 'Education',
      desc: 'B.Tech CSE (2023–2027) · CGPA 8.48 · JIIT Noida',
    },
    {
      icon: <Trophy size={22} className="text-accent" />,
      title: 'Amazon ML School',
      desc: 'Top 2.2% Selectee · Shortlisted out of 134,421+ candidates',
    },
    {
      icon: <Brain size={22} className="text-secondary-accent" />,
      title: 'AI / ML & GenAI',
      desc: 'OCI Certified GenAI Pro · PyTorch · RAG · Computer Vision',
    },
    {
      icon: <Code2 size={22} className="text-primary" />,
      title: 'Full Stack & APIs',
      desc: 'MERN Stack · FastAPI · Scalable Systems · 2 Internships',
    },
  ];

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionTitle
            label="Origin Story"
            title="About Me"
            subtitle="A universe forged from curiosity, code, and caffeine."
          />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div variants={fadeUp} className="space-y-5">
              <div className="glass rounded-2xl p-6 border border-border-subtle">
                <p className="text-text-secondary leading-relaxed text-base">
                  I'm <span className="text-text-primary font-bold">Vinya Aggarwal</span>, a 3rd-year
                  B.Tech Computer Science student (2023–2027) with a{' '}
                  <span className="text-primary font-bold">CGPA of 8.48</span>. My passion
                  lies at the intersection of full-stack engineering, artificial intelligence, and scalable software systems.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border border-border-subtle">
                <p className="text-text-secondary leading-relaxed text-base">
                  Recently shortlisted among the top 3,000 candidates nationwide out of{' '}
                  <span className="text-accent font-bold">134,421+ registrations for Amazon ML Summer School 2026</span>.
                  I am also an <span className="text-primary font-bold">OCI 2025 Certified Generative AI Professional</span> with
                  hands-on internship experience in Artificial Intelligence (Codec Tech) and Full Stack Development (Infosys).
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border border-border-subtle">
                <p className="text-text-secondary leading-relaxed text-base">
                  Whether architecting <span className="text-secondary-accent font-bold">RAG pipelines & LLM agents</span>, crafting
                  high-speed graph algorithms in C++, or training computer vision models — I'm dedicated to building software that drives real impact.
                </p>
              </div>
            </motion.div>

            {/* Right: Highlight cards */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="glass rounded-xl p-5 border border-white/5 hover:border-purple-500/30 transition-all duration-300 cursor-default group"
                >
                  <div className="mb-3 p-2 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                    {h.icon}
                  </div>
                  <h3 className="font-bold text-text-primary text-sm mb-1">{h.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fun line */}
          <motion.div
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 glass px-8 py-3 rounded-full border border-border-subtle shadow-premium">
              <span className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">Mission Focus:</span>
              <span className="text-text-primary font-bold">Building things that matter</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
