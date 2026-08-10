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
