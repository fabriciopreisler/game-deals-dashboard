import { useState, useEffect } from "react";
import { Jogo, Filtros } from "../types/tipos";

export const useOfertas = (filtros: Filtros) => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarOfertas = () => {
      setCarregando(true);
      
      const jogosMockados: Jogo[] = [
        {
          id: "1",
          titulo: "Devil May Cry V",
          precoAtual: 79.90,
          precoOriginal: 199.90,
          desconto: 60,
          loja: "1",
          avaliacao: 4.8,
          capa: "https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg",
          plataformas: ["PC", "PS4", "Xbox One"]
        },
        {
          id: "2",
          titulo: "It Takes Two",
          precoAtual: 99.90,
          precoOriginal: 159.90,
          desconto: 38,
          loja: "1",
          avaliacao: 4.9,
          capa: "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg",
          plataformas: ["PC", "PS4", "PS5", "Xbox Series X"]
        },
        {
          id: "3",
          titulo: "Split Fiction",
          precoAtual: 129.90,
          precoOriginal: 149.90,
          desconto: 13,
          loja: "2",
          avaliacao: 4.5,
          capa: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubp8yWQKtqVWJVgXQ3qN.jpg",
          plataformas: ["PS5", "Xbox Series X"]
        },
        {
          id: "4",
          titulo: "Black Myth: Wukong",
          precoAtual: 249.90,
          precoOriginal: 249.90,
          desconto: 0,
          loja: "3",
          avaliacao: 4.7,
          capa: "https://image.api.playstation.com/vulcan/ap/rnd/202308/1010/9c8b8a0a6d5e5a5a5a5a5a5a5a5a5a5a5a5a5a.jpg",
          plataformas: ["PC", "PS5"]
        },
        {
          id: "5",
          titulo: "Mario Kart 8 Deluxe",
          precoAtual: 299.90,
          precoOriginal: 349.90,
          desconto: 14,
          loja: "4",
          avaliacao: 4.9,
          capa: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_801/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f",
          plataformas: ["Nintendo Switch"]
        },
        {
          id: "6",
          titulo: "F-Zero",
          precoAtual: 59.90,
          precoOriginal: 59.90,
          desconto: 0,
          loja: "4",
          avaliacao: 4.3,
          capa: "https://m.media-amazon.com/images/I/81aJ-R4N1wL._AC_UF1000,1000_QL80_.jpg",
          plataformas: ["Nintendo Switch"]
        },
        {
          id: "7",
          titulo: "FIFA 25",
          precoAtual: 349.90,
          precoOriginal: 349.90,
          desconto: 0,
          loja: "5",
          avaliacao: 3.9,
          capa: "https://www.ea.com/assets/compressed-images/fifa-25-cover.jpg",
          plataformas: ["PC", "PS5", "Xbox Series X"]
        },
        {
          id: "8",
          titulo: "Elden Ring",
          precoAtual: 199.90,
          precoOriginal: 249.90,
          desconto: 20,
          loja: "1",
          avaliacao: 4.9,
          capa: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
          plataformas: ["PC", "PS4", "PS5", "Xbox Series X"]
        }
      ];

      // Aplicar filtros
      const jogosFiltrados = jogosMockados.filter(jogo => {
        const passaFiltroLoja = !filtros.loja || jogo.loja === filtros.loja;
        const passaFiltroPlataforma = !filtros.plataforma || 
          jogo.plataformas?.includes(filtros.plataforma);
        const passaFiltroPreco = (!filtros.precoMin || jogo.precoAtual >= filtros.precoMin) && 
          (!filtros.precoMax || jogo.precoAtual <= filtros.precoMax);
        
        return passaFiltroLoja && passaFiltroPlataforma && passaFiltroPreco;
      });

      // Ordenar
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