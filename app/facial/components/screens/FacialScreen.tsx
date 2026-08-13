"use client";

import { useEffect, useState } from "react";

type FacialStep = "posicionando" | "sorria" | "analisando" | "concluido";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-700 to-neutral-900">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://i.pravatar.cc/500?img=12"
      alt="Rosto sendo verificado"
      className="h-full w-full object-cover"
    />
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

  const overlayColor = step === "posicionando" ? "border-white" : "border-[#16C784]";

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
        <div className="relative h-[340px] w-[260px]">
          <div
            className={`h-full w-full rounded-[50%] border-4 opacity-40 transition-colors duration-500 ${overlayColor}`}
          />
          {(["top-4 left-0", "top-4 right-0", "bottom-4 left-0", "bottom-4 right-0"] as const).map(
            (pos, i) => (
              <div
                key={pos}
                className={`absolute h-9 w-9 ${pos} ${
                  i === 0
                    ? "border-l-4 border-t-4 rounded-tl-xl"
                    : i === 1
                      ? "border-r-4 border-t-4 rounded-tr-xl"
                      : i === 2
                        ? "border-l-4 border-b-4 rounded-bl-xl"
                        : "border-r-4 border-b-4 rounded-br-xl"
                } transition-colors duration-500 ${overlayColor}`}
              />
            )
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-4 px-6">
        <p
          className="text-center text-lg font-bold text-white"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {labels[step]}
        </p>
        {step === "analisando" && (
          <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-neutral-300 border-t-neutral-700 bg-white" />
        )}
        {step === "concluido" && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#16C784]">
            ✓
          </div>
        )}
      </div>
    </div>
  );
}
