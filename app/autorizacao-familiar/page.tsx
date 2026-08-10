"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneShell from "../facial/components/PhoneShell";
import BoardingPassScreen from "../ativacao-proprietario/components/screens/BoardingPassScreen";
import SucessoAtivacaoScreen from "../ativacao-proprietario/components/screens/SucessoAtivacaoScreen";
import PainelOperadorScreen from "./components/screens/PainelOperadorScreen";
import { PEDIDO_MOCK } from "./lib/types";

export default function AutorizacaoFamiliarApp() {
  const [unidadeAtivada, setUnidadeAtivada] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center gap-6 bg-slate-200 p-4">
      <PhoneShell>
        {unidadeAtivada ? (
          <SucessoAtivacaoScreen onReiniciar={() => setUnidadeAtivada(null)} />
        ) : (
          <PainelOperadorScreen onAtivar={setUnidadeAtivada} />
        )}
      </PhoneShell>

      {unidadeAtivada && (
        <PhoneShell>
          <BoardingPassScreen
            nome={PEDIDO_MOCK.nome}
            mensagem={
              "Autorização de acesso concedida! ✅\n\n" +
              "Acesso liberado por RECONHECIMENTO FACIAL\n" +
              "📍 Local: Exemplo\n" +
              "🔓 Autorizador: Exemplo\n" +
              "🏠 Unidade: Exemplo\n" +
              "⏳ Validade: 17/07/2026 à 19/07/2026\n\n" +
              "Boa visita!"
            }
          />
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
