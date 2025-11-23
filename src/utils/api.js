import axios from 'axios';

// Em desenvolvimento usa proxy para evitar CORS, em produção usa URL direta
const WEBHOOK_PATH = '/api/webhook/7a96446f-6ea0-42af-8dad-8649f83f5a79';
const WEBHOOK_URL_PROD = 'https://webhook-agencia.lucasfelix.com/webhook/7a96446f-6ea0-42af-8dad-8649f83f5a79';

// Detecta se está em produção ou desenvolvimento
const getWebhookUrl = () => {
  if (import.meta.env.PROD) {
    return WEBHOOK_URL_PROD;
  }
  return WEBHOOK_PATH;
};

export async function fetchComments() {
  try {
    const response = await axios.post(getWebhookUrl(), {}, {
      timeout: 30000, // 30 segundos timeout
    });

    // Garante que retornamos um array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // Se vier objeto com array dentro
    if (response.data && Array.isArray(response.data.comments)) {
      return response.data.comments;
    }

    // Se vier objeto com data
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    console.warn('Formato de resposta inesperado:', response.data);
    return [];
  } catch (error) {
    console.error('Erro na requisição:', error);

    if (error.code === 'ECONNABORTED') {
      throw new Error('A busca está demorando muito. Tente novamente.');
    }
    if (error.response) {
      throw new Error(`Erro do servidor: ${error.response.status}`);
    }
    if (error.request) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua internet.');
    }
    throw new Error('Erro ao buscar comentários. Tente novamente.');
  }
}
