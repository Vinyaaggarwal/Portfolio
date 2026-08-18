import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Trophy, Award, Briefcase, CheckCircle2, Star,
  ExternalLink, ShieldCheck, Brain, X, Eye, Sparkles
} from 'lucide-react';

const certifications = [
  {
    id: 'amazon-ml',
    title: 'Amazon ML Summer School 2026',
    issuer: 'Amazon',
    category: 'Machine Learning Program',
    date: 'Jul 2026',
    badge: 'Top 2.2% Selectee',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    accentColor: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    description:
      'Shortlisted among top 3,000 participants from 134,421+ registrations nationwide for Amazon’s competitive Machine Learning program covering Deep Learning, NLP, and Computer Vision.',
    details: [
      'Selected in top 2.2% of 134,421+ applicants across India.',
      'In-depth modules on Supervised & Unsupervised Learning, Neural Networks, and Deep Learning.',
      'Advanced hands-on sessions in Natural Language Processing (NLP) & Computer Vision.',
      'Mentorship from Amazon Senior Principal Machine Learning Scientists.'
    ],
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'PyTorch'],
    icon: Trophy,
    verifyLink: 'https://aws.amazon.com/machine-learning/',
    credentialId: 'AMZ-MLSS-2026-SELECTEE'
  },
  {
    id: 'oracle-genai',
    title: 'OCI 2025 Certified Generative AI Professional',
    issuer: 'Oracle Cloud Infrastructure',
    category: 'Generative AI & Cloud',
    date: 'Oct 2025',
    badge: 'Professional Certified',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    accentColor: '#f43f5e',
    gradient: 'from-rose-500 to-red-600',
    description:
      'Official Professional Certification credential validating mastery in Generative AI architectures, LLM fine-tuning, RAG pipelines, prompt engineering, and OCI AI services.',
    details: [
      'Validated expertise in Large Language Models (LLMs) & Transformer Architectures.',
      'Designed & implemented Retrieval-Augmented Generation (RAG) pipelines.',
      'Fine-tuning techniques, vector databases, and prompt engineering strategies.',
      'Hands-on deployment using Oracle Cloud Infrastructure (OCI) AI services.'
    ],
    skills: ['Generative AI', 'LLMs', 'RAG Pipelines', 'OCI AI Services', 'Prompt Engineering'],
    icon: Award,
    verifyLink: 'https://mylearn.oracle.com/ou/learning-path/become-a-certified-oci-generative-ai-professional-2025/140723',
    credentialId: 'OCI-GENAI-PRO-2025'
  },
  {
    id: 'infosys-internship',
    title: 'Infosys Springboard Virtual Internship 6.0',
    issuer: 'Infosys Springboard',
    category: 'Full Stack Development',
    date: 'Nov 2025 – Jan 2026',
    badge: 'National Selectee',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    accentColor: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    description:
      'Selected for competitive national-level program. Developed scalable volunteer-NGO MERN platform with role-based JWT authentication, real-time WebSockets, and backend unit testing.',
    details: [
      'Engineered MERN stack platform for volunteer-NGO coordination.',
      'Implemented role-based JWT authentication supporting 3+ user types.',
      'Integrated real-time WebSockets communication for active opportunity tracking.',
      'Wrote automated backend unit tests ensuring reliability and high test coverage.'
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'JWT'],
    icon: Briefcase,
    verifyLink: 'https://infyspringboard.onwingspan.com/',
    credentialId: 'INFOSYS-SPRINGBOARD-6.0'
  },
  {
    id: 'nptel-cloud',
    title: 'NPTEL Cloud Computing (Elite, 92%)',
    issuer: 'IIT Kharagpur (SWAYAM)',
    category: 'Cloud Infrastructure & Distributed Systems',
    date: 'Jan – Apr 2026',
    badge: 'Elite Badge · 92% Top Score',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-600',
    description:
      'Earned Elite distinction with a 92% final score in Cloud Computing by IIT Kharagpur, covering virtualization, cloud storage, MapReduce, and distributed systems architecture.',
    details: [
      'Scored 92% overall with Elite Distinction badge by IIT Kharagpur.',
      'Comprehensive study of Cloud Architecture, Virtualization (Hypervisors, KVM, Xen).',
      'Distributed Data Processing using MapReduce & Hadoop ecosystem.',
      'Resource management, cloud security, and SLA management frameworks.'
    ],
    skills: ['Cloud Computing', 'Distributed Systems', 'Virtualization', 'AWS', 'MapReduce'],
    icon: CheckCircle2,
    verifyLink: 'https://nptel.ac.in/noc',
    credentialId: 'NPTEL26CS12-ELITE-92'
  },
  {
    id: 'codec-ai-internship',
    title: 'Artificial Intelligence Intern',
    issuer: 'Codec Technologies Pvt. Ltd.',
    category: 'AICTE & ICAC Approved Internship',
    date: 'Jun 2026 – Jul 2026',
    badge: 'AICTE Approved · Google Partner',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    accentColor: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    description:
      'Completed a 2-Month AICTE & ICAC approved internship in Artificial Intelligence conducted by Codec Technologies (Google for Education Partner). Developed AI models, computer vision pipelines, and deep learning workflows.',
    details: [
      '2-Month AICTE & ICAC Approved AI Internship Program.',
      'Organized by Codec Technologies (Google for Education Partner).',
      'Developed deep learning models & computer vision pipelines for real-time video analysis.',
      'AICTE Registration ID: CORPORATE6759d549ce59e1733940553.'
    ],
    skills: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'AICTE Approved', 'Google Partner'],
    icon: Brain,
    verifyLink: 'https://internship.aicte-india.org/',
    credentialId: 'CORPORATE6759d549ce59e1733940553'
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="relative py-28 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase mb-3 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5"
          >
            <ShieldCheck size={14} />
            // verified_credentials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Certifications &amp; Honors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-sm"
          >
            Click any credential card below to explore verification details and program achievements.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedCert(item)}
                className="glass rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/10 shadow-xl relative"
              >
                {/* Top Colored Gradient Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${item.gradient}`} />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-md"
                        style={{ background: `${item.accentColor}18`, color: item.accentColor }}
                      >
                        <Icon size={22} />
                      </div>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Category & Issuer */}
                    <div className="flex items-center gap-2 mb-1.5 text-slate-400 text-xs font-mono">
                      <span>{item.issuer}</span>
                      <span>·</span>
                      <span className="text-slate-500">{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-200 transition-colors leading-snug flex items-center justify-between">
                      <span>{item.title}</span>
                      <Eye size={16} className="opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity shrink-0 ml-2" />
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-xs leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech / Skill Tags */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-white/5 border border-white/10 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Click hint bar */}
                <div className="bg-white/[0.02] border-t border-white/5 px-6 py-2 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-amber-300 group-hover:bg-amber-500/5 transition-all">
                  <span className="font-mono">ID: {item.credentialId || 'VERIFIED'}</span>
                  <span className="font-medium flex items-center gap-1">View Details <ExternalLink size={10} /></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Certificate Detail Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl glass rounded-3xl border border-white/15 shadow-2xl overflow-hidden text-white p-6 sm:p-8"
              style={{ borderColor: `${selectedCert.accentColor}50` }}
            >
              {/* Modal Top Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedCert.gradient}`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-xl glass border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shrink-0"
                  style={{ background: `${selectedCert.accentColor}20`, color: selectedCert.accentColor }}
                >
                  {React.createElement(selectedCert.icon, { size: 28 })}
                </div>
                <div>
                  <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border mb-1 ${selectedCert.badgeColor}`}>
                    {selectedCert.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>
              </div>

              {/* Credential ID Banner */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 mb-6 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Credential ID / Reference:</span>
                <span className="text-amber-300 font-bold">{selectedCert.credentialId}</span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedCert.description}
              </p>

              {/* Key Details / Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-400" />
                  Key Highlights &amp; Accomplishments
                </h4>
                <ul className="space-y-2.5">
                  {selectedCert.details?.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech / Skills */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                  Technologies &amp; Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 rounded-lg font-medium border"
                      style={{
                        background: `${selectedCert.accentColor}15`,
                        color: selectedCert.accentColor,
                        borderColor: `${selectedCert.accentColor}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white glass border border-white/10 hover:border-white/20 transition-all"
                >
                  Close
                </button>
                {selectedCert.verifyLink && (
                  <a
                    href={selectedCert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${selectedCert.gradient} flex items-center gap-2 shadow-lg hover:scale-105 transition-all`}
                  >
                    <ExternalLink size={14} /> Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
