import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DrawingAnimation({ participants, isDrawing }) {
  const [currentName, setCurrentName] = useState('');

  useEffect(() => {
    if (!isDrawing || !participants.length) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentName(participants[randomIndex]?.username || '???');
    }, 80);

    return () => clearInterval(interval);
  }, [isDrawing, participants]);

  if (!isDrawing) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0F0F0F]/95 flex flex-col items-center justify-center z-50 px-6"
    >
      <motion.h2
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-xl font-bold mb-6 text-gold"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
         SORTEANDO...
      </motion.h2>

      <motion.div
        animate={{ boxShadow: ['0 0 20px rgba(200,155,60,0.3)', '0 0 40px rgba(200,155,60,0.5)', '0 0 20px rgba(200,155,60,0.3)'] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        className="card-premium rounded-2xl p-6 w-full max-w-xs text-center"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={currentName}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.08 }}
            className="text-2xl font-bold text-gold-light break-all"
          >
            @{currentName}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 rounded-full bg-gold"
          />
        ))}
      </div>
    </motion.div>
  );
}
