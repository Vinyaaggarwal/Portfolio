import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Send, CheckCircle, Loader } from 'lucide-react';
import GithubIcon from './GithubIcon';
import MagneticButton from './MagneticButton';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const socialLinks = [
  {
    id: 'email-link',
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'vinyaaggarwal@gmail.com',
    href: 'mailto:vinyaaggarwal@gmail.com',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    id: 'github-link',
    icon: <GithubIcon size={20} />,
    label: 'GitHub',
    value: 'github.com/vinyaaggarwal',
    href: 'https://github.com/vinyaaggarwal',
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 'linkedin-link',
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vinyaaggarwal',
    href: 'https://linkedin.com/in/vinyaaggarwal',
    gradient: 'from-blue-600 to-blue-800',
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500)); // Simulate network
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-mono text-purple-400 tracking-widest uppercase mb-3 border border-purple-500/30 px-3 py-1 rounded-full"
            >
              // open_channel
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4">
              Transmission
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-xl mx-auto">
              Whether you have a project, an opportunity, or just want to connect — I'm always receiving signals.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Left: Social links */}
            <motion.div variants={fadeUp} className="md:col-span-2 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-2">Connect</h3>

              {socialLinks.map(link => (
                <motion.a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/8 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${link.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">{link.label}</div>
                    <div className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{link.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Status indicator */}
              <div className="glass rounded-xl p-4 border border-emerald-500/20 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">Open to opportunities</span>
                </div>
                <p className="text-slate-500 text-xs mt-1 ml-4.5">
                  Internships · Full-time · Freelance
                </p>
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div variants={fadeUp} className="md:col-span-3">
              <div className="glass rounded-2xl p-7 border border-white/8 neon-border">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Transmission Received!</h3>
                    <p className="text-slate-400 max-w-xs">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }); }}
                      className="mt-2 text-purple-400 hover:text-white text-sm transition-colors underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                      />
                    </div>
                    <MagneticButton radius={60} strength={0.25} className="w-full rounded-xl">
                      <motion.button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {loading ? (
                          <><Loader size={18} className="animate-spin" /> Transmitting...</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </motion.button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-20 text-center border-t border-white/5 pt-8"
      >
        <p className="text-slate-600 text-sm font-mono">
          Crafted with <span className="text-purple-500">♥</span> by{' '}
          <span className="gradient-text font-semibold">Vinya Aggarwal</span>
          {' '}· {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
