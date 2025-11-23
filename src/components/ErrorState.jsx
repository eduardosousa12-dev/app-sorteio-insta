import { motion } from 'framer-motion';

export function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full card-premium p-5 text-center border-red-500/30"
    >
      <span className="text-4xl mb-4 block">⚠️</span>

      <h2 className="text-lg font-bold text-red-400 mb-2">
        Ops! Algo deu errado
      </h2>

      <p className="text-sm text-[#888] mb-5">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="btn-premium w-full py-3 text-sm"
      >
        🔄 Tentar Novamente
      </button>
    </motion.div>
  );
}
