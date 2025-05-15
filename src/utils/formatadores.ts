export const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const formatarData = (dataString?: string): string => {
  if (!dataString) return 'Data não disponível';
  
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  } catch {
    return 'Data inválida';
  }
};