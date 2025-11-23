import { motion } from 'framer-motion';

export function DrawButton({ onClick, disabled, isDrawing, label = 'SORTEAR' }) {
  return (
    <motion.button
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 0 } : {}}
      onClick={onClick}
      disabled={disabled || isDrawing}
      className="btn-premium pulse-btn w-full py-4 text-base disabled:opacity-60"
    >
      {isDrawing ? (
        <span className="flex items-center justify-center gap-3">
          <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          SORTEANDO...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          🎲 {label}
        </span>
      )}
    </motion.button>
  );
}
