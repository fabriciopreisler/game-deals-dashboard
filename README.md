Visão Geral

Dashboard interativo de ofertas de jogos que consome a CheapShark API, desenvolvido com React, TypeScript e TailwindCSS. Oferece uma experiência moderna para descobrir os melhores deals de jogos entre diversas lojas.

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

Zod para validação

Instalação e Execução
Pré-requisitos
Node.js 18+

npm ou yarn

Passo a Passo
Clone o repositório:


git clone https://github.com/fabriciopreisler/game-deals-dashboard.git
cd game-deals-dashboard
Instale as dependências:

npm install

Execute o projeto:

npm start

Acesse: http://localhost:3000

Estrutura do Projeto
src/
├── assets/            # Imagens e recursos estáticos
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes UI (ShadCN)
│   ├── tabela/       # Tabela de jogos
│   ├── filtros/      # Componentes de filtro
│   └── modal/        # Modal de detalhes
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configurações
├── services/         # Lógica de API
├── stores/           # Gerenciamento de estado
├── types/            # Tipos TypeScript
└── views/            # Páginas principais
Funcionalidades Implementadas
Tabela Dinâmica de Jogos
Exibição paginada de deals

Ordenação por preço, desconto e avaliação

Visualização responsiva (tablet/mobile)

Sistema de Filtros
Filtro por loja (multi-select)

Faixa de preço (range slider)

Porcentagem mínima de desconto

Busca por título

Modal de Detalhes
Informações completas do jogo

Histórico de preços (gráfico)

Link direto para a oferta

Extras Implementados
Tema escuro/claro com toggle

Favoritos com localStorage

Skeleton loading

Visualização em cards/tabela

Animações com Framer Motion

Documentação da API
Utiliza a CheapShark API com os seguintes endpoints:

/deals - Lista de ofertas

/games - Detalhes específicos

/stores - Informações das lojas



Desenvolvido por Fabrício Preisler

GitHub: https://github.com/fabriciopreisler
Portfólio:https://heylink.me/FabricioPreisler
