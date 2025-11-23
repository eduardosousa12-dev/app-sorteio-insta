# Sistema de Sorteio para Lives - LL MODAS

Sistema de sorteio em tempo real desenvolvido para lives do Instagram, com validação automática de comentários e interface premium.

## Funcionalidades

- Busca automática de comentários via webhook
- Validação de participantes (mínimo 3 marcações)
- Animação de sorteio estilo slot machine
- Efeito de confete ao revelar vencedor
- Opção de refazer sorteio
- Interface responsiva (mobile-first)

## Tecnologias

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## Como executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do Projeto

```
src/
├── components/       # Componentes React
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
└── App.jsx          # Componente principal
```

## Regras do Sorteio

Para um comentário ser válido, o participante deve marcar pelo menos **3 pessoas** no comentário.
