export function Header() {
  return (
    <header className="flex flex-col items-center text-center">
      {/* Logo */}
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black mb-4 shadow-lg">
        <img
          src="/logo.png"
          alt="LL Modas"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título */}
      <h1
        className="text-[32px] font-bold tracking-wide"
        style={{ fontFamily: "'Poppins', sans-serif", color: '#F2F2F2' }}
      >
        LL MODAS
      </h1>

      {/* Subtítulo */}
      <p className="text-lg mt-1 text-gold">
        Sorteio da Live 🎁
      </p>
    </header>
  );
}
