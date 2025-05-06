import axios, { AxiosError, AxiosResponse } from 'axios';
import { CHEAPSHARK_LIMITS } from '../config/apiLimits';

const API_URL = 'https://www.cheapshark.com/api/1.0';
let lastCallTime = 0;
let callCount = 0;
let resetTime = Date.now();

export const makeApiCall = async <T,>(endpoint: string, params = {}): Promise<T> => {
  const now = Date.now();
  
  // Verifica rate limits
  if (now > resetTime) {
    callCount = 0;
    resetTime = now + 60000; // Reset a cada 1 minuto
  }

  if (callCount >= CHEAPSHARK_LIMITS.MAX_CALLS_PER_MINUTE) {
    const waitTime = resetTime - now;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  // Delay entre chamadas
  const timeSinceLastCall = now - lastCallTime;
  if (timeSinceLastCall < CHEAPSHARK_LIMITS.DELAY_BETWEEN_CALLS) {
    await new Promise(resolve => 
      setTimeout(resolve, CHEAPSHARK_LIMITS.DELAY_BETWEEN_CALLS - timeSinceLastCall)
    );
  }

  lastCallTime = Date.now();
  callCount++;

  try {
    const response: AxiosResponse<T> = await axios.get(`${API_URL}/${endpoint}`, {
      params,
      timeout: CHEAPSHARK_LIMITS.TIMEOUT
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      const retryAfter = Number(axiosError.response.headers['retry-after']) || 5;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return makeApiCall<T>(endpoint, params);
    }
    throw error;
  }
};