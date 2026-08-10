"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneShell from "./components/PhoneShell";
import SplashScreen from "./components/screens/SplashScreen";
import CpfScreen from "./components/screens/CpfScreen";
import CpfValidadoScreen from "./components/screens/CpfValidadoScreen";
import PerguntaSegurancaScreen from "./components/screens/PerguntaSegurancaScreen";
import FacialScreen from "./components/screens/FacialScreen";
import CrieContaScreen from "./components/screens/CrieContaScreen";
import DestinoScreen from "./components/screens/DestinoScreen";
import SucessoScreen from "./components/screens/SucessoScreen";
import RespostaIncorretaScreen from "./components/screens/RespostaIncorretaScreen";
import ChamandoScreen from "./components/screens/ChamandoScreen";
import ChamadaScreen from "./components/screens/ChamadaScreen";
import {
  APARTAMENTOS,
  BLOCOS,
  PERGUNTA_SEGURANCA,
  type Fluxo,
  type Screen,
} from "./lib/types";

export default function FacialApp() {
  const [screen, setScreen] = useState<Screen>("splash-registro");
  const [fluxo, setFluxo] = useState<Fluxo>("registro");
  const [bloco, setBloco] = useState<string | null>(null);

  function reiniciar() {
    setBloco(null);
    setScreen("splash-registro");
    setFluxo("registro");
  }

  function renderScreen() {
    switch (screen) {
      case "splash-registro":
        return (
          <SplashScreen
            label="Registro"
            onQueroEntrar={() => {
              setFluxo("registro");
              setScreen("cpf");
            }}
          />
        );

      case "splash-login":
        return (
          <SplashScreen
            label="Login"
            onQueroEntrar={() => setScreen("cpf")}
          />
        );

      case "cpf":
        return (
          <CpfScreen
            onAvancar={() =>
              setScreen(fluxo === "registro" ? "facial" : "cpf-validado")
            }
          />
        );

      case "cpf-validado":
        return (
          <CpfValidadoScreen onAvancar={() => setScreen("pergunta-seguranca")} />
        );

      case "pergunta-seguranca":
        return (
          <PerguntaSegurancaScreen
            pergunta={PERGUNTA_SEGURANCA.pergunta}
            opcoes={PERGUNTA_SEGURANCA.opcoes}
            onResponder={(opcao) =>
              setScreen(
                opcao === PERGUNTA_SEGURANCA.correta
                  ? "facial"
                  : "resposta-incorreta"
              )
            }
          />
        );

      case "facial":
        return (
          <FacialScreen
            onConcluido={() =>
              setScreen(fluxo === "registro" ? "crie-conta" : "sucesso")
            }
          />
        );

      case "crie-conta":
        return <CrieContaScreen onAvancar={() => setScreen("destino-bloco")} />;

      case "destino-bloco":
        return (
          <DestinoScreen
            titulo="Qual o seu destino?"
            opcoes={BLOCOS}
            onAvancar={(valor) => {
              setBloco(valor);
              setScreen("destino-apto");
            }}
          />
        );

      case "destino-apto":
        return (
          <DestinoScreen
            titulo={`Bloco ${bloco} — Apartamento`}
            opcoes={APARTAMENTOS}
            onAvancar={() => setScreen("sucesso")}
          />
        );

      case "sucesso":
        return (
          <SucessoScreen
            itens={
              fluxo === "registro"
                ? ["Cadastro criado", "Autorização ativa", "Liberação autorizada"]
                : ["Cadastro checado", "Autorização ativa", "Liberação autorizada"]
            }
            onConcluido={reiniciar}
          />
        );

      case "resposta-incorreta":
        return (
          <RespostaIncorretaScreen
            onSolicitar={() => setScreen("chamando-proprietario")}
          />
        );

      case "chamando-proprietario":
        return (
          <ChamandoScreen onConectado={() => setScreen("chamada-em-andamento")} />
        );

      case "chamada-em-andamento":
        return <ChamadaScreen onEncerrar={() => setScreen("sucesso")} />;

      default:
        return null;
    }
  }

  return (
    <div className="relative">
      <PhoneShell>{renderScreen()}</PhoneShell>
      <div className="fixed left-4 top-4 flex gap-2">
        <Link
          href="/"
          className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-700 shadow"
        >
          ← Hub
        </Link>
        <button
          onClick={() => {
            setFluxo("login");
            setScreen("splash-login");
          }}
          className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-700 shadow"
        >
          Testar Login
        </button>
      </div>
    </div>
  );
}
