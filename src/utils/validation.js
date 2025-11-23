/**
 * Extrai menções válidas de um texto
 * @param {string} text - Texto do comentário
 * @returns {string[]} - Array de menções únicas
 */
export function extractMentions(text) {
  if (!text || typeof text !== 'string') return [];

  // Regex para capturar @username (letras, números, ponto, underscore)
  const mentionRegex = /@[\w.]+/g;
  const mentions = text.match(mentionRegex) || [];

  // Remove duplicatas e retorna menções únicas
  const uniqueMentions = [...new Set(mentions)];

  return uniqueMentions;
}

/**
 * Verifica se um comentário é válido (tem 3+ menções únicas)
 * @param {string} text - Texto do comentário
 * @returns {boolean}
 */
export function isValidComment(text) {
  const mentions = extractMentions(text);
  return mentions.length >= 3;
}

/**
 * Filtra comentários válidos e retorna estatísticas
 * @param {Array} comments - Array de comentários do webhook
 * @returns {{validComments: Array, stats: {total: number, valid: number, invalid: number}}}
 */
export function filterValidComments(comments) {
  if (!Array.isArray(comments)) {
    return {
      validComments: [],
      stats: { total: 0, valid: 0, invalid: 0 }
    };
  }

  const validComments = comments.filter(comment => {
    if (!comment || !comment.text) return false;
    return isValidComment(comment.text);
  });

  return {
    validComments,
    stats: {
      total: comments.length,
      valid: validComments.length,
      invalid: comments.length - validComments.length
    }
  };
}

/**
 * Sorteia um vencedor usando crypto para melhor aleatoriedade
 * @param {Array} participants - Array de participantes válidos
 * @returns {Object|null} - Participante sorteado ou null
 */
export function drawWinner(participants) {
  if (!Array.isArray(participants) || participants.length === 0) {
    return null;
  }

  // Usar crypto.getRandomValues para melhor aleatoriedade
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomIndex = array[0] % participants.length;

  return participants[randomIndex];
}
