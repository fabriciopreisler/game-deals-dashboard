export const CHEAPSHARK_LIMITS = {
    MAX_CALLS_PER_MINUTE: 30,
    DELAY_BETWEEN_CALLS: 1500, // 1.5 segundos entre chamadas
    RETRY_DELAYS: [1000, 3000, 5000], // Tempos de retry progressivos
    TIMEOUT: 10000 // 10 segundos
  };