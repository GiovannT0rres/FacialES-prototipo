import { MOTIVOS, PEDIDO_MOCK, UNIDADES, type Motivo } from "../../lib/types";

export default function PainelOperadorScreen({
  onAtivar,
  onRejeitar,
}: {
  onAtivar: (unidade: string) => void;
  onRejeitar: () => void;
}) {
  const motivoAtivo: Motivo = "Proprietário";

  const motivoCor: Record<Motivo, string> = {
    Proprietário: "text-emerald-400",
    Equipe: "text-emerald-300",
    Visitante: "text-red-400",
    "Prestador de Serviço": "text-amber-400",
    Colaborador: "text-indigo-400",
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-neutral-900 p-5 text-white">
      <div className="rounded-2xl bg-neutral-800 p-4 shadow">
        <p className="text-base font-bold text-white">{PEDIDO_MOCK.nome}</p>
        <p className="mt-1 text-sm text-neutral-400">
          Fone: {PEDIDO_MOCK.telefone}
        </p>
        <p className="mt-2 text-sm text-neutral-300">{PEDIDO_MOCK.condominio}</p>

        <button
          onClick={onRejeitar}
          className="mt-4 text-sm font-bold text-red-400 active:opacity-70"
        >
          Rejeitar
        </button>
      </div>

      <div className="rounded-2xl bg-neutral-800 p-4 shadow">
        <p className="mb-3 text-center text-sm font-bold text-white">
          Qual o MOTIVO do acesso?
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {MOTIVOS.map((motivo) => (
            <span
              key={motivo}
              className={`text-sm font-bold ${motivoCor[motivo]} ${
                motivo === motivoAtivo
                  ? "rounded-full border border-emerald-400 px-3 py-1"
                  : "px-3 py-1 opacity-60"
              }`}
            >
              {motivo}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-neutral-800 p-4 shadow">
        <p className="mb-3 text-center text-sm font-bold text-white">
          Qual a Unidade?
        </p>
        <div className="flex flex-col gap-2">
          {UNIDADES.map((unidade) => (
            <button
              key={unidade}
              onClick={() => onAtivar(unidade)}
              className="w-full rounded-xl border border-neutral-600 bg-neutral-700 py-3 text-center text-base font-bold text-white transition hover:border-emerald-400 hover:bg-neutral-600 active:scale-[0.98]"
            >
              {unidade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
