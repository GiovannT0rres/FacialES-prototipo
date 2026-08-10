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
    </GradientScreen>
  );
}
