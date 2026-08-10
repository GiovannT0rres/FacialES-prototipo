import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function CrieContaScreen({ onAvancar }: { onAvancar: () => void }) {
  return (
    <GradientScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-sm">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <rect x="45" y="20" width="50" height="100" rx="2" fill="url(#g1)" />
            {[0, 1, 2, 3].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={52 + col * 20}
                  y={35 + row * 20}
                  width="14"
                  height="14"
                  rx="2"
                  fill="white"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
              ))
            )}
            <defs>
              <linearGradient id="g1" x1="45" y1="20" x2="95" y2="120">
                <stop stopColor="#0ea5e9" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-extrabold text-neutral-900">
            Crie Sua Conta Para Continuar.
          </h1>
          <p className="text-neutral-700">
            Para acessar esta área, você precisa estar registrado. Vamos
            criar sua conta em alguns passos simples?
          </p>
        </div>
      </div>

      <PrimaryButton onClick={onAvancar}>Avançar</PrimaryButton>
    </GradientScreen>
  );
}
