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
    // Limpa parâmetros undefined antes de enviar
    const paramsClean = Object.fromEntries(
      Object.entries(filtros).filter(([_, v]) => v !== undefined)
    );
    carregarJogos(paramsClean);
  }, [filtros]); // Apenas filtros como dependência

  if (loading) {
    return (
      <div className="min-h-screen bg-roxo p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-white">Carregando ofertas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-roxo p-4 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Ocorreu um erro</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-roxo p-4">
<header className="header-ofertas rounded-t-lg">
  <h1>Ofertas de Jogos</h1>
</header>

      <main className="container mx-auto">
        <Filtros filtros={filtros} setFiltros={setFiltros} lojas={lojas} />

        <Tabs 
          defaultValue="tabela" 
          className="mb-6"
          onValueChange={(value) => setVisualizacao(value as 'tabela' | 'cartoes')}
        >
          <TabsList className="grid grid-cols-2 w-64 bg-white">
            <TabsTrigger 
              value="tabela"
              className="data-[state=active]:bg-green-200 data-[state=active]:text-gray-900"
            >
              Tabela
            </TabsTrigger>
            <TabsTrigger 
              value="cartoes"
              className="data-[state=active]:bg-green-200 data-[state=active]:text-gray-900"
            >
              Cartões
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {jogos.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg mb-4">Nenhum jogo encontrado com esses filtros</p>
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
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : visualizacao === 'tabela' ? (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
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