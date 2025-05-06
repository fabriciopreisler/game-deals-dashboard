import { useState, useEffect } from "react";
import { Jogo, Filtros } from "../types/tipos";

export const useOfertas = (filtros: Filtros) => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarOfertas = () => {
      setCarregando(true);
      
      const jogosMockados: Jogo[] = [

      ];

      // Aplicar filtros
      const jogosFiltrados = jogosMockados.filter(jogo => {
        const passaFiltroLoja = !filtros.loja || jogo.loja === filtros.loja;
        const passaFiltroTitulo = !filtros.titulo || 
          jogo.titulo.toLowerCase().includes(filtros.titulo.toLowerCase());
        const passaFiltroPreco = (!filtros.precoMin || jogo.precoAtual >= filtros.precoMin) && 
          (!filtros.precoMax || jogo.precoAtual <= filtros.precoMax);
        const passaFiltroDesconto = !filtros.descontoMin || 
          (jogo.desconto >= filtros.descontoMin);
        const passaFiltroPlataforma = !filtros.plataforma || 
          jogo.plataformas?.includes(filtros.plataforma);
        
        return passaFiltroLoja && passaFiltroTitulo && passaFiltroPreco && 
               passaFiltroDesconto && passaFiltroPlataforma;
      });

      // Ordenação
      const jogosOrdenados = [...jogosFiltrados].sort((a, b) => {
        if (!filtros.ordenarPor) return 0;
        
        switch (filtros.ordenarPor) {
          case "preco":
            return a.precoAtual - b.precoAtual;
          case "desconto":
            return b.desconto - a.desconto;
          case "avaliacao":
            return b.avaliacao - a.avaliacao;
          default:
            return 0;
        }
      });

      setJogos(jogosOrdenados);
      setCarregando(false);
    };

    buscarOfertas();
  }, [filtros]);

  return { jogos, carregando };
};