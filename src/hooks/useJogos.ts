import { useEffect, useState, useCallback } from 'react';
import { makeApiCall } from '../api/apiService';
import { Jogo, Filtros } from '../types/tipos';
import { jogosMockados, lojasMockadas } from '../api/mockData';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useJogos = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lojas, setLojas] = useState<Record<string, string>>({});

  const carregarDadosMockados = useCallback(() => {
    setJogos(jogosMockados);
    setLojas(lojasMockadas);
    setError('Usando dados locais devido a limitações da API');
    setLoading(false);
  }, []);

  const processarDados = useCallback((deals: any[], stores: any[]) => {
    const storesMap = stores.reduce((acc: Record<string, string>, store: any) => {
      if (store?.storeID) acc[store.storeID] = store.storeName;
      return acc;
    }, {});

    const jogosFormatados = deals.map((deal: any) => ({
      id: deal.gameID || '',
      titulo: deal.title || 'Título não disponível',
      precoAtual: deal.salePrice ? parseFloat(deal.salePrice) : 0,
      precoOriginal: deal.normalPrice ? parseFloat(deal.normalPrice) : 0,
      desconto: deal.savings ? parseFloat(deal.savings) : 0,
      loja: deal.storeID || '0',
      avaliacao: deal.dealRating ? parseFloat(deal.dealRating) : 0,
      capa: deal.thumb ? deal.thumb.replace('http://', 'https://') : '',
      metacritic: deal.metacriticScore || '0',
      plataformas: []
    }));

    return { storesMap, jogosFormatados };
  }, []);

  const carregarJogos = useCallback(async (params: Filtros = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Construir parâmetros para a API
      const apiParams = {
        pageSize: 20,
        onSale: 1,
        ...(params.titulo && { title: params.titulo }),
        ...(params.loja && { storeID: params.loja }),
        ...(params.precoMin !== undefined && { lowerPrice: params.precoMin }),
        ...(params.precoMax !== undefined && { upperPrice: params.precoMax }),
        ...(params.ordenarPor && { 
          sortBy: params.ordenarPor === 'preco' ? 'Price' : 
                 params.ordenarPor === 'desconto' ? 'Savings' : 
                 'DealRating' 
        })
      };

      // Verificação de cache
      const cacheKey = `cheapshark_${JSON.stringify(apiParams)}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setJogos(data.jogos);
          setLojas(data.lojas);
          setLoading(false);
          return;
        }
      }

      // Chamadas à API
      const [deals, stores] = await Promise.all([
        makeApiCall<any[]>('deals', apiParams),
        makeApiCall<any[]>('stores')
      ]);

      const { storesMap, jogosFormatados } = processarDados(deals, stores);

      // Atualiza cache
      localStorage.setItem(cacheKey, JSON.stringify({
        data: { jogos: jogosFormatados, lojas: storesMap },
        timestamp: Date.now()
      }));

      setLojas(storesMap);
      setJogos(jogosFormatados);
    } catch (err) {
      console.error('Erro na API:', err);
      carregarDadosMockados();
    } finally {
      setLoading(false);
    }
  }, [carregarDadosMockados, processarDados]);

  useEffect(() => {
    carregarJogos({});
  }, [carregarJogos]);

  return { jogos, loading, error, lojas, carregarJogos };
};