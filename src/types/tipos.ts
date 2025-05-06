// src/types/tipos.ts
export interface Jogo {
    id: string;
    titulo: string;
    precoAtual: number;
    precoOriginal: number;
    desconto: number;
    loja: string; 
    avaliacao: number;
    capa: string;
    dataLancamento?: string;
    metacritic?: number;
    plataformas?: string[];

    descricao?: string;
    generos?: string[];
    desenvolvedor?: string;
    distribuidor?: string;
  }
  
  export interface Filtros {
    loja?: string;
    precoMin?: number;
    precoMax?: number;
    descontoMin?: number;
    ordenarPor?: "preco" | "desconto" | "avaliacao" | "data";
    titulo?: string;
    plataforma?: string;
  }
  

  export type ColunaTabela = {
    id: string;
    header: string;
    accessorKey: string;
    cell?: (info: any) => React.ReactNode;
  };
  

  export interface ModalDetalhesProps {
    jogo: Jogo;
    aberto: boolean;
    aoFechar: () => void;
  }
  

  export interface FiltrosProps {
    filtros: Filtros;
    aoFiltrar: (novosFiltros: Filtros) => void;
  }