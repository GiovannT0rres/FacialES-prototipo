"use client";

import { useState } from "react";

export default function DestinoScreen({
  titulo,
  opcoes,
  onAvancar,
}: {
  titulo: string;
  opcoes: readonly string[];
  onAvancar: (valor: string) => void;
}) {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-white via-teal-50 to-teal-200 px-5 pt-14 pb-8">
      <div className="rounded-2xl bg-gradient-to-r from-lime-400 to-green-600 px-6 py-4 text-center text-xl font-bold text-white shadow">
        {titulo}
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto rounded-2xl bg-white p-4 shadow">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => setSelecionado(opcao)}
            className={`w-full rounded-xl border py-4 text-center text-lg font-bold transition ${
              selecionado === opcao
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-neutral-200 bg-neutral-100 text-neutral-800"
            }`}
          >
            {opcao.length <= 2 ? `BLOCO ${opcao}` : opcao}
          </button>
        ))}

        <button
          disabled={!selecionado}
          onClick={() => selecionado && onAvancar(selecionado)}
          className={`mt-2 w-full rounded-2xl py-4 text-center text-lg font-bold shadow-md transition active:scale-[0.98] ${
            selecionado
              ? "bg-white text-neutral-900 border border-neutral-300"
              : "cursor-not-allowed bg-neutral-100 text-neutral-400"
          }`}
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
