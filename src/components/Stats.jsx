import { motion } from 'framer-motion';

export function Stats({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full card-premium p-4"
    >
      <div className="flex justify-around items-center text-center">
        <div>
          <p className="text-2xl font-bold text-[#F2F2F2]">
            {stats.total.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-[#777] mt-1">Total</p>
        </div>

        <div className="w-px h-10 bg-[#333]" />

        <div>
          <p className="text-2xl font-bold text-green-400">
            {stats.valid.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-[#777] mt-1">Válidos</p>
        </div>

        <div className="w-px h-10 bg-[#333]" />

        <div>
          <p className="text-2xl font-bold text-red-400">
            {stats.invalid.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-[#777] mt-1">Inválidos</p>
        </div>
      </div>
    </motion.div>
  );
}
