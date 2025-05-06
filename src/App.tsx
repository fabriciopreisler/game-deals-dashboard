import { useState, useEffect } from 'react';
import { TabelaJogos } from "./components/TabelaJogos";
import { Filtros } from "./components/Filtros";
import { useJogos } from "./hooks/useJogos";
import { CartaoJogo } from "./components/CartaoJogo";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Filtros as FiltrosType } from "./types/tipos";

function App() {
  const { jogos, loading, error, lojas, carregarJogos } = useJogos();
  const [filtros, setFiltros] = useState<FiltrosType>({
    loja: undefined,
    precoMin: undefined,
    precoMax: undefined,
    descontoMin: undefined,
    ordenarPor: 'avaliacao',
    titulo: undefined,
    plataforma: undefined
  });

  const [visualizacao, setVisualizacao] = useState<'tabela' | 'cartoes'>('tabela');

  useEffect(() => {
    const params: Record<string, any> = {
      onSale: 1,
      pageSize: 20
    };

    if (filtros.loja) params.storeID = filtros.loja;
    if (filtros.titulo) params.title = filtros.titulo;
    if (filtros.precoMin) params.lowerPrice = filtros.precoMin;
    if (filtros.precoMax) params.upperPrice = filtros.precoMax;
    if (filtros.descontoMin) params.minSavings = filtros.descontoMin;
    if (filtros.ordenarPor) params.sortBy = filtros.ordenarPor;

    carregarJogos(params);
  }, [filtros]);

  if (loading) {
    return (
      <div className="min-h-screen bg-roxo p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Carregando jogos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-roxo p-4 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Erro ao carregar</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-roxo p-4">
      <header className="bg-header-verde text-gray-900 p-4 rounded-lg mb-6 shadow-md">
        <h1 className="text-2xl font-bold">Ofertas de Jogos</h1>
      </header>

      <main className="container mx-auto">
        <Filtros filtros={filtros} setFiltros={setFiltros} lojas={lojas} />

        <Tabs 
          defaultValue="tabela" 
          className="mb-6"
          onValueChange={(value) => setVisualizacao(value as 'tabela' | 'cartoes')}
        >
          <TabsList className="grid grid-cols-2 w-64 bg-white">
            <TabsTrigger value="tabela">Tabela</TabsTrigger>
            <TabsTrigger value="cartoes">Cartões</TabsTrigger>
          </TabsList>
        </Tabs>

        {jogos.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg">Nenhum jogo encontrado com esses filtros.</p>
            <button 
              onClick={() => setFiltros({
                loja: undefined,
                precoMin: undefined,
                precoMax: undefined,
                descontoMin: undefined,
                ordenarPor: 'avaliacao',
                titulo: undefined,
                plataforma: undefined
              })}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Limpar filtros
            </button>
          </div>
        ) : visualizacao === 'tabela' ? (
          <div className="bg-white rounded-lg shadow p-4">
            <TabelaJogos data={jogos} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jogos.map(jogo => (
              <CartaoJogo 
                key={jogo.id} 
                jogo={jogo} 
                aoClicar={() => console.log('Jogo selecionado:', jogo.titulo)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;