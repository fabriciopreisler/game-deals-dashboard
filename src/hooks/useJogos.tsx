import { useEffect, useState, useCallback } from 'react';
import { fetch50Deals, fetchStores, Deal, Store } from '../api/cheapShark';
import { Jogo, Filtros } from '../types/tipos';
import { jogosMockados, lojasMockadas } from '../api/mockData';

const API_DELAY = 1500;
let lastCallTime = 0;

export const useJogos = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogosFiltrados, setJogosFiltrados] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lojas, setLojas] = useState<Record<string, string>>({});
  const [filtros, setFiltros] = useState<Filtros>({ ordenarPor: 'avaliacao' });
  const [detalhesJogo, setDetalhesJogo] = useState<Jogo | null>(null);

  const carregarComDelay = useCallback(async () => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    
    if (timeSinceLastCall < API_DELAY) {
      await new Promise(resolve => setTimeout(resolve, API_DELAY - timeSinceLastCall));
    }
    
    lastCallTime = Date.now();
  }, []);

  const processarDados = useCallback((deals: Deal[], stores: Store[] | Record<string, string>) => {
    const storesArray = Array.isArray(stores) 
      ? stores 
      : Object.entries(stores).map(([storeID, storeName]) => ({ storeID, storeName }));
    
    const storesMap = storesArray.reduce((acc: Record<string, string>, store) => {
      if (store?.storeID && store?.storeName) {
        acc[store.storeID] = store.storeName;
      }
      return acc;
    }, {});

    const jogosFormatados = deals
      .filter((deal: Deal) => deal.title && !deal.title.toLowerCase().includes('jogo'))
      .map((deal: Deal) => ({
        id: deal.dealID || deal.gameID,
        titulo: deal.title,
        precoAtual: parseFloat(deal.salePrice) || 0,
        precoOriginal: parseFloat(deal.normalPrice) || 0,
        desconto: parseFloat(deal.savings) || 0,
        loja: deal.storeID,
        lojaNome: storesMap[deal.storeID] || 'Loja desconhecida',
        avaliacao: parseFloat(deal.dealRating) || 3.5,
        capa: deal.thumb || 'https://via.placeholder.com/300x150?text=Sem+imagem',
        metacriticScore: deal.metacriticScore || '0',
        plataformas: ['PC'],
        linkDeal: deal.dealID 
          ? `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
          : '#',
        releaseDate: deal.releaseDate 
          ? new Date(deal.releaseDate * 1000).toISOString() 
          : undefined
      }));

    return { storesMap, jogosFormatados };
  }, []);

  const aplicarFiltros = useCallback((jogosParaFiltrar: Jogo[]) => {
    return jogosParaFiltrar.filter(jogo => {
      const passaFiltroLoja = !filtros.loja || jogo.loja === filtros.loja;
      const passaFiltroTitulo = !filtros.titulo || 
        jogo.titulo.toLowerCase().includes(filtros.titulo.toLowerCase());
      const passaFiltroPreco = (!filtros.precoMin || jogo.precoAtual >= filtros.precoMin) && 
        (!filtros.precoMax || jogo.precoAtual <= filtros.precoMax);
      const passaFiltroDesconto = !filtros.descontoMin || 
        (jogo.desconto >= filtros.descontoMin);
      const passaFiltroPlataforma = !filtros.plataforma || 
        (jogo.plataformas && jogo.plataformas.includes(filtros.plataforma));
      
      return passaFiltroLoja && passaFiltroTitulo && passaFiltroPreco && 
             passaFiltroDesconto && passaFiltroPlataforma;
    });
  }, [filtros]);

  const ordenarJogos = useCallback((jogosParaOrdenar: Jogo[]) => {
    return [...jogosParaOrdenar].sort((a, b) => {
      if (!filtros.ordenarPor) return 0;
      
      switch (filtros.ordenarPor) {
        case "preco":
          return a.precoAtual - b.precoAtual;
        case "desconto":
          return b.desconto - a.desconto;
        case "avaliacao":
          return (b.avaliacao || 0) - (a.avaliacao || 0);
        case "data":
          return new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime();
        default:
          return 0;
      }
    });
  }, [filtros.ordenarPor]);

  const carregarJogos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await carregarComDelay();

      if (process.env.NODE_ENV === 'development') {
        const jogosValidos = jogosMockados.filter(jogo => 
          jogo.titulo && !jogo.titulo.toLowerCase().includes('jogo')
        );
        setJogos(jogosValidos);
        setJogosFiltrados(aplicarFiltros(jogosValidos));
        setLojas(lojasMockadas);
        return;
      }

      const deals = await fetch50Deals();
      const stores = await fetchStores();
      const { storesMap, jogosFormatados } = processarDados(deals, stores);
      
      setLojas(storesMap);
      setJogos(jogosFormatados);
      setJogosFiltrados(aplicarFiltros(jogosFormatados));
    } catch (err) {
      console.error('Erro ao carregar jogos:', err);
      setError('Erro ao carregar os jogos. Tentando usar dados mockados...');
      const jogosValidos = jogosMockados.filter(jogo => 
        jogo.titulo && !jogo.titulo.toLowerCase().includes('jogo')
      );
      setJogos(jogosValidos);
      setJogosFiltrados(aplicarFiltros(jogosValidos));
      setLojas(lojasMockadas);
    } finally {
      setLoading(false);
    }
  }, [processarDados, carregarComDelay, aplicarFiltros]);

  useEffect(() => {
    carregarJogos();
  }, [carregarJogos]);

  useEffect(() => {
    if (jogos.length > 0) {
      const filtrados = aplicarFiltros(jogos);
      const ordenados = ordenarJogos(filtrados);
      setJogosFiltrados(ordenados);
    }
  }, [filtros, jogos, aplicarFiltros, ordenarJogos]);

  return { 
    jogos: jogosFiltrados, 
    loading, 
    error, 
    lojas,
    filtros,
    setFiltros,
    carregarJogos,
    detalhesJogo,
    setDetalhesJogo
  };
};