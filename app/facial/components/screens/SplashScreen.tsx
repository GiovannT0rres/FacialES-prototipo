import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function SplashScreen({
  label,
  onQueroEntrar,
}: {
  label: "Registro" | "Login";
  onQueroEntrar: () => void;
}) {
  return (
    <GradientScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M2 12h20M2 20h24M2 28h16"
              stroke="#14b8a6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Entrada Segura
          </span>
        </div>
        <p className="text-sm font-medium tracking-wide text-neutral-600">
          Cadastrou. Autorizou. Protegeu.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={onQueroEntrar}>Quero Entrar</PrimaryButton>
        <p className="text-left text-lg font-bold text-neutral-900">{label}</p>
      </div>
    </GradientScreen>
  );
}
