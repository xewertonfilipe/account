# Bytebank Account MFE

Microfrontend responsavel por exibir o card de saldo da conta no shell do Bytebank.

## Visao geral

- Package: `@bytebank/account`
- Porta local (webpack): `9004`
- Porta container (docker): `8083`
- Artefato servido: `bytebank-account.js`

## Pre-requisitos

1. Node.js 18+
2. npm 9+
3. Docker Desktop (opcional, para execucao via container)

## Instalacao

```bash
npm install
```

## Executando em desenvolvimento (npm)

1. Inicie o servidor de desenvolvimento:

```bash
npm start
```

2. O MFE sera servido em `http://localhost:9004/bytebank-account.js`.

3. Para rodar isolado (sem orchestrator), use:

```bash
npm run start:standalone
```

## Executando em desenvolvimento (Docker)

1. Suba o container:

```bash
docker compose up --build
```

2. O MFE sera servido em `http://localhost:8083/bytebank-account.js`.

## Integracao com o orchestrator

- Modo local do orchestrator (`isLocal`): consome `http://localhost:9004/bytebank-account.js`

## Responsividade

- Layout do card de conta ajustado para telas pequenas, tablets e desktop.
- Breakpoints validados: 320px, 768px e 1024px.
- Ajustes principais: card com espacamento responsivo, bloco de saldo sem rigidez horizontal e tipografia escalavel.

## Scripts uteis

- `npm start`: sobe webpack dev server na porta 9004
- `npm run start:standalone`: executa standalone
- `npm run build`: build de producao
- `npm test`: executa testes
- `npm run coverage`: executa testes com cobertura
- `npm run lint`: lint
- `npm run type-check`: verificacao de tipos
- `npm run format`: formatacao com Prettier

## Testes

```bash
npm test
```

Para cobertura:

```bash
npm run coverage
```

## Troubleshooting

1. Se a porta `9004` estiver ocupada, finalize o processo em conflito e rode `npm start` novamente.
2. Se o shell nao carregar o MFE, confirme se o orchestrator esta no mesmo perfil de portas (900x ou 808x).
3. Se houver erro de cache no navegador, faca hard refresh (Ctrl+F5).
