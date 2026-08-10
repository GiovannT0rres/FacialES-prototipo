import { PEDIDO_MOCK } from "../../lib/types";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

function horaAtual() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function BoardingPassScreen({
  nome = PEDIDO_MOCK.nome,
}: {
  nome?: string;
} = {}) {
  const hora = horaAtual();

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow">
        <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{nome}</span>
          <span className="text-xs text-emerald-100">online</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        <div className="flex justify-start">
          <div className="max-w-[85%] whitespace-pre-line rounded-lg rounded-tl-none bg-white p-3 shadow">
            <p className="text-sm text-neutral-800">
              {"Autorização concedida 🤩\n\n" +
                "📱 SUPORTE: Exemplo\n" +
                "🪪 LOGIN: Exemplo\n" +
                "🔐 SENHA: Exemplo\n\n" +
                "🖥 SISTEMA: https:/exemplo.entradasegura.com.br"}
            </p>

            <span className="mt-2 block text-right text-[10px] text-neutral-400">
              {hora}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
