# Autorização via Check-in Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new prototype module at `/autorizacao-familiar` that mirrors `/ativacao-proprietario`'s operator panel flow, but pre-highlights "Familiar" as the motivo and adds two extra mock fields (access period, and permission to sub-authorize), plus a new Hub card.

**Architecture:** New `app/autorizacao-familiar/` directory mirroring the structure of `app/ativacao-proprietario/` (`page.tsx` + `lib/types.ts` + `components/screens/PainelOperadorScreen.tsx`). Reuses `PhoneShell` from `app/facial/components/PhoneShell` and `BoardingPassScreen` directly from `app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx` (identical message, no props, so it's imported rather than duplicated). `PainelOperadorScreen` is a new component copied from the proprietário module's version with the extra fields and "Familiar" highlighted.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS. No test runner in this repo — verification is `npx tsc --noEmit` plus manual browser check via Playwright MCP against the dev server.

## Global Constraints

- Route: `/autorizacao-familiar`.
- Hub card title (exact copy): "Autorização via Check-in".
- Reuses the exact dark-theme visual language of `/ativacao-proprietario`: same `Cabecalho` (Entrada Segura / Home / Acessos / Avaliação / Cadastro / Ativar / Sair, visual only), same pedido card + avatar layout, same 5-motivo row, same unit dropdown behavior (closed "Selecione..." that expands, tap-to-activate).
- Motivo pre-highlighted: "Familiar" (not "Proprietário") — requires adding `"Familiar"` to the `Motivo` union and `MOTIVOS` list for this module's own `lib/types.ts` (do not modify the proprietário module's types).
- Mock pedido uses a different name from the proprietário module (e.g. "Mariana Andrade") to visually signal a different person.
- Two extra mock-only fields inside the "Qual o motivo do acesso?" card, below the 5 motivo options:
  - "Período de acesso": two `type="date"` inputs side by side (Início / Término), no validation.
  - "Pode autorizar outras pessoas?": two buttons (Sim / Não), one highlighted based on local state, no real logic.
- Activation flow (unit dropdown → auto-activate → second phone with WhatsApp message) is identical to `/ativacao-proprietario`, reusing `BoardingPassScreen` unchanged.
- No rejection flow — positive path only, same as the current state of `/ativacao-proprietario`.
- No automated test suite exists in this repo — verify each task with `npx tsc --noEmit` and manual check via the running dev server (Playwright MCP).

---

## File Structure

- `app/autorizacao-familiar/lib/types.ts` — `Motivo` type (including "Familiar"), `MOTIVOS`, `UNIDADES`, `PEDIDO_MOCK` for this module.
- `app/autorizacao-familiar/components/screens/PainelOperadorScreen.tsx` — dark operator panel: pedido card, motivo row with "Familiar" highlighted, período/permissão fields, unidade dropdown.
- `app/autorizacao-familiar/page.tsx` — orchestrator: renders `PainelOperadorScreen` and, once a unit is picked, a second `PhoneShell` with `BoardingPassScreen` (imported from the `ativacao-proprietario` module).
- `app/page.tsx` — add new Hub card (modify).

---

### Task 1: Types and mock data

**Files:**
- Create: `app/autorizacao-familiar/lib/types.ts`

**Interfaces:**
- Produces: `Motivo` type (`"Proprietário" | "Equipe" | "Visitante" | "Prestador de Serviço" | "Colaborador" | "Familiar"`), `MOTIVOS: readonly Motivo[]`, `UNIDADES: readonly string[]`, `PEDIDO_MOCK: { nome: string; telefone: string; condominio: string }`.

- [ ] **Step 1: Write the types file**

```typescript
export type Motivo =
  | "Proprietário"
  | "Equipe"
  | "Visitante"
  | "Prestador de Serviço"
  | "Colaborador"
  | "Familiar";

export const MOTIVOS: readonly Motivo[] = [
  "Proprietário",
  "Equipe",
  "Visitante",
  "Prestador de Serviço",
  "Colaborador",
  "Familiar",
];

export const UNIDADES = ["101", "102", "103", "104"] as const;

export const PEDIDO_MOCK = {
  nome: "Mariana Andrade",
  telefone: "(11) 97777-6543",
  condominio: "Condomínio Exemplo — Bloco A",
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/autorizacao-familiar/lib/types.ts
git commit -m "feat: add types and mock data for autorizacao-familiar module"
```

---

### Task 2: PainelOperadorScreen component

**Files:**
- Create: `app/autorizacao-familiar/components/screens/PainelOperadorScreen.tsx`

**Interfaces:**
- Consumes: `Motivo`, `MOTIVOS`, `UNIDADES`, `PEDIDO_MOCK` from `../../lib/types` (Task 1).
- Produces: default export `PainelOperadorScreen({ onAtivar }: { onAtivar: (unidade: string) => void })` — dark panel showing the pedido card, the 6 motivo labels (Familiar pre-highlighted, others inert), the período (date range) fields, the "Pode autorizar outras pessoas?" Sim/Não toggle, and the unit dropdown that calls `onAtivar(unidade)` on selection.

- [ ] **Step 1: Write the component**

```typescript
import { useState } from "react";
import { MOTIVOS, PEDIDO_MOCK, UNIDADES, type Motivo } from "../../lib/types";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

const LINKS_MENU = ["Acessos", "Avaliação", "Cadastro"];

function Cabecalho() {
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-700 bg-black px-4 pb-3 pt-7">
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold tracking-tight text-white">
          Entrada Segura
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-[11px] font-bold text-indigo-300">
            ✓ Ativar
          </span>
          <span className="text-[11px] font-semibold text-neutral-400">Sair</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <span className="text-[11px] font-bold text-white">Home</span>
        {LINKS_MENU.map((link) => (
          <span key={link} className="text-[11px] font-semibold text-neutral-400">
            {link}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PainelOperadorScreen({
  onAtivar,
}: {
  onAtivar: (unidade: string) => void;
}) {
  const [unidadeAberta, setUnidadeAberta] = useState(false);
  const [podeAutorizar, setPodeAutorizar] = useState<"sim" | "nao">("nao");
  const motivoAtivo: Motivo = "Familiar";

  const motivoCor: Record<Motivo, string> = {
    Proprietário: "text-emerald-400",
    Equipe: "text-emerald-300",
    Visitante: "text-red-400",
    "Prestador de Serviço": "text-amber-400",
    Colaborador: "text-indigo-400",
    Familiar: "text-sky-400",
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-neutral-900 text-white">
      <Cabecalho />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="rounded-2xl bg-neutral-800 p-4 shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-bold text-white">{PEDIDO_MOCK.nome}</p>
              <p className="mt-1 text-sm text-neutral-400">
                Fone: {PEDIDO_MOCK.telefone}
              </p>
              <p className="mt-2 text-sm text-neutral-300">
                {PEDIDO_MOCK.condominio}
              </p>
            </div>
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
              {AVATAR}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-800 p-4 shadow">
          <p className="mb-3 text-center text-sm font-bold text-white">
            Qual o MOTIVO do acesso?
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {MOTIVOS.map((motivo) => (
              <span
                key={motivo}
                className={`text-sm font-bold ${motivoCor[motivo]} ${
                  motivo === motivoAtivo
                    ? "rounded-full border border-emerald-400 px-3 py-1"
                    : "px-3 py-1 opacity-60"
                }`}
              >
                {motivo}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-neutral-700 pt-4">
            <p className="mb-2 text-sm font-bold text-white">Período de acesso</p>
            <div className="flex gap-3">
              <label className="flex-1 text-xs text-neutral-400">
                Início
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-neutral-600 bg-neutral-700 px-2 py-2 text-sm text-white"
                />
              </label>
              <label className="flex-1 text-xs text-neutral-400">
                Término
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-neutral-600 bg-neutral-700 px-2 py-2 text-sm text-white"
                />
              </label>
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-700 pt-4">
            <p className="mb-2 text-sm font-bold text-white">
              Pode autorizar outras pessoas?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPodeAutorizar("sim")}
                className={`flex-1 rounded-xl border py-2 text-sm font-bold transition ${
                  podeAutorizar === "sim"
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                    : "border-neutral-600 bg-neutral-700 text-neutral-300"
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => setPodeAutorizar("nao")}
                className={`flex-1 rounded-xl border py-2 text-sm font-bold transition ${
                  podeAutorizar === "nao"
                    ? "border-red-400 bg-red-500/20 text-red-300"
                    : "border-neutral-600 bg-neutral-700 text-neutral-300"
                }`}
              >
                Não
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-800 p-4 shadow">
          <p className="mb-3 text-center text-sm font-bold text-white">
            Qual a Unidade?
          </p>

          <button
            onClick={() => setUnidadeAberta((aberta) => !aberta)}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-600 bg-neutral-700 px-4 py-3 text-left text-base font-bold text-white"
          >
            Selecione...
            <span className={`transition ${unidadeAberta ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>

          {unidadeAberta && (
            <div className="mt-2 flex flex-col gap-2">
              {UNIDADES.map((unidade) => (
                <button
                  key={unidade}
                  onClick={() => {
                    setUnidadeAberta(false);
                    onAtivar(unidade);
                  }}
                  className="w-full rounded-xl border border-neutral-600 bg-neutral-700 py-3 text-center text-base font-bold text-white transition hover:border-emerald-400 hover:bg-neutral-600 active:scale-[0.98]"
                >
                  {unidade}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/autorizacao-familiar/components/screens/PainelOperadorScreen.tsx
git commit -m "feat: add PainelOperadorScreen for autorizacao-familiar module"
```

---

### Task 3: Orchestrator page

**Files:**
- Create: `app/autorizacao-familiar/page.tsx`

**Interfaces:**
- Consumes: `PainelOperadorScreen` (Task 2, prop `onAtivar`), `PhoneShell` from `../facial/components/PhoneShell` (existing), `BoardingPassScreen` from `../ativacao-proprietario/components/screens/BoardingPassScreen` (existing, no props).
- Produces: default export `AutorizacaoFamiliarApp` — the page component mounted at `/autorizacao-familiar`.

- [ ] **Step 1: Write the page**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneShell from "../facial/components/PhoneShell";
import BoardingPassScreen from "../ativacao-proprietario/components/screens/BoardingPassScreen";
import PainelOperadorScreen from "./components/screens/PainelOperadorScreen";

export default function AutorizacaoFamiliarApp() {
  const [unidadeAtivada, setUnidadeAtivada] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center gap-6 bg-slate-200 p-4">
      <PhoneShell>
        <PainelOperadorScreen onAtivar={setUnidadeAtivada} />
      </PhoneShell>

      {unidadeAtivada && (
        <PhoneShell>
          <BoardingPassScreen />
        </PhoneShell>
      )}

      <div className="fixed left-4 top-4 flex flex-wrap gap-2">
        <Link
          href="/"
          className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-700 shadow"
        >
          ← Hub
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

With the dev server running (`npm run dev` if not already up), navigate to `/autorizacao-familiar` in the browser (Playwright MCP: `browser_navigate` then `browser_take_screenshot`).
Expected:
- Panel shows "Mariana Andrade", the 6 motivo labels with "Familiar" outlined, the Início/Término date inputs, the Sim/Não toggle (Não highlighted by default), and the closed "Selecione..." unit dropdown.
- Clicking the dropdown opens the unit list; clicking a unit closes the dropdown and reveals a second phone showing the WhatsApp "Autorização concedida 🤩" message with Suporte/Login/Senha/Sistema.
- "← Hub" link navigates back to `/`.

- [ ] **Step 4: Commit**

```bash
git add app/autorizacao-familiar/page.tsx
git commit -m "feat: add autorizacao-familiar orchestrator page"
```

---

### Task 4: Hub card

**Files:**
- Modify: `app/page.tsx` (the `cards` array and icon import)

**Interfaces:**
- Consumes: nothing new — adds an entry to the existing `cards` array literal.

- [ ] **Step 1: Add the new card entry**

In `app/page.tsx`, add `UserPlus` to the existing `lucide-react` import:

```typescript
import { ScanFace, UserCheck, UserPlus } from "lucide-react";
```

Add a new object to the `cards` array after the `ativacao-proprietario` entry:

```typescript
    {
      id: "autorizacao-familiar",
      title: "Autorização via Check-in",
      description: "Painel do operador ativando um familiar para uma unidade.",
      icon: UserPlus,
      textColor: "text-sky-600",
      bgLight: "bg-sky-50",
      path: "/autorizacao-familiar",
    },
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Navigate to `/` in the browser.
Expected: Hub shows three cards, the third being "Autorização via Check-in". Clicking it navigates to `/autorizacao-familiar`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add Hub card for Autorização via Check-in"
```

---

## Self-Review Notes

- **Spec coverage:** route/Hub card (Task 4), same visual structure reused (Cabecalho, pedido card+avatar, motivo row, unit dropdown — Task 2), Familiar pre-highlighted with new mock name (Task 1/2), período fields and Sim/Não toggle as mock-only additions (Task 2), activation flow reusing `BoardingPassScreen` unchanged (Task 3), no rejection flow (Tasks 2-3 have no reject button/handler) — all covered.
- **Placeholder scan:** none found; all steps have full code.
- **Type consistency:** `Motivo` (including `"Familiar"`), `MOTIVOS`, `UNIDADES`, `PEDIDO_MOCK` defined once in Task 1 and referenced identically in Task 2; `onAtivar(unidade: string)` signature matches between Task 2's component and Task 3's usage; `BoardingPassScreen` imported with no props, matching its existing signature in `app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx`.
