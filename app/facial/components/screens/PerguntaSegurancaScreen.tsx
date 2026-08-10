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
    <div className="flex h-full w-full flex-col items-center gap-8 bg-gradient-to-b from-white via-teal-50 to-teal-200 px-6 pt-16 pb-10">
      <h1 className="text-2xl font-bold text-neutral-700">Confirme sua identidade</h1>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="10" rx="2" fill="white" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="white" strokeWidth="2" fill="none" />
          <path d="M9.5 15l2 2 3-3.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex w-full flex-1 flex-col gap-4 rounded-2xl bg-white p-6 shadow">
        <p className="text-lg font-bold text-neutral-900">{pergunta}</p>
        <div className="flex flex-col gap-4">
          {opcoes.map((opcao) => (
            <button
              key={opcao}
              onClick={() => onResponder(opcao)}
              className={`w-full rounded-xl bg-blue-600 py-4 text-center text-lg font-bold text-white shadow active:scale-[0.98] ${
                opcao === correta ? "outline outline-2 outline-emerald-400" : ""
              }`}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
