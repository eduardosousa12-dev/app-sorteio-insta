import { useState, useCallback } from 'react';
import { fetchComments } from '../utils/api';
import { filterValidComments, drawWinner } from '../utils/validation';

// Estados possíveis do sorteio
export const LOTTERY_STATES = {
  IDLE: 'idle',           // Inicial - botão "Iniciar Sorteio"
  LOADING: 'loading',     // Buscando comentários do webhook
  READY: 'ready',         // Comentários carregados, pronto para sortear
  DRAWING: 'drawing',     // Animação do sorteio
  RESULT: 'result',       // Vencedor exibido
  ERROR: 'error'          // Erro ocorreu
};

export function useLottery() {
  const [state, setState] = useState(LOTTERY_STATES.IDLE);
  const [comments, setComments] = useState([]);
  const [validParticipants, setValidParticipants] = useState([]);
  const [stats, setStats] = useState({ total: 0, valid: 0, invalid: 0 });
  const [winner, setWinner] = useState(null);
  const [previousWinners, setPreviousWinners] = useState([]);
  const [error, setError] = useState(null);

  // Buscar comentários do webhook
  const loadComments = useCallback(async () => {
    setState(LOTTERY_STATES.LOADING);
    setError(null);

    try {
      const data = await fetchComments();
      setComments(data);

      const { validComments, stats: newStats } = filterValidComments(data);
      setValidParticipants(validComments);
      setStats(newStats);

      if (validComments.length === 0) {
        setError('Nenhum participante válido encontrado. Regra: marcar 3 amigas.');
        setState(LOTTERY_STATES.ERROR);
        return;
      }

      setState(LOTTERY_STATES.READY);
    } catch (err) {
      setError(err.message || 'Erro ao buscar comentários.');
      setState(LOTTERY_STATES.ERROR);
    }
  }, []);

  // Realizar o sorteio
  const performDraw = useCallback(() => {
    if (validParticipants.length === 0) return;

    setState(LOTTERY_STATES.DRAWING);

    // Simula animação de 2.5 segundos antes de mostrar resultado
    setTimeout(() => {
      // Filtra participantes que já ganharam
      const availableParticipants = validParticipants.filter(
        p => !previousWinners.some(w => w.id === p.id)
      );

      if (availableParticipants.length === 0) {
        setError('Todos os participantes válidos já foram sorteados!');
        setState(LOTTERY_STATES.ERROR);
        return;
      }

      const selectedWinner = drawWinner(availableParticipants);
      setWinner(selectedWinner);
      setState(LOTTERY_STATES.RESULT);
    }, 2500);
  }, [validParticipants, previousWinners]);

  // Refazer sorteio (remove vencedor atual da lista)
  const redraw = useCallback(() => {
    if (winner) {
      setPreviousWinners(prev => [...prev, winner]);
    }

    // Verifica se ainda há participantes disponíveis
    const remainingCount = validParticipants.length - previousWinners.length - (winner ? 1 : 0);

    if (remainingCount <= 0) {
      setError('Todos os participantes válidos já foram sorteados!');
      setState(LOTTERY_STATES.ERROR);
      return;
    }

    setWinner(null);
    performDraw();
  }, [winner, validParticipants, previousWinners, performDraw]);

  // Resetar tudo
  const reset = useCallback(() => {
    setState(LOTTERY_STATES.IDLE);
    setComments([]);
    setValidParticipants([]);
    setStats({ total: 0, valid: 0, invalid: 0 });
    setWinner(null);
    setPreviousWinners([]);
    setError(null);
  }, []);

  // Tentar novamente após erro
  const retry = useCallback(() => {
    setError(null);
    loadComments();
  }, [loadComments]);

  return {
    state,
    comments,
    validParticipants,
    stats,
    winner,
    previousWinners,
    error,
    loadComments,
    performDraw,
    redraw,
    reset,
    retry,
    remainingParticipants: validParticipants.length - previousWinners.length - (winner ? 1 : 0)
  };
}
