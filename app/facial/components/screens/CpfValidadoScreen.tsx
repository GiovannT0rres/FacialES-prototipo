"use client";

import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function CpfValidadoScreen({
  onAvancar,
}: {
  onAvancar: () => void;
}) {
  return (
    <GradientScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-sm">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5l5.5 5.5L20 7"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-neutral-900">CPF Validado!</h1>
        <p className="text-neutral-700">
          Agora, para sua segurança, faremos uma pergunta para confirmar sua
          identidade.
        </p>
      </div>

      <PrimaryButton onClick={onAvancar}>Avançar</PrimaryButton>
    </GradientScreen>
  );
}
