export interface Jogo {
    id: string;
    titulo: string;
    precoAtual: number;
    precoOriginal: number;
    desconto: number;
    loja: string;
    avaliacao: number;
    capa: string;
    metacritic?: string;
    dealRating?: string;
    plataformas?: string[];
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
  
  export interface Loja {
    storeID: string;
    storeName: string;
  }