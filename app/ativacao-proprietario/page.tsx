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
