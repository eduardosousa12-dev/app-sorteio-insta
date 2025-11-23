# Sistema de Sorteio para Lives do Instagram

Sistema de sorteio em tempo real desenvolvido para lives do Instagram da LL MODAS, com validação automática de comentários e interface premium mobile-first.

## Sobre o Projeto

Este projeto consiste em um frontend React que se integra com um backend em **n8n** para buscar e processar comentários de posts do Instagram em tempo real durante lives.

### Arquitetura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Frontend      │ ──── │   n8n Webhook   │ ──── │  Instagram API  │
│   (React)       │ POST │   (Backend)     │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

- **Frontend (React)**: Interface do sorteio, validação de comentários, animações
- **Backend (n8n)**: Webhook que busca comentários do Instagram e retorna para o frontend

## Funcionalidades

- Busca automática de comentários via webhook n8n
- Validação de participantes (mínimo 3 marcações)
- Exibição de estatísticas (total, válidos, inválidos)
- Animação de sorteio estilo slot machine
- Efeito de confete ao revelar vencedor
- Opção de refazer sorteio (exclui vencedor anterior)
- Interface responsiva (mobile-first)

## Tecnologias

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios

**Backend:**
- n8n (workflow de automação)
- Instagram Graph API

## Como Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Configuração do Webhook

O frontend faz uma requisição POST para o webhook do n8n que retorna os comentários do post:

```javascript
POST https://seu-webhook.com/webhook/id-do-webhook
```

**Resposta esperada:**
```json
[
  {
    "id": "123456789",
    "text": "@amiga1 @amiga2 @amiga3",
    "username": "participante",
    "timestamp": "2025-01-01T12:00:00"
  }
]
```

## Regras do Sorteio

Para um comentário ser considerado **válido**, o participante deve marcar pelo menos **3 pessoas** (@usuario) no comentário.

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx           # Cabeçalho com logo
│   ├── DrawButton.jsx       # Botão de sorteio
│   ├── DrawingAnimation.jsx # Animação do sorteio
│   ├── WinnerCard.jsx       # Card do vencedor
│   ├── Stats.jsx            # Estatísticas
│   ├── LoadingScreen.jsx    # Tela de carregamento
│   └── ErrorState.jsx       # Tela de erro
├── hooks/
│   └── useLottery.js        # Lógica do sorteio
├── utils/
│   ├── api.js               # Chamadas ao webhook
│   └── validation.js        # Validação de comentários
└── App.jsx                  # Componente principal
```

## Deploy

O projeto pode ser hospedado na Vercel ou qualquer plataforma que suporte aplicações React/Vite.
