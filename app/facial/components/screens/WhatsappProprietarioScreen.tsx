"use client";

import { useEffect, useState } from "react";

type Etapa = "digitando-1" | "aviso" | "digitando-2" | "foto" | "decisao" | "respondido";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

const AVATAR_FOTO = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#d4a574" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#d4a574" />
    </svg>
  </div>
);

function horaAtual() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function Digitando() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
    </div>
  );
}

export default function WhatsappProprietarioScreen({
  onAutorizar,
  onNegar,
}: {
  onAutorizar: () => void;
  onNegar: () => void;
}) {
  const [etapa, setEtapa] = useState<Etapa>("digitando-1");
  const hora = horaAtual();

  useEffect(() => {
    const sequencia: { etapa: Etapa; delay: number }[] = [
      { etapa: "aviso", delay: 900 },
      { etapa: "digitando-2", delay: 700 },
      { etapa: "foto", delay: 900 },
      { etapa: "decisao", delay: 500 },
    ];

    const ordem: Etapa[] = [
      "digitando-1",
      "aviso",
      "digitando-2",
      "foto",
      "decisao",
    ];
    const indiceAtual = ordem.indexOf(etapa);
    if (indiceAtual === -1 || indiceAtual === ordem.length - 1) return;

    const proxima = ordem[indiceAtual + 1];
    const delay = sequencia.find((s) => s.etapa === proxima)?.delay ?? 800;
    const t = setTimeout(() => setEtapa(proxima), delay);
    return () => clearTimeout(t);
  }, [etapa]);

  function decidir(fn: () => void) {
    setEtapa("respondido");
    fn();
  }

  const mostrarAviso = etapa !== "digitando-1";
  const mostrarDigitando2 = etapa === "digitando-2";
  const mostrarFoto =
    etapa === "foto" || etapa === "decisao" || etapa === "respondido";
  const mostrarBotoes = etapa === "decisao";
  const mostrarResposta = etapa === "respondido";

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow">
        <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Proprietário</span>
          <span className="text-xs text-emerald-100">
            {etapa === "digitando-1" || mostrarDigitando2
              ? "digitando..."
              : "online"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        {etapa === "digitando-1" && (
          <div className="flex justify-start">
            <Digitando />
          </div>
        )}

        {mostrarAviso && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow">
              <p className="text-sm text-neutral-800">
                🔔 Alguém está na porta e solicita acesso.
              </p>
              <span className="mt-1 block text-right text-[10px] text-neutral-400">
                {hora}
              </span>
            </div>
          </div>
        )}

        {mostrarDigitando2 && (
          <div className="flex justify-start">
            <Digitando />
          </div>
        )}

        {mostrarFoto && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-1.5 shadow">
              <div className="aspect-square w-44 overflow-hidden rounded">
                {AVATAR_FOTO}
              </div>
              <p className="px-1 pt-1.5 text-sm text-neutral-800">
                Autorizar a entrada desta pessoa?
              </p>
              <span className="block px-1 pb-0.5 text-right text-[10px] text-neutral-400">
                {hora}
              </span>
            </div>
          </div>
        )}

        {mostrarBotoes && (
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => decidir(onAutorizar)}
              className="w-full rounded-full bg-emerald-500 py-3 text-sm font-bold text-white shadow active:scale-[0.98]"
            >
              Autorizar
            </button>
            <button
              onClick={() => decidir(onNegar)}
              className="w-full rounded-full bg-red-500 py-3 text-sm font-bold text-white shadow active:scale-[0.98]"
            >
              Não Autorizar
            </button>
          </div>
        )}

        {mostrarResposta && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 shadow">
              <p className="text-sm font-semibold text-neutral-800">
                Resposta enviada
              </p>
              <span className="mt-1 block text-right text-[10px] text-neutral-500">
                {hora} ✓✓
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
