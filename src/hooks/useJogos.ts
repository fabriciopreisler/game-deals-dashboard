import { useEffect, useState } from 'react';
import axios from 'axios';
import { Jogo } from '../types/tipos';

const API_URL = 'https://www.cheapshark.com/api/1.0';

export const useJogos = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lojas, setLojas] = useState<Record<string, string>>({});

  const carregarJogos = async (params: Record<string, any> = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Busca ofertas e lojas simultaneamente
      const [dealsResponse, storesResponse] = await Promise.all([
        axios.get(`${API_URL}/deals`, { params }),
        axios.get(`${API_URL}/stores`)
      ]);

      // Processa as lojas
      const storesMap = storesResponse.data.reduce((acc: Record<string, string>, store: any) => {
        acc[store.storeID] = store.storeName;
        return acc;
      }, {});

      // Processa os jogos
      const jogosFormatados = dealsResponse.data.map((deal: any) => ({
        id: deal.gameID,
        titulo: deal.title,
        precoAtual: parseFloat(deal.salePrice),
        precoOriginal: parseFloat(deal.normalPrice),
        desconto: parseFloat(deal.savings),
        loja: deal.storeID,
        avaliacao: parseFloat(deal.dealRating || '0'),
        capa: deal.thumb.replace('http://', 'https://'),
        metacritic: deal.metacriticScore,
        dealRating: deal.dealRating,
        plataformas: [] 
      }));

      setLojas(storesMap);
      setJogos(jogosFormatados);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Não foi possível carregar os jogos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarJogos({
      pageSize: 20, 
      onSale: 1    
    });
  }, []);

  return { jogos, loading, error, lojas, carregarJogos };
};