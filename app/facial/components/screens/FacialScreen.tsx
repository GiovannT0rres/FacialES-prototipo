"use client";

import { useEffect, useState } from "react";

type FacialStep = "inicial" | "posicionando" | "sorria" | "analisando" | "concluido";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900">
    <svg width="140" height="140" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#d4a574" />
      <path
        d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
        fill="#d4a574"
      />
    </svg>
  </div>
);

export default function FacialScreen({ onConcluido }: { onConcluido: () => void }) {
  const [step, setStep] = useState<FacialStep>("inicial");

  useEffect(() => {
    if (step === "inicial") return;

    const sequence: { next: FacialStep; delay: number }[] = [
      { next: "sorria", delay: 1200 },
      { next: "analisando", delay: 1400 },
      { next: "concluido", delay: 1600 },
    ];

    const order: FacialStep[] = ["posicionando", "sorria", "analisando", "concluido"];
    const currentIndex = order.indexOf(step);
    if (currentIndex === -1 || currentIndex === order.length - 1) {
      if (step === "concluido") {
        const t = setTimeout(onConcluido, 1200);
        return () => clearTimeout(t);
      }
      return;
    }

    const nextStep = order[currentIndex + 1];
    const delay = sequence.find((s) => s.next === nextStep)?.delay ?? 1200;
    const t = setTimeout(() => setStep(nextStep), delay);
    return () => clearTimeout(t);
  }, [step, onConcluido]);

  if (step === "inicial") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 bg-neutral-200 px-6">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <path d="M20 60V40a20 20 0 0 1 20-20h20" stroke="#111" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M200 60V40a20 20 0 0 0-20-20h-20" stroke="#111" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M20 160v20a20 20 0 0 0 20 20h20" stroke="#111" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M200 160v20a20 20 0 0 1-20 20h-20" stroke="#111" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="110" cy="95" r="35" fill="#111" />
          <path d="M60 175c0-30 22-50 50-50s50 20 50 50" fill="#111" />
        </svg>

        <div className="flex flex-col items-center gap-6">
          <p className="text-xl font-bold text-neutral-700">Verificação Facial</p>
          <button
            onClick={() => setStep("posicionando")}
            className="w-full rounded-2xl bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-md active:scale-[0.98]"
          >
            Iniciar Verificação
          </button>
        </div>
      </div>
    );
  }

  const overlayColor = step === "posicionando" ? "border-white" : "border-green-500";

  const labels: Record<FacialStep, string> = {
    inicial: "",
    posicionando: "Posicione seu rosto...",
    sorria: "Ótimo! Agora, sorria levemente.",
    analisando: "Analisando...",
    concluido: "Verificação Concluída!",
  };

  return (
    <div className="relative h-full w-full">
      {AVATAR}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`h-[340px] w-[260px] rounded-[50%] border-4 transition-colors duration-500 ${overlayColor}`}
        />
      </div>
      <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-4 px-6">
        <p className="text-center text-lg font-bold text-white drop-shadow">
          {labels[step]}
        </p>
        {step === "analisando" && (
          <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-neutral-300 border-t-neutral-700 bg-white" />
        )}
        {step === "concluido" && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-600">
            ✓
          </div>
        )}
      </div>
    </div>
  );
}
