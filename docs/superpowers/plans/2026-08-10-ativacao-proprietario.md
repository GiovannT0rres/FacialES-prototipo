# Ativação de Proprietário na plataforma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new prototype module at `/ativacao-proprietario` simulating an operator activating a proprietário for a unit in the "Entrada Segura" admin system, plus a Hub card linking to it.

**Architecture:** New `app/ativacao-proprietario/` directory mirroring the structure of `app/facial/` (`page.tsx` orchestrator + `lib/types.ts` + `components/screens/*.tsx`). Two scenarios ("Ativar" / "Rejeitar") toggled by buttons at the top, same pattern as `/facial`'s `CENARIOS`. Reuses `PhoneShell` for the phone frame. Dark-themed operator panel screen (new), reusing the WhatsApp chat visual pattern from `app/facial/components/screens/WhatsappProprietarioScreen.tsx` for the boarding-pass message.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS. No test runner in this repo — verification is `npx tsc --noEmit` plus manual browser check via dev server.

## Global Constraints

- Route: `/ativacao-proprietario`.
- Hub card title (exact copy): "Ativação de Proprietário na plataforma".
- Dark theme for the operator panel (distinct from `/facial`'s light theme), consistent with the reference screenshots (dark background, rounded cards, colored motive labels).
- "Qual o motivo do acesso?" shows all 5 options (Proprietário, Equipe, Visitante, Prestador de Serviço, Colaborador); only "Proprietário" is pre-highlighted and functional — the other 4 are inert visual-only buttons.
- Unit selection is single-tap-to-activate (no separate confirm button), same UX convention as `DestinoScreen` in `/facial`.
- "Ativar" scenario: selecting a unit immediately triggers activation and reveals a second `PhoneShell` with a WhatsApp-style message containing a text-only boarding pass card (nome, unidade, condomínio, status "Acesso Liberado" — no QR code).
- "Rejeitar" scenario: clicking "Rejeitar" resets instantly to the initial panel state — no confirmation screen, no second phone.
- No automated test suite exists in this repo — verify each task with `npx tsc --noEmit` and manual check via `npm run dev` in the browser.

---

## File Structure

- `app/ativacao-proprietario/lib/types.ts` — scenario/screen types, mock data (pedido fictício, unidades, motivos).
- `app/ativacao-proprietario/components/screens/PainelOperadorScreen.tsx` — dark operator panel: pedido card, motivo row, unidade list. Handles both scenarios via props (mode "ativar" | "rejeitar" isn't needed inside — parent decides what happens on unit click vs. reject click, this component just exposes the interactions).
- `app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx` — WhatsApp-style second phone showing the boarding pass message.
- `app/ativacao-proprietario/page.tsx` — orchestrator: scenario selector buttons, state machine (`idle` → `ativado` for the Ativar scenario; `idle` only, resetting on reject, for the Rejeitar scenario), renders one or two `PhoneShell`s.
- `app/page.tsx` — add new Hub card (modify).

---

### Task 1: Types and mock data

**Files:**
- Create: `app/ativacao-proprietario/lib/types.ts`

**Interfaces:**
- Produces: `Cenario` (`"ativar" | "rejeitar"`), `Motivo` type (string union of the 5 labels), `PEDIDO_MOCK` object (`{ nome: string; telefone: string; condominio: string }`), `UNIDADES: readonly string[]`, `MOTIVOS: readonly Motivo[]`, `CENARIO_LABEL: Record<Cenario, string>`.

- [ ] **Step 1: Write the types file**

```typescript
export type Cenario = "ativar" | "rejeitar";

export type Motivo =
  | "Proprietário"
  | "Equipe"
  | "Visitante"
  | "Prestador de Serviço"
  | "Colaborador";

export const CENARIO_LABEL: Record<Cenario, string> = {
  ativar: "Ativar",
  rejeitar: "Rejeitar",
};

export const MOTIVOS: readonly Motivo[] = [
  "Proprietário",
  "Equipe",
  "Visitante",
  "Prestador de Serviço",
  "Colaborador",
];

export const UNIDADES = ["101", "102", "103", "104"] as const;

export const PEDIDO_MOCK = {
  nome: "Carlos Andrade",
  telefone: "(11) 98888-4321",
  condominio: "Condomínio Monterrey — Bloco A",
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (this file has no consumers yet, so it just needs to parse/type-check cleanly on its own).

- [ ] **Step 3: Commit**

```bash
git add app/ativacao-proprietario/lib/types.ts
git commit -m "feat: add types and mock data for ativacao-proprietario module"
```

---

### Task 2: PainelOperadorScreen component

**Files:**
- Create: `app/ativacao-proprietario/components/screens/PainelOperadorScreen.tsx`

**Interfaces:**
- Consumes: `Motivo`, `MOTIVOS`, `UNIDADES`, `PEDIDO_MOCK` from `../../lib/types` (Task 1).
- Produces: default export `PainelOperadorScreen({ onAtivar, onRejeitar }: { onAtivar: (unidade: string) => void; onRejeitar: () => void })` — a dark-themed screen showing the pedido card, the 5 motivo buttons (Proprietário pre-highlighted, others inert `onClick={undefined}`), and a list of unit buttons that call `onAtivar(unidade)` on click. A "Rejeitar" text button calls `onRejeitar()`.

- [ ] **Step 1: Write the component**

```typescript
import { MOTIVOS, PEDIDO_MOCK, UNIDADES, type Motivo } from "../../lib/types";

export default function PainelOperadorScreen({
  onAtivar,
  onRejeitar,
}: {
  onAtivar: (unidade: string) => void;
  onRejeitar: () => void;
}) {
  const motivoAtivo: Motivo = "Proprietário";

  const motivoCor: Record<Motivo, string> = {
    Proprietário: "text-emerald-400",
    Equipe: "text-emerald-300",
    Visitante: "text-red-400",
    "Prestador de Serviço": "text-amber-400",
    Colaborador: "text-indigo-400",
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-neutral-900 p-5 text-white">
      <div className="rounded-2xl bg-neutral-800 p-4 shadow">
        <p className="text-base font-bold text-white">{PEDIDO_MOCK.nome}</p>
        <p className="mt-1 text-sm text-neutral-400">
          Fone: {PEDIDO_MOCK.telefone}
        </p>
        <p className="mt-2 text-sm text-neutral-300">{PEDIDO_MOCK.condominio}</p>

        <button
          onClick={onRejeitar}
          className="mt-4 text-sm font-bold text-red-400 active:opacity-70"
        >
          Rejeitar
        </button>
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
      </div>

      <div className="rounded-2xl bg-neutral-800 p-4 shadow">
        <p className="mb-3 text-center text-sm font-bold text-white">
          Qual a Unidade?
        </p>
        <div className="flex flex-col gap-2">
          {UNIDADES.map((unidade) => (
            <button
              key={unidade}
              onClick={() => onAtivar(unidade)}
              className="w-full rounded-xl border border-neutral-600 bg-neutral-700 py-3 text-center text-base font-bold text-white transition hover:border-emerald-400 hover:bg-neutral-600 active:scale-[0.98]"
            >
              {unidade}
            </button>
          ))}
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
git add app/ativacao-proprietario/components/screens/PainelOperadorScreen.tsx
git commit -m "feat: add PainelOperadorScreen for ativacao-proprietario module"
```

---

### Task 3: BoardingPassScreen component

**Files:**
- Create: `app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx`

**Interfaces:**
- Consumes: `PEDIDO_MOCK` from `../../lib/types` (Task 1).
- Produces: default export `BoardingPassScreen({ unidade }: { unidade: string })` — a WhatsApp-style single-phone screen (reusing the header/bubble visual language of `app/facial/components/screens/WhatsappProprietarioScreen.tsx`) showing one received message bubble containing the boarding pass card (nome, unidade, condomínio, status "Acesso Liberado").

- [ ] **Step 1: Write the component**

```typescript
import { PEDIDO_MOCK } from "../../lib/types";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

function horaAtual() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function BoardingPassScreen({ unidade }: { unidade: string }) {
  const hora = horaAtual();

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow">
        <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{PEDIDO_MOCK.nome}</span>
          <span className="text-xs text-emerald-100">online</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-3 shadow">
            <p className="text-sm text-neutral-800">
              ✅ Seu acesso foi liberado! Aqui está o seu passe:
            </p>

            <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Acesso Liberado
              </p>
              <p className="mt-1 text-base font-bold text-neutral-900">
                {PEDIDO_MOCK.nome}
              </p>
              <p className="text-sm text-neutral-700">Unidade {unidade}</p>
              <p className="text-sm text-neutral-700">{PEDIDO_MOCK.condominio}</p>
            </div>

            <span className="mt-2 block text-right text-[10px] text-neutral-400">
              {hora}
            </span>
          </div>
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
git add app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx
git commit -m "feat: add BoardingPassScreen for ativacao-proprietario module"
```

---

### Task 4: Orchestrator page

**Files:**
- Create: `app/ativacao-proprietario/page.tsx`

**Interfaces:**
- Consumes: `PainelOperadorScreen` (Task 2, props `onAtivar`/`onRejeitar`), `BoardingPassScreen` (Task 3, prop `unidade`), `Cenario`/`CENARIO_LABEL` from `./lib/types` (Task 1), `PhoneShell` from `../facial/components/PhoneShell` (existing).
- Produces: default export `AtivacaoProprietarioApp` — the page component mounted at `/ativacao-proprietario`.

- [ ] **Step 1: Write the page**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneShell from "../facial/components/PhoneShell";
import PainelOperadorScreen from "./components/screens/PainelOperadorScreen";
import BoardingPassScreen from "./components/screens/BoardingPassScreen";
import { CENARIO_LABEL, type Cenario } from "./lib/types";

const CENARIOS: Cenario[] = ["ativar", "rejeitar"];

export default function AtivacaoProprietarioApp() {
  const [cenario, setCenario] = useState<Cenario>(CENARIOS[0]);
  const [unidadeAtivada, setUnidadeAtivada] = useState<string | null>(null);

  function iniciarCenario(novoCenario: Cenario) {
    setCenario(novoCenario);
    setUnidadeAtivada(null);
  }

  function reiniciar() {
    setUnidadeAtivada(null);
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center gap-6 bg-slate-200 p-4">
      <PhoneShell>
        <PainelOperadorScreen
          onAtivar={(unidade) => {
            if (cenario === "ativar") {
              setUnidadeAtivada(unidade);
            }
          }}
          onRejeitar={reiniciar}
        />
      </PhoneShell>

      {cenario === "ativar" && unidadeAtivada && (
        <PhoneShell>
          <BoardingPassScreen unidade={unidadeAtivada} />
        </PhoneShell>
      )}

      <div className="fixed left-4 top-4 flex flex-wrap gap-2">
        <Link
          href="/"
          className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-700 shadow"
        >
          ← Hub
        </Link>
        {CENARIOS.map((c) => (
          <button
            key={c}
            onClick={() => iniciarCenario(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow transition ${
              cenario === c
                ? "bg-blue-600 text-white"
                : "bg-white/90 text-neutral-700"
            }`}
          >
            {CENARIO_LABEL[c]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev` (if not already running), then in the browser open `/ativacao-proprietario`.
Expected:
- "Ativar" scenario (default): panel shows pedido card, 5 motivos with "Proprietário" outlined, unit list. Clicking a unit shows the second phone with the boarding pass message displaying that unit's number.
- Switching to "Rejeitar" scenario resets the second phone away. Clicking "Rejeitar" in the panel keeps you on the panel (no second phone ever appears in this scenario).
- "← Hub" link navigates back to `/`.

- [ ] **Step 4: Commit**

```bash
git add app/ativacao-proprietario/page.tsx
git commit -m "feat: add ativacao-proprietario orchestrator page"
```

---

### Task 5: Hub card

**Files:**
- Modify: `app/page.tsx:13-24` (the `cards` array)

**Interfaces:**
- Consumes: nothing new — adds an entry to the existing `cards` array literal.

- [ ] **Step 1: Add the new card entry**

In `app/page.tsx`, import an additional icon from `lucide-react` (e.g. `UserCheck`) alongside the existing `ScanFace` import, then add a new object to the `cards` array after the `facial` entry:

```typescript
import { ScanFace, UserCheck } from "lucide-react";
```

```typescript
    {
      id: "ativacao-proprietario",
      title: "Ativação de Proprietário na plataforma",
      description: "Painel do operador ativando um proprietário para uma unidade.",
      icon: UserCheck,
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      path: "/ativacao-proprietario",
    },
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `/`.
Expected: Hub shows two cards — "Liberação de Visitante na Portaria" and "Ativação de Proprietário na plataforma". Clicking the new card navigates to `/ativacao-proprietario`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add Hub card for Ativação de Proprietário na plataforma"
```

---

## Self-Review Notes

- **Spec coverage:** route/Hub card (Task 5), dark operator panel with pedido card + 5 motivos + pre-highlighted Proprietário (Task 2), unit list with tap-to-activate (Task 2/4), auto-activation revealing second phone with boarding pass (Task 4/3), Rejeitar resets instantly with no second phone (Task 4), reuse of `PhoneShell` and WhatsApp visual language (Tasks 2-4) — all covered.
- **Placeholder scan:** none found; all steps have full code.
- **Type consistency:** `Cenario`, `CENARIO_LABEL`, `Motivo`, `MOTIVOS`, `UNIDADES`, `PEDIDO_MOCK` defined once in Task 1 and referenced identically in Tasks 2-4; `onAtivar(unidade: string)` / `onRejeitar()` signatures match between Task 2's component and Task 4's usage; `BoardingPassScreen({ unidade })` matches Task 4's usage.
