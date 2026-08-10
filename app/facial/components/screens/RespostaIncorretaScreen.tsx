import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

export default function RespostaIncorretaScreen({
  onSolicitar,
}: {
  onSolicitar: () => void;
}) {
  return (
    <GradientScreen tone="red">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-red-600 text-6xl text-white shadow-lg">
          ✕
        </div>
        <h1 className="text-2xl font-extrabold text-neutral-900">
          Resposta Incorreta
        </h1>
        <p className="text-neutral-800">
          Para sua segurança, sua entrada precisará ser autorizada pelo
          proprietário.
        </p>
      </div>

      <PrimaryButton onClick={onSolicitar}>Solicitar Autorização</PrimaryButton>
    </GradientScreen>
  );
}
