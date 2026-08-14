import { PEDIDO_MOCK } from "../../lib/types";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-[#0a2540]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/logo-entrada-segura.jpg"
      alt="Entrada Segura"
      className="h-full w-full object-cover"
    />
  </div>
);

function horaAtual() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const MENSAGEM_PADRAO =
  "Autorização concedida 🤩\n\n" +
  "📱 SUPORTE: Exemplo\n" +
  "🪪 LOGIN: Exemplo\n" +
  "🔐 SENHA: Exemplo\n\n" +
  "🖥 SISTEMA: https:/exemplo.entradasegura.com.br";

export default function BoardingPassScreen({
  mensagem = MENSAGEM_PADRAO,
}: {
  mensagem?: string;
}) {
  const hora = horaAtual();

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow">
        <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Entrada Segura</span>
          <span className="text-xs text-emerald-100">online</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        <div className="flex justify-start">
          <div className="max-w-[85%] whitespace-pre-line rounded-lg rounded-tl-none bg-white p-3 shadow">
            <p className="text-sm text-neutral-800">{mensagem}</p>

            <span className="mt-2 block text-right text-[10px] text-neutral-400">
              {hora}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
