import { useState } from "react";
import { MOTIVOS, PEDIDO_MOCK, UNIDADES, type Motivo } from "../../lib/types";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

const LINKS_MENU = ["Acessos", "Avaliação", "Cadastro"];

function Cabecalho() {
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-700 bg-black px-4 pb-3 pt-7">
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold tracking-tight text-white">
          Entrada Segura
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-[11px] font-bold text-indigo-300">
            ✓ Ativar
          </span>
          <span className="text-[11px] font-semibold text-neutral-400">Sair</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <span className="text-[11px] font-bold text-white">Home</span>
        {LINKS_MENU.map((link) => (
          <span key={link} className="text-[11px] font-semibold text-neutral-400">
            {link}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PainelOperadorScreen({
  onAtivar,
  onRejeitar,
}: {
  onAtivar: (unidade: string) => void;
  onRejeitar: () => void;
}) {
  const [unidadeAberta, setUnidadeAberta] = useState(false);
  const motivoAtivo: Motivo = "Proprietário";

  const motivoCor: Record<Motivo, string> = {
    Proprietário: "text-emerald-400",
    Equipe: "text-emerald-300",
    Visitante: "text-red-400",
    "Prestador de Serviço": "text-amber-400",
    Colaborador: "text-indigo-400",
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-neutral-900 text-white">
      <Cabecalho />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="rounded-2xl bg-neutral-800 p-4 shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-bold text-white">{PEDIDO_MOCK.nome}</p>
              <p className="mt-1 text-sm text-neutral-400">
                Fone: {PEDIDO_MOCK.telefone}
              </p>
              <p className="mt-2 text-sm text-neutral-300">
                {PEDIDO_MOCK.condominio}
              </p>
            </div>
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
              {AVATAR}
            </div>
          </div>

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

          <button
            onClick={() => setUnidadeAberta((aberta) => !aberta)}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-600 bg-neutral-700 px-4 py-3 text-left text-base font-bold text-white"
          >
            Selecione...
            <span className={`transition ${unidadeAberta ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>

          {unidadeAberta && (
            <div className="mt-2 flex flex-col gap-2">
              {UNIDADES.map((unidade) => (
                <button
                  key={unidade}
                  onClick={() => {
                    setUnidadeAberta(false);
                    onAtivar(unidade);
                  }}
                  className="w-full rounded-xl border border-neutral-600 bg-neutral-700 py-3 text-center text-base font-bold text-white transition hover:border-emerald-400 hover:bg-neutral-600 active:scale-[0.98]"
                >
                  {unidade}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
