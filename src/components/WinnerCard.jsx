import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export function WinnerCard({ winner, onRedraw, remainingParticipants }) {
  useEffect(() => {
    if (winner) {
      const colors = ['#C89B3C', '#E6C87C', '#FFD700'];

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors
      });

      setTimeout(() => {
        confetti({ particleCount: 40, angle: 60, spread: 50, origin: { x: 0 }, colors });
        confetti({ particleCount: 40, angle: 120, spread: 50, origin: { x: 1 }, colors });
      }, 200);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full card-premium p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🏆</span>
        <h2 className="text-lg font-bold text-gold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          VENCEDOR(A)
        </h2>
      </div>

      {/* Username */}
      <div className="bg-[#0F0F0F] rounded-xl py-3 px-4 mb-4">
        <p className="text-xl font-bold text-gold-light break-all">
          @{winner.username}
        </p>
      </div>

      {/* Comentário */}
      <div className="mb-5">
        <p className="text-xs text-[#666] mb-1">Comentário:</p>
        <p className="text-sm text-[#aaa] italic break-words">
          "{winner.text}"
        </p>
      </div>

      {/* Botão Refazer */}
      <button
        onClick={onRedraw}
        disabled={remainingParticipants <= 0}
        className="w-full py-3 rounded-full text-sm font-semibold transition-all border border-[#C89B3C] text-gold hover:bg-[#C89B3C] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🔄 Refazer Sorteio
        {remainingParticipants > 0 && (
          <span className="text-xs text-[#777] ml-2">
            ({remainingParticipants} restantes)
          </span>
        )}
      </button>
    </motion.div>
  );
}
