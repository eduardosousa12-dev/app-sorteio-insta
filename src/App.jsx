import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LoadingScreen } from './components/LoadingScreen';
import { Stats } from './components/Stats';
import { DrawButton } from './components/DrawButton';
import { WinnerCard } from './components/WinnerCard';
import { DrawingAnimation } from './components/DrawingAnimation';
import { ErrorState } from './components/ErrorState';
import { useLottery, LOTTERY_STATES } from './hooks/useLottery';

function App() {
  const {
    state,
    stats,
    validParticipants,
    winner,
    error,
    loadComments,
    performDraw,
    redraw,
    reset,
    retry,
    remainingParticipants
  } = useLottery();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center">
      {/* Loading Screen */}
      <AnimatePresence>
        {state === LOTTERY_STATES.LOADING && (
          <LoadingScreen
            message="Buscando comentários..."
            subMessage="Aguarde enquanto carregamos todos os participantes"
          />
        )}
      </AnimatePresence>

      {/* Animação do Sorteio */}
      <AnimatePresence>
        {state === LOTTERY_STATES.DRAWING && (
          <DrawingAnimation
            participants={validParticipants}
            isDrawing={true}
          />
        )}
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="w-full max-w-sm mx-auto px-5 py-8 flex flex-col items-center min-h-[100dvh]">

        {/* Header */}
        <Header />

        {/* Espaço 20px */}
        <div className="h-5" />

        {/* Card de Regras */}
        <div className="w-full card-premium p-4 text-center">
          <p className="text-xs font-semibold tracking-wide text-gold mb-2">
            📢 REGRA DO SORTEIO
          </p>
          <p className="text-sm text-[#F2F2F2]">
            Comente marcando <span className="font-bold text-gold-light">3 amigas</span> para participar e ser válido caso seja sorteada.
          </p>
        </div>

        {/* Linha separadora */}
        <div className="divider-gold w-full my-6" />

        {/* Conteúdo dinâmico */}
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-5">

          {/* Estado Inicial */}
          {state === LOTTERY_STATES.IDLE && (
            <DrawButton
              onClick={loadComments}
              label="INICIAR SORTEIO"
            />
          )}

          {/* Estado Pronto */}
          {state === LOTTERY_STATES.READY && (
            <>
              <Stats stats={stats} />
              <DrawButton
                onClick={performDraw}
                label="SORTEAR AGORA"
              />
              <button
                onClick={reset}
                className="text-sm text-[#777] hover:text-[#aaa] transition-colors"
              >
                ← Buscar novamente
              </button>
            </>
          )}

          {/* Resultado */}
          {state === LOTTERY_STATES.RESULT && winner && (
            <>
              <Stats stats={stats} />
              <WinnerCard
                winner={winner}
                onRedraw={redraw}
                remainingParticipants={remainingParticipants}
              />
            </>
          )}

          {/* Erro */}
          {state === LOTTERY_STATES.ERROR && (
            <ErrorState
              message={error}
              onRetry={retry}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-[#555]">LL MODAS © 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
