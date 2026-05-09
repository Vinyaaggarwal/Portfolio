import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, ChevronRight } from 'lucide-react';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Vinya-OS v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', content: 'Available commands: about, skills, projects, clear, exit, whoami' });
          break;
        case 'about':
          newHistory.push({ type: 'output', content: 'Vinya Aggarwal: B.Tech CSE Student, Full Stack Developer, AI/ML enthusiast.' });
          break;
        case 'skills':
          newHistory.push({ type: 'output', content: 'Technical Stack: React, Node.js, Python, TensorFlow, C++, MongoDB...' });
          break;
        case 'projects':
          newHistory.push({ type: 'output', content: 'Active Projects: Expense Tracker, TripMate, PERRY (AI Mental Health), InternX.' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          break;
        case 'whoami':
          newHistory.push({ type: 'output', content: 'guest@vinya-portfolio:~$ A curious explorer of the digital universe.' });
          break;
        case '':
          break;
        default:
          newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for options.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 z-50 hover:shadow-purple-500/40 transition-shadow"
      >
        <TerminalIcon size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[100] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass rounded-xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto flex flex-col h-[500px]"
            >
              {/* Header */}
              <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className="text-purple-400" />
                  <span className="text-xs font-mono text-slate-300">vinya-os -- terminal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                  <button onClick={() => setIsOpen(false)} className="ml-2 hover:bg-white/10 p-1 rounded transition-colors">
                    <X size={14} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((line, i) => (
                  <div key={i} className="mb-1">
                    {line.type === 'input' ? (
                      <div className="flex gap-2 text-purple-400">
                        <span>guest@portfolio:~$</span>
                        <span className="text-white">{line.content}</span>
                      </div>
                    ) : (
                      <div className="text-slate-300">{line.content}</div>
                    )}
                  </div>
                ))}
                <div className="flex gap-2 text-purple-400 mt-1">
                  <span>guest@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent border-none outline-none text-white caret-purple-500"
                    autoFocus
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="bg-black/20 px-4 py-1.5 flex items-center justify-between border-t border-white/5 text-[10px] text-slate-500 font-mono">
                <span>Vinya Aggarwal Portfolio OS</span>
                <span>UTF-8</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
