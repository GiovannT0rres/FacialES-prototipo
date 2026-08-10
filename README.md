# Protótipos

Hub de protótipos navegáveis, construído em Next.js + Tailwind CSS.

## Estrutura

- `app/page.tsx` — hub inicial, lista os protótipos disponíveis.
- `app/facial/` — **Entrada Segura**: fluxo de cadastro, verificação facial
  (simulada) e liberação de acesso, com fluxos de Registro e Login e o
  caminho de erro/autorização por chamada de voz.

Cada novo protótipo deve viver em sua própria pasta dentro de `app/` (ex.:
`app/morador/`) e ser adicionado à lista de cards em `app/page.tsx`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy

Publicado na Vercel a partir da branch `main`.
