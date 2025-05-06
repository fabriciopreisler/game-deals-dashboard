import { Jogo } from "../types/tipos";

export const lojasMockadas: Record<string, string> = {
  '1': 'Steam',
  '2': 'Epic Games',
  '3': 'GOG',
  '4': 'Humble Store',
  '5': 'Fanatical'
};

export const jogosMockados: Jogo[] = [
  {
    id: '1',
    titulo: 'The Witcher 3: Wild Hunt',
    precoAtual: 39.9,
    precoOriginal: 99.9,
    desconto: 60,
    loja: '1',
    avaliacao: 4.9,
    capa: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
    plataformas: ['PC', 'PS4', 'Xbox One']
  },
  {
    id: '2',
    titulo: 'Red Dead Redemption 2',
    precoAtual: 119.9,
    precoOriginal: 199.9,
    desconto: 40,
    loja: '1',
    avaliacao: 4.8,
    capa: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    plataformas: ['PC', 'PS4', 'Xbox One']
  },
  {
    id: '3',
    titulo: 'Cyberpunk 2077',
    precoAtual: 149.9,
    precoOriginal: 199.9,
    desconto: 25,
    loja: '2',
    avaliacao: 4.5,
    capa: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    plataformas: ['PC', 'PS5', 'Xbox Series X']
  }
];