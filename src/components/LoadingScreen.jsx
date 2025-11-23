import { motion } from 'framer-motion';

export function LoadingScreen({ message = 'Carregando...', subMessage = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0F0F0F] flex flex-col items-center justify-center z-50 px-6"
    >
      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black mb-6 shadow-lg">
        <img src="/logo.png" alt="LL Modas" className="w-full h-full object-cover" />
      </div>

      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-12 h-12 spinner" />
      </div>

      {/* Mensagem */}
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-semibold text-gold text-center"
      >
        {message}
      </motion.p>

      {subMessage && (
        <p className="text-sm text-[#777] mt-2 text-center max-w-xs">
          {subMessage}
        </p>
      )}

      {/* Barra de progresso */}
      <div className="w-48 h-1 bg-[#222] rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #C89B3C, #E6C87C)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
