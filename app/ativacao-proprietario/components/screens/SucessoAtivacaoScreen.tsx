export default function SucessoAtivacaoScreen({
  onReiniciar,
}: {
  onReiniciar: () => void;
}) {
  return (
    <button
      onClick={onReiniciar}
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-emerald-600 px-6 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-emerald-600">
        ✓
      </div>
      <p className="text-lg font-bold text-white">
        Autorização concluída.
        <br />
        Toque para reiniciar.
      </p>
    </button>
  );
}
