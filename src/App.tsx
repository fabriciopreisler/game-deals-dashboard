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
    const params = {
      ...Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v !== undefined)
      )
    };
    carregarJogos(params);
  }, [filtros, carregarJogos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-white">Carregando ofertas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 p-4 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-950 p-4">
      <header className="bg-roxo-800 text-white p-4 rounded-lg mb-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Descontos Explosivos </h1>
        <div className="flex items-center">
          <img 
            src={`${process.env.PUBLIC_URL}/img/BuscaFire.png`}
            alt="Logo BuscaFire" 
            className="h-10 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo+indisponível';
            }}
          />
        </div>
      </header>

      <main className="container mx-auto">
        <Filtros filtros={filtros} setFiltros={setFiltros} lojas={lojas} />

        <Tabs 
          defaultValue="tabela" 
          className="mb-6"
          onValueChange={(value) => setVisualizacao(value as 'tabela' | 'cartoes')}
        >
          <TabsList className="grid grid-cols-2 w-64 bg-gray-800">
            <TabsTrigger 
              value="tabela"
              className="data-[state=active]:bg-roxo-600 data-[state=active]:text-white"
            >
              Tabela
            </TabsTrigger>
            <TabsTrigger 
              value="cartoes"
              className="data-[state=active]:bg-roxo-600 data-[state=active]:text-white"
            >
              Cartões
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {jogos.length === 0 ? (
          <div className="bg-gray-900 rounded-lg shadow p-8 text-center">
            <p className="text-lg mb-4 text-white">Nenhum jogo encontrado com esses filtros.</p>
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
              className="bg-roxo-600 text-white px-4 py-2 rounded hover:bg-roxo-700 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : visualizacao === 'tabela' ? (
          <TabelaJogos data={jogos} />
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