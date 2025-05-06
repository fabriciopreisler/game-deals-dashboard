// src/App.tsx
import { useState } from 'react';
import { TabelaJogos } from "./components/TabelaJogos";
import { Filtros } from "./components/Filtros";
import { Jogo, Filtros as FiltrosType } from "./types/tipos";
import { CartaoJogo } from "./components/CartaoJogo";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  // Estado dos filtros atualizado para corresponder ao tipo FiltrosType
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


  const jogos: Jogo[] = [
    {
      id: '1',
      titulo: 'The Witcher 3',
      precoAtual: 39.90,
      precoOriginal: 99.90,
      desconto: 60,
      loja: '1', // 1 = Steam
      avaliacao: 4.9,
      capa: 'https://via.placeholder.com/150',
      dataLancamento: '2015-05-18',
      metacritic: 93,
      plataformas: ['PC', 'PS4', 'XBOX']
    },

  ];

  const handleCartaoClick = (jogo: Jogo) => {
    console.log('Jogo selecionado:', jogo.titulo);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Ofertas de Jogos</h1>
      </header>

      <main className="container mx-auto">
        {/* Filtros atualizados para usar setFiltros */}
        <Filtros filtros={filtros} setFiltros={setFiltros} />

        <Tabs 
          defaultValue="tabela" 
          className="mb-6"
          onValueChange={(value) => setVisualizacao(value as 'tabela' | 'cartoes')}
        >
          <TabsList className="grid grid-cols-2 w-64">
            <TabsTrigger value="tabela">Visualização em Tabela</TabsTrigger>
            <TabsTrigger value="cartoes">Visualização em Cartões</TabsTrigger>
          </TabsList>
        </Tabs>

        {visualizacao === 'tabela' ? (
          <div className="bg-white rounded-lg shadow p-4">
            <TabelaJogos data={jogos} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jogos.map(jogo => (
              <CartaoJogo 
                key={jogo.id} 
                jogo={jogo} 
                aoClicar={() => handleCartaoClick(jogo)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;