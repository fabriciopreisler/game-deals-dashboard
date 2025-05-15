import { useState } from 'react';
import { useJogos } from "./hooks/useJogos";
import { CartaoJogo } from "./components/CartaoJogo";
import { ModalDetalhes } from "./components/ModalDetalhes";
import { Filtros } from "./components/Filtros";
import { TabelaJogos } from "./components/TabelaJogos";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Jogo } from './types/tipos';

function App() {
  const { 
    jogos, 
    loading, 
    error, 
    lojas, 
    filtros,
    setFiltros,
    carregarJogos,
    detalhesJogo,
    setDetalhesJogo
  } = useJogos();

  const [visualizacao, setVisualizacao] = useState<'tabela' | 'cartoes'>('tabela');
  const [modalAberto, setModalAberto] = useState(false);

  const handleAbrirModal = (jogo: Jogo) => {
    setDetalhesJogo(jogo);
    setModalAberto(true);
  };

  const handleLimparFiltros = () => {
    setFiltros({
      loja: undefined,
      precoMin: undefined,
      precoMax: undefined,
      descontoMin: undefined,
      ordenarPor: 'avaliacao',
      titulo: undefined,
      plataforma: undefined
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-purple-300">Carregando ofertas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center border border-red-500">
          <h2 className="text-xl font-bold text-red-400 mb-2">Erro de Conexão</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => carregarJogos()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (jogos.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-purple-400 mb-2">Nenhum jogo encontrado</h2>
          <p className="text-gray-300 mb-4">Não foram encontrados jogos válidos com os filtros atuais.</p>
          <button 
            onClick={handleLimparFiltros}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-gray-100">
      <header className="bg-gradient-to-r bg-roxo-800 text-white p-4 rounded-lg mb-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">Descontos Explosivos</h1>
          <img 
            src="/img/BuscaFire.png" 
            alt="Logo" 
            className="h-12 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x50?text=Logo';
            }}
          />
        </div>
      </header>

      <main className="container mx-auto">
        <Filtros 
          filtros={filtros} 
          setFiltros={setFiltros} 
          lojas={lojas} 
          className="bg-gray-800 p-4 rounded-lg shadow mb-6"
        />

        <Tabs 
          value={visualizacao}
          onValueChange={(value) => setVisualizacao(value as 'tabela' | 'cartoes')}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-2 w-64 bg-gray-800">
            <TabsTrigger 
              value="tabela"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Tabela
            </TabsTrigger>
            <TabsTrigger 
              value="cartoes"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Cartões
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {visualizacao === 'tabela' ? (
          <TabelaJogos 
            data={jogos} 
            onRowClick={handleAbrirModal}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {jogos.map((jogo: Jogo) => (
              <CartaoJogo 
                key={jogo.id} 
                jogo={jogo} 
                aoClicar={() => handleAbrirModal(jogo)}
                className="bg-gray-800 hover:bg-gray-750 transition-colors rounded-lg shadow-lg overflow-hidden"
              />
            ))}
          </div>
        )}

        {detalhesJogo && (
          <ModalDetalhes 
            jogo={detalhesJogo}
            aberto={modalAberto}
            aoFechar={() => {
              setModalAberto(false);
              setDetalhesJogo(null);
            }}
            className="bg-gray-800 text-white"
          />
        )}
      </main>

      <footer className="mt-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Ofertas de Jogos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;