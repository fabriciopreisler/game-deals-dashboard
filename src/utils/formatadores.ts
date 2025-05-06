export function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
  
  export function formatarPorcentagem(valor: number): string {
    return `${Math.round(valor)}%`;
  }