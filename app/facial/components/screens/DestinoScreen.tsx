export default function DestinoScreen({
  titulo,
  opcoes,
  onAvancar,
}: {
  titulo: string;
  opcoes: readonly string[];
  onAvancar: (valor: string) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-6 bg-[#0B0E11] px-6 pt-16 pb-10">
      <h1 className="text-2xl font-extrabold text-white">{titulo}</h1>

      <div className="flex flex-col gap-3">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => onAvancar(opcao)}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-5 text-left text-lg font-bold text-white active:scale-[0.98] active:bg-white/10"
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
