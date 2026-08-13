import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function AcessoNegadoScreen({
  onReiniciar,
}: {
  onReiniciar: () => void;
}) {
  return (
    <GradientScreen tone="red">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white/30 bg-[#FF3B4E] text-6xl text-white shadow-[0_0_40px_-8px_rgba(255,59,78,0.7)]">
          ✕
        </div>
        <h1 className="text-2xl font-extrabold text-white">
          Acesso Negado
        </h1>
        <p className="text-white/80">
          Não foi possível validar o usuário. Procure a administração do
          condomínio.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <PrimaryButton onClick={onReiniciar}>Voltar ao início</PrimaryButton>
      </div>
    </GradientScreen>
  );
}
