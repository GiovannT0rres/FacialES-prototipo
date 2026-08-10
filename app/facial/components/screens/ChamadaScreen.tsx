"use client";

import { useEffect, useState } from "react";

export default function ChamadaScreen({ onEncerrar }: { onEncerrar: () => void }) {
  const [segundos, setSegundos] = useState(0);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setSegundos((s) => s + 1), 1000);
    const autorizaTimer = setTimeout(() => setAutorizado(true), 2500);
    const fimTimer = setTimeout(onEncerrar, 4500);
    return () => {
      clearInterval(interval);
      clearTimeout(autorizaTimer);
      clearTimeout(fimTimer);
    };
  }, [onEncerrar]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");

  return (
    <div className="flex h-full w-full flex-col justify-between bg-slate-600 px-5 pt-14 pb-8 text-white">
      <div className="flex items-center justify-between text-sm">
        <span className="rounded-full bg-green-500 px-3 py-1 font-semibold">
          {mm}:{ss}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-200">
          🔒 Protegida com a criptografia de ponta a ponta
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">Proprietário</h1>

        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-800 shadow-inner">
          <div className="flex flex-col items-center gap-1">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 12h13M10 6l6 6-6 6"
                stroke="#2dd4bf"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-bold tracking-wide text-white">
              Entrada
              <br />
              Segura
            </span>
          </div>
        </div>

        {autorizado && (
          <p className="rounded-full bg-white px-6 py-2 text-lg font-semibold text-neutral-800 shadow">
            Autorizado por voz
          </p>
        )}
      </div>

      <div className="flex items-center justify-around rounded-t-3xl bg-slate-700 px-6 py-5">
        <CallIcon>🔊</CallIcon>
        <CallIcon>🎥</CallIcon>
        <CallIcon>🔇</CallIcon>
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl shadow">
          📞
        </button>
      </div>
    </div>
  );
}

function CallIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500/60 text-lg">
      {children}
    </div>
  );
}
