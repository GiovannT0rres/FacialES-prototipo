"use client";

import { useEffect, useState } from "react";

type EtapaAutorizacao =
  | "digitando-1"
  | "aviso"
  | "digitando-2"
  | "foto"
  | "decisao"
  | "respondido";

type EtapaAviso = "digitando-1" | "entrou";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-400 to-emerald-600">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="white" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="white" />
    </svg>
  </div>
);

const AVATAR_FOTO = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#d4a574" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#d4a574" />
    </svg>
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
        <span className="text-sm font-bold text-white">Proprietário</span>
        <span className="text-xs text-emerald-100">
          {digitando ? "digitando..." : "online"}
        </span>
      </div>
    </div>
  );
}

function BolhaRecebida({ children, hora }: { children: React.ReactNode; hora: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow">
        <div className="text-sm text-neutral-800">{children}</div>
        <span className="mt-1 block text-right text-[10px] text-neutral-400">
          {hora}
        </span>
      </div>
    </div>
  );
}

function FotoBolha({ hora, legenda }: { hora: string; legenda: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white p-1.5 shadow">
        <div className="aspect-square w-44 overflow-hidden rounded">{AVATAR_FOTO}</div>
        <p className="px-1 pt-1.5 text-sm text-neutral-800">{legenda}</p>
        <span className="block px-1 pb-0.5 text-right text-[10px] text-neutral-400">
          {hora}
        </span>
      </div>
    </div>
  );
}

/**
 * Modo "autorizacao": pede autorização por foto/botões e, após decidir,
 * permanece na mesma conversa aguardando `pessoaEntrou` para anexar o aviso
 * final de entrada — sem trocar de componente.
 * Modo "aviso": pula direto para o aviso de entrada (acesso já autorizado).
 */
export default function WhatsappProprietarioScreen({
  modo,
  pessoaEntrou = false,
  onAutorizar,
  onNegar,
}: {
  modo: "autorizacao" | "aviso";
  pessoaEntrou?: boolean;
  onAutorizar?: () => void;
  onNegar?: () => void;
}) {
  const [etapaAutorizacao, setEtapaAutorizacao] = useState<EtapaAutorizacao>("digitando-1");
  const [etapaAviso, setEtapaAviso] = useState<EtapaAviso>("digitando-1");
  const hora = horaAtual();

  useEffect(() => {
    if (modo !== "autorizacao") return;
    const sequencia: { etapa: EtapaAutorizacao; delay: number }[] = [
      { etapa: "aviso", delay: 900 },
      { etapa: "digitando-2", delay: 700 },
      { etapa: "foto", delay: 900 },
      { etapa: "decisao", delay: 500 },
    ];
    const ordem: EtapaAutorizacao[] = [
      "digitando-1",
      "aviso",
      "digitando-2",
      "foto",
      "decisao",
    ];
    const indiceAtual = ordem.indexOf(etapaAutorizacao);
    if (indiceAtual === -1 || indiceAtual === ordem.length - 1) return;

    const proxima = ordem[indiceAtual + 1];
    const delay = sequencia.find((s) => s.etapa === proxima)?.delay ?? 800;
    const t = setTimeout(() => setEtapaAutorizacao(proxima), delay);
    return () => clearTimeout(t);
  }, [modo, etapaAutorizacao]);

  useEffect(() => {
    if (modo !== "aviso") return;
    if (etapaAviso !== "digitando-1") return;
    const t = setTimeout(() => setEtapaAviso("entrou"), 1000);
    return () => clearTimeout(t);
  }, [modo, etapaAviso]);

  function decidir(fn?: () => void) {
    setEtapaAutorizacao("respondido");
    fn?.();
  }

  const digitandoAgora =
    modo === "autorizacao"
      ? etapaAutorizacao === "digitando-1" || etapaAutorizacao === "digitando-2"
      : etapaAviso === "digitando-1";

  return (
    <div className="flex h-full w-full flex-col bg-[#e5ddd5]">
      <Cabecalho digitando={digitandoAgora} />

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3">
        {modo === "autorizacao" ? (
          <>
            {etapaAutorizacao === "digitando-1" && (
              <div className="flex justify-start">
                <Digitando />
              </div>
            )}

            {etapaAutorizacao !== "digitando-1" && (
              <BolhaRecebida hora={hora}>
                🔔 Alguém está na porta e solicita acesso.
              </BolhaRecebida>
            )}

            {etapaAutorizacao === "digitando-2" && (
              <div className="flex justify-start">
                <Digitando />
              </div>
            )}

            {(etapaAutorizacao === "foto" ||
              etapaAutorizacao === "decisao" ||
              etapaAutorizacao === "respondido") && (
              <FotoBolha hora={hora} legenda="Autorizar a entrada desta pessoa?" />
            )}

            {etapaAutorizacao === "decisao" && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => decidir(onAutorizar)}
                  className="w-full rounded-full bg-emerald-500 py-3 text-sm font-bold text-white shadow active:scale-[0.98]"
                >
                  Autorizar
                </button>
                <button
                  onClick={() => decidir(onNegar)}
                  className="w-full rounded-full bg-red-500 py-3 text-sm font-bold text-white shadow active:scale-[0.98]"
                >
                  Não Autorizar
                </button>
              </div>
            )}

            {etapaAutorizacao === "respondido" && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 shadow">
                  <p className="text-sm font-semibold text-neutral-800">
                    Resposta enviada
                  </p>
                  <span className="mt-1 block text-right text-[10px] text-neutral-500">
                    {hora} ✓✓
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {etapaAviso === "digitando-1" && (
              <div className="flex justify-start">
                <Digitando />
              </div>
            )}
            {etapaAviso === "entrou" && (
              <FotoBolha hora={hora} legenda="🚪 A pessoa acabou de entrar." />
            )}
          </>
        )}

        {modo === "autorizacao" && pessoaEntrou && (
          <FotoBolha hora={hora} legenda="🚪 A pessoa acabou de entrar." />
        )}
      </div>
    </div>
  );
}
