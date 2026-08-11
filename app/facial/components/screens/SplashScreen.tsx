import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function SplashScreen({
  onQueroEntrar,
}: {
  onQueroEntrar: () => void;
}) {
  return (
    <GradientScreen>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <PrimaryButton onClick={onQueroEntrar}>Quero Entrar</PrimaryButton>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-colorido.png"
        alt="Entrada Segura — Cadastrou. Autorizou. Protegeu."
        className="mx-auto w-48"
      />
    </GradientScreen>
  );
}
