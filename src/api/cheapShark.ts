import axios from 'axios';
import { CHEAPSHARK_LIMITS } from './apiLimits';

const API_URL = 'https://www.cheapshark.com/api/1.0';

let lastCallTime = 0;
let callCount = 0;

const delayBetweenCalls = async () => {
  const now = Date.now();
  if (now - lastCallTime < CHEAPSHARK_LIMITS.DELAY_BETWEEN_CALLS) {
    await new Promise(resolve => 
      setTimeout(resolve, CHEAPSHARK_LIMITS.DELAY_BETWEEN_CALLS - (now - lastCallTime))
    );
  }
  lastCallTime = Date.now();
};

export interface Deal {
  gameID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: string;
  thumb: string;
  dealRating: string;
  storeID: string;
  releaseDate: number;
  dealID: string;
}

export interface Store {
  storeID: string;
  storeName: string;
}

export interface GameInfo {
  info: {
    title: string;
    steamAppID: string;
    thumb: string;
    metacriticScore: string;
    cheapestDealID: string;
    cheapest: number;
  };
  deals: Array<{
    dealID: string;
    storeID: string;
    salePrice: string;
    retailPrice: string;
  }>;
}

export const fetchDeals = async (params: Record<string, any> = {}) => {
  await delayBetweenCalls();
  try {
    const response = await axios.get(`${API_URL}/deals`, { 
      params: {
        ...params,
        onSale: 1,
        pageSize: 60,
        desc: 0
      },
      timeout: CHEAPSHARK_LIMITS.TIMEOUT
    });

    return response.data.map((deal: Deal) => ({
      ...deal,
      title: deal.title?.trim() || '',
      thumb: deal.thumb 
        ? `https://${deal.thumb.replace('http://', '').replace('capsule_sm_120', 'header')}`
        : '',
      gameID: deal.gameID || `id-${Math.random().toString(36).substr(2, 9)}`,
      storeID: deal.storeID || '1'
    }));
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
};

export const fetchStores = async () => {
  await delayBetweenCalls();
  try {
    const response = await axios.get(`${API_URL}/stores`, {
      timeout: CHEAPSHARK_LIMITS.TIMEOUT
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const fetchGameInfo = async (gameId: string) => {
  await delayBetweenCalls();
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: { id: gameId },
      timeout: CHEAPSHARK_LIMITS.TIMEOUT
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching game info:', error);
    throw error;
  }
};

export const fetch50Deals = async () => {
  const allDeals: Deal[] = [];
  let pageNumber = 0;
  
  try {
    while (allDeals.length < 60) {
      await delayBetweenCalls();
      const deals = await fetchDeals({
        pageNumber,
        pageSize: 60
      });

      if (!deals || deals.length === 0) break;

      const validDeals = deals.filter((deal: Deal) => 
        deal.title && 
        !deal.title.toLowerCase().includes('jogo') && 
        !deal.title.toLowerCase().includes('test') &&
        deal.thumb
      );

      allDeals.push(...validDeals);
      pageNumber++;

      if (allDeals.length >= 50) break;
    }

    return allDeals.slice(0, 50);
  } catch (error) {
    console.error('Error fetching 50 deals:', error);
    throw error;
  }
};