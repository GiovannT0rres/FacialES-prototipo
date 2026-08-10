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
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-white via-teal-50 to-teal-200 px-5 pt-14 pb-8">
      <div className="rounded-2xl bg-gradient-to-r from-lime-400 to-green-600 px-6 py-4 text-center text-xl font-bold text-white shadow">
        {titulo}
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 shadow">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => onAvancar(opcao)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-100 py-4 text-center text-lg font-bold text-neutral-800 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]"
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
