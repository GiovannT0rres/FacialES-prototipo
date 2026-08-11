export default function PerguntaSegurancaScreen({
  pergunta,
  opcoes,
  correta,
  onResponder,
}: {
  pergunta: string;
  opcoes: string[];
  correta: string;
  onResponder: (opcao: string) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-6 bg-neutral-100 px-6 pt-16 pb-10">
      <h1 className="text-2xl font-bold text-neutral-800">{pergunta}</h1>

      <div className="flex flex-col gap-3">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => onResponder(opcao)}
            className={`w-full rounded-2xl bg-white px-5 py-5 text-left text-lg font-bold text-neutral-900 shadow-sm active:scale-[0.98] ${
              opcao === correta ? "outline outline-2 outline-emerald-400" : ""
            }`}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
