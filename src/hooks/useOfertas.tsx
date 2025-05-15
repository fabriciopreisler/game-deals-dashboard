import { useState, useEffect, useCallback } from "react";
import { Jogo, Filtros } from "../types/tipos";
import { jogosMockados } from "../api/mockData";
import { makeApiCall } from "../api/apiService";

interface DealResponse {
  gameID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: string;
  thumb: string;
  dealRating: string;
  storeID: string;
  dealID: string;
}

export const useOfertas = (filtros: Filtros) => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [jogosFiltrados, setJogosFiltrados] = useState<Jogo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const transformarDados = useCallback((deals: DealResponse[]): Jogo[] => {
    return deals.map(deal => ({
      id: deal.dealID,
      titulo: deal.title,
      precoAtual: parseFloat(deal.salePrice),
      precoOriginal: parseFloat(deal.normalPrice),
      desconto: parseFloat(deal.savings),
      loja: deal.storeID,
      avaliacao: deal.dealRating ? parseFloat(deal.dealRating) : undefined,
      capa: deal.thumb.replace('capsule_sm_120', 'header'),
      metacriticScore: deal.metacriticScore,
      plataformas: [],
      linkDeal: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
    }));
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
        default:
          return 0;
      }
    });
  }, [filtros.ordenarPor]);

  const buscarOfertas = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      if (process.env.NODE_ENV === 'development') {
        const jogosFiltrados = aplicarFiltros(jogosMockados);
        const jogosOrdenados = ordenarJogos(jogosFiltrados);
        setJogos(jogosMockados);
        setJogosFiltrados(jogosOrdenados);
        return;
      }

      const apiParams = {
        pageSize: 60,
        onSale: 1,
        ...(filtros.titulo && { title: filtros.titulo }),
        ...(filtros.loja && { storeID: filtros.loja }),
        ...(filtros.precoMin !== undefined && { lowerPrice: filtros.precoMin }),
        ...(filtros.precoMax !== undefined && { upperPrice: filtros.precoMax }),
        ...(filtros.ordenarPor && { 
          sortBy: filtros.ordenarPor === 'preco' ? 'Price' : 
                 filtros.ordenarPor === 'desconto' ? 'Savings' : 
                 'DealRating' 
        })
      };

      const response = await makeApiCall<DealResponse[]>('deals', apiParams);
      const jogosTransformados = transformarDados(response);
      const jogosFiltrados = aplicarFiltros(jogosTransformados);
      const jogosOrdenados = ordenarJogos(jogosFiltrados);

      setJogos(jogosTransformados);
      setJogosFiltrados(jogosOrdenados);
    } catch (error) {
      console.error('Erro ao buscar ofertas:', error);
      setErro('Erro ao carregar ofertas. Usando dados locais...');
      
      const jogosFiltrados = aplicarFiltros(jogosMockados);
      const jogosOrdenados = ordenarJogos(jogosFiltrados);
      setJogos(jogosMockados);
      setJogosFiltrados(jogosOrdenados);
    } finally {
      setCarregando(false);
    }
  }, [filtros, transformarDados, aplicarFiltros, ordenarJogos]);

  useEffect(() => {
    buscarOfertas();
  }, [buscarOfertas]);

  useEffect(() => {
    if (jogos.length > 0) {
      const filtrados = aplicarFiltros(jogos);
      const ordenados = ordenarJogos(filtrados);
      setJogosFiltrados(ordenados);
    }
  }, [filtros, jogos, aplicarFiltros, ordenarJogos]);

  return { 
    jogos: jogosFiltrados, 
    carregando, 
    erro,
    recarregar: buscarOfertas 
  };
};