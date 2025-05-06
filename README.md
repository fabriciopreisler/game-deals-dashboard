 Descrição
Este é um sistema de jogos desenvolvido com Node.js, oferecendo uma coleção de jogos simples ou uma plataforma para jogos (ajuste conforme sua necessidade).

⚙️ Pré-requisitos
Node.js (versão 16.x ou superior)

npm (vem com o Node.js) ou yarn

Git (opcional, para versionamento)

� Como instalar e executar
1. Clone o repositório
bash
git clone https://github.com/seu-usuario/sistema-jogos.git  
cd sistema-jogos  
2. Instale as dependências
bash
npm install  
3. Execute o projeto
bash
npm start  
O sistema estará disponível em:
🔗 http://localhost:3000 (ou outra porta, se configurada)

📂 Estrutura do projeto
sistema-jogos/  
├── node_modules/   # Bibliotecas instaladas  
├── src/            # Código principal  
│   ├── games/      # Jogos incluídos  
│   ├── assets/     # Imagens, sons, etc.  
│   └── index.js    # Arquivo principal  
├── package.json    # Configurações e dependências  
└── README.md       #
 Desafio Frontend: Game Deals Dashboard – CheapShark API
Desenvolva um dashboard de ofertas de jogos utilizando a CheapShark API com foco  em design moderno e experiência de usuário.
link: https://apidocs.cheapshark.com/

 Tecnologias Recomendadas
    • ReactJS 
    • TailwindCSS
    • Qualquer biblioteca de UI: Shadcn/UI, Lucide Icons, Radix UI, ou similar
    • Axios 
    • (Opcional) TypeScript
 Funcionalidades obrigatórias
1.  Data Table de Jogos
    • Exibir os jogos retornados pela API /deals em um data table.
    • A tabela deve conter:
        ◦ Nome do jogo
        ◦ Preço atual
        ◦ Preço original
        ◦ Porcentagem de desconto
        ◦ Loja
        ◦ Nota (Deal Rating)
 Pode usar bibliotecas como @tanstack/react-table, shadcn/ui (data-table), ou criar sua própria.

2.  Filtros e Selects
    • Filtro por loja (storeID)
    • Filtro por faixa de preço (lowerPrice e upperPrice)
    • Filtro por porcentagem mínima de desconto
    • Select para ordenar por:
        ◦ Price
        ◦ Savings
        ◦ Deal Rating
    • Campo de busca por título

3.  Modal de Detalhes
    • Ao clicar em uma linha da tabela ou card, abrir um modal com mais detalhes sobre o jogo:
        ◦ Nome do jogo
        ◦ Imagem maior
        ◦ Preços (atual e original)
        ◦ Loja
        ◦ Histórico de menor preço (historicalLow)
        ◦ Link para compra

4.  Componentização
    • Criar componentes reutilizáveis, organizados por pastas:
        ◦ <DataTable />
        ◦ <GameModal />
        ◦ <FilterSidebar /> ou <FilterControls />
        ◦ <Select />, <Input />, <PriceRange />
        ◦ <GameCard /> (caso deseje um modo de visualização alternativo)

5.  Design e UX
    • Layout moderno e responsivo.
    • Modais, transições suaves e boa hierarquia visual.
    • Ícones e elementos interativos com feedback visual (hover, foco, loading).
    • Tema escuro/claro (opcional).

 Extras (Diferenciais)
    • Scroll infinito ou paginação
    • Salvamento de favoritos com localStorage/cookies
    • Skeleton loaders
    • Toggle para mudar entre modo tabela e modo cards
Game Deals Dashboard - CheapShark API
Desenvolvido por Fabrício Preisler

Visão Geral
Dashboard interativo de ofertas de jogos que consome a CheapShark API, desenvolvido com React e TailwindCSS. Oferece uma experiência moderna para descobrir os melhores deals de jogos entre diversas lojas.

Funcionalidades Principais
Tabela dinâmica de jogos com filtros avançados

Sistema de busca e ordenação

Modal de detalhes com histórico de preços


 Design responsivo com tema escuro/claro

 Performance otimizada com lazy loading

 Tecnologias Utilizadas
React 18 (Vite)

TypeScript

TailwindCSS + ShadCN/ui

Axios para chamadas API

React Query para gerenciamento de estado

Desenvolvido por Fabrício Preisler