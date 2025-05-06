import axios from 'axios';

const API_URL = 'https://www.cheapshark.com/api/1.0';

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
}

export interface Store {
  storeID: string;
  storeName: string;
}

export const fetchDeals = async (params: Record<string, any> = {}) => {
  try {
    const response = await axios.get(`${API_URL}/deals`, { 
      params: {
        ...params,
        onSale: 1,
        pageSize: 20
      } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const fetchStores = async () => {
  try {
    const response = await axios.get(`${API_URL}/stores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};