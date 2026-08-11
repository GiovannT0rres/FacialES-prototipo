"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneShell from "./components/PhoneShell";
import SplashScreen from "./components/screens/SplashScreen";
import CpfScreen from "./components/screens/CpfScreen";
import PerguntaSegurancaScreen from "./components/screens/PerguntaSegurancaScreen";
import FacialScreen from "./components/screens/FacialScreen";
import DestinoScreen from "./components/screens/DestinoScreen";
import SucessoScreen from "./components/screens/SucessoScreen";
import ChamandoScreen from "./components/screens/ChamandoScreen";
import WhatsappProprietarioScreen from "./components/screens/WhatsappProprietarioScreen";
import AcessoNegadoScreen from "./components/screens/AcessoNegadoScreen";
import {
  APARTAMENTOS,
  CENARIO_LABEL,
  CENARIO_STEPS,
  SUCESSO_ITENS,
  sortearPerguntaSeguranca,
  type Cenario,
  type PerguntaSeguranca,
  type Screen,
} from "./lib/types";

const CENARIOS: Cenario[] = [
  "sem-cadastro-sem-autorizacao",
  "com-cadastro-sem-autorizacao",
  "com-cadastro-com-autorizacao",
];

export default function FacialApp() {
  const [cenario, setCenario] = useState<Cenario>(CENARIOS[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [falha, setFalha] = useState(false);
  const [perguntaSeguranca, setPerguntaSeguranca] = useState<PerguntaSeguranca>(
    sortearPerguntaSeguranca
  );

  const steps = CENARIO_STEPS[cenario];
  const screen: Screen = steps[stepIndex];
  const cenarioTemWhatsapp = steps.includes("whatsapp-proprietario");

  function iniciarCenario(novoCenario: Cenario) {
    setCenario(novoCenario);
    setStepIndex(0);
    setFalha(false);
    setPerguntaSeguranca(sortearPerguntaSeguranca());
  }

  function avancar() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function reiniciar() {
    iniciarCenario(cenario);
  }

  function responderPerguntaSeguranca(opcao: string) {
    if (opcao === perguntaSeguranca.correta) {
      avancar();
    } else {
      setFalha(true);
    }
  }

  function renderTotem() {
    if (falha) {
      return <AcessoNegadoScreen onReiniciar={reiniciar} />;
    }

    switch (screen) {
      case "splash":
        return <SplashScreen onQueroEntrar={avancar} />;

      case "facial":
        return <FacialScreen onConcluido={avancar} />;

      case "cpf":
        return <CpfScreen onAvancar={avancar} />;

      case "pergunta-seguranca":
        return (
          <PerguntaSegurancaScreen
            pergunta={perguntaSeguranca.pergunta}
            opcoes={perguntaSeguranca.opcoes}
            correta={perguntaSeguranca.correta}
            onResponder={responderPerguntaSeguranca}
          />
        );

      case "destino-apto":
        return (
          <DestinoScreen
            titulo="Qual o seu apartamento?"
            opcoes={APARTAMENTOS}
            onAvancar={avancar}
          />
        );

      case "chamando-proprietario":
        return <ChamandoScreen onConectado={avancar} />;

      case "whatsapp-proprietario":
      case "sucesso":
        if (screen === "sucesso") {
          return (
            <SucessoScreen itens={SUCESSO_ITENS[cenario]} onConcluido={avancar} />
          );
        }
        return <ChamandoScreen onConectado={() => {}} />;

      case "acesso-negado":
        return <AcessoNegadoScreen onReiniciar={reiniciar} />;

      case "aviso-entrada-proprietario":
        return (
          <div
            onClick={reiniciar}
            className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-white via-teal-50 to-teal-200 px-6 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              ✓
            </div>
            <p className="text-lg font-bold text-neutral-700">
              Acesso concluído.
              <br />
              Toque para reiniciar.
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  const mostrarWhatsapp =
    !falha &&
    ((cenarioTemWhatsapp &&
      (screen === "whatsapp-proprietario" ||
        screen === "sucesso" ||
        screen === "aviso-entrada-proprietario")) ||
      (!cenarioTemWhatsapp && screen === "aviso-entrada-proprietario"));

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center gap-6 bg-slate-200 p-4">
      <PhoneShell>{renderTotem()}</PhoneShell>

      {mostrarWhatsapp && (
        <PhoneShell>
          <WhatsappProprietarioScreen
            modo={cenarioTemWhatsapp ? "autorizacao" : "aviso"}
            pessoaEntrou={screen === "aviso-entrada-proprietario"}
            onAutorizar={avancar}
            onNegar={() => setFalha(true)}
          />
        </PhoneShell>
      )}

      <div className="fixed left-4 top-4 flex flex-wrap gap-2">
        <Link
          href="/"
          className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-700 shadow"
        >
          ← Hub
        </Link>
        {CENARIOS.map((c) => (
          <button
            key={c}
            onClick={() => iniciarCenario(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow transition ${
              cenario === c
                ? "bg-blue-600 text-white"
                : "bg-white/90 text-neutral-700"
            }`}
          >
            {CENARIO_LABEL[c]}
          </button>
        ))}
      </div>
    </div>
  );
}
