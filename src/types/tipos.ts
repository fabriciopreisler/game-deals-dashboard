export interface Jogo {
   id: string;
  titulo: string;
  precoAtual: number;
  precoOriginal: number;
  desconto: number;
  loja: string;
  lojaNome?: string;
  avaliacao?: number;
  capa: string;
  plataformas?: string[];
  metacriticScore?: string;
  descricao?: string;
  linkDeal?: string;
  releaseDate?: string;
}

export interface Filtros {
  loja?: string;
  precoMin?: number;
  precoMax?: number;
  descontoMin?: number;
  ordenarPor?: 'preco' | 'desconto' | 'avaliacao' | 'data';
  titulo?: string;
  plataforma?: string;
}

export interface GameInfo {
  info?: {
    title?: string;
    steamRatingPercent?: string;
    thumb?: string;
    metacriticScore?: string;
    about?: {
      description?: string;
    };
  };
}