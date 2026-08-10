"use client";

import { useEffect, useState } from "react";

type FacialStep = "posicionando" | "sorria" | "analisando" | "concluido";

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
  const [step, setStep] = useState<FacialStep>("posicionando");

  useEffect(() => {
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

  const overlayColor = step === "posicionando" ? "border-white" : "border-green-500";

  const labels: Record<FacialStep, string> = {
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
