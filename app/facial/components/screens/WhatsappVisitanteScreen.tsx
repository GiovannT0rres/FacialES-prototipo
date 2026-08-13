"use client";

import { useEffect, useState } from "react";

type Etapa = "digitando-1" | "mensagem";

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

function Digitando() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
    </div>
  );
}

function Cabecalho({ digitando }: { digitando: boolean }) {
  return (
    <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow">
      <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white">Entrada Segura</span>
        <span className="text-xs text-emerald-100">
          {digitando ? "digitando..." : "online"}
        </span>
      </div>
    </div>
  );
}

function MensagemBolha({ hora, texto }: { hora: string; texto: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow">
        <p className="text-sm text-neutral-800">{texto}</p>
        <span className="mt-1 block text-right text-[10px] text-neutral-400">{hora}</span>
      </div>
    </div>
  );
}

/**
 * Conversa disparada para o visitante logo após o proprietário autorizar:
 * confirma a autorização e explica que, por conta do cadastro incompleto,
 * ela vale só por 1 dia — as próximas exigem CNH + selfie.
 */
export default function WhatsappVisitanteScreen({
  nomePessoa = "João da Silva Ribeiro",
}: {
  nomePessoa?: string;
}) {
  const [etapa, setEtapa] = useState<Etapa>("digitando-1");
  const hora = horaAtual();

  useEffect(() => {
    if (etapa !== "digitando-1") return;
    const t = setTimeout(() => setEtapa("mensagem"), 900);
    return () => clearTimeout(t);
  }, [etapa]);

  const digitandoAgora = etapa === "digitando-1";

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <Cabecalho digitando={digitandoAgora} />

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        {digitandoAgora && (
          <div className="flex justify-start">
            <Digitando />
          </div>
        )}

        {etapa === "mensagem" && (
          <MensagemBolha
            hora={hora}
            texto={
              <>
                Olá, {nomePessoa.split(" ")[0]}! Você foi{" "}
                <strong>autorizado(a)</strong> a entrar. ✅
                <br />
                <br />
                Como seu cadastro ainda está incompleto, essa autorização
                vale apenas por <strong>1 dia</strong>. Envie agora uma foto
                da sua <strong>CNH</strong> e uma <strong>selfie</strong>{" "}
                para concluir seu cadastro.
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
