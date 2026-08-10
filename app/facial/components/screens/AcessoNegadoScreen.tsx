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
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-red-600 text-6xl text-white shadow-lg">
          ✕
        </div>
        <h1 className="text-2xl font-extrabold text-neutral-900">
          Acesso Negado
        </h1>
        <p className="text-neutral-800">
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
