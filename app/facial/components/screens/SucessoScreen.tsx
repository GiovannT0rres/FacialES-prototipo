"use client";

import { useEffect, useState } from "react";
import GradientScreen from "../GradientScreen";

const CHECK_ICON = (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-white">
    ✓
  </div>
);

export default function SucessoScreen({
  itens,
  onConcluido,
}: {
  itens: string[];
  onConcluido: () => void;
}) {
  const [visiveis, setVisiveis] = useState(1);
  const [portaAberta, setPortaAberta] = useState(false);

  useEffect(() => {
    if (visiveis < itens.length) {
      const t = setTimeout(() => setVisiveis((v) => v + 1), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPortaAberta(true), 700);
    return () => clearTimeout(t);
  }, [visiveis, itens.length]);

  useEffect(() => {
    if (!portaAberta) return;
    const t = setTimeout(onConcluido, 1800);
    return () => clearTimeout(t);
  }, [portaAberta, onConcluido]);

  return (
    <div
      onClick={portaAberta ? onConcluido : undefined}
      className="h-full w-full"
    >
      <GradientScreen>
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <div className="w-full rounded-3xl border border-[#16C784]/40 bg-[#16C784]/10 px-6 py-8">
            <div className="flex flex-col gap-4">
              {itens.slice(0, visiveis).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  {CHECK_ICON}
                  <span className="text-lg font-bold text-white">{item} ...</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#16C784] shadow-[0_0_40px_-8px_rgba(22,199,132,0.8)]">
            {portaAberta ? (
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <rect x="10" y="6" width="26" height="44" rx="1" fill="#7c2d12" />
                <path d="M36 6 L46 12 V44 L36 50 Z" fill="#9a3412" />
                <circle cx="41" cy="28" r="2" fill="#facc15" />
              </svg>
            ) : (
              <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-white/40 border-t-white" />
            )}
            {portaAberta && (
              <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-white shadow">
                ✓
              </div>
            )}
          </div>

          {portaAberta && (
            <p className="text-xl font-extrabold uppercase tracking-wide text-white drop-shadow">
              Porta Aberta
            </p>
          )}
        </div>
      </GradientScreen>
    </div>
  );
}
