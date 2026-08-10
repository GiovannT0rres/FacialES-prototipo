export type Screen =
  | "splash-registro"
  | "splash-login"
  | "cpf"
  | "cpf-validado"
  | "pergunta-seguranca"
  | "facial"
  | "crie-conta"
  | "destino-bloco"
  | "destino-apto"
  | "sucesso"
  | "resposta-incorreta"
  | "chamando-proprietario"
  | "chamada-em-andamento"
  | "porta-aberta";

export type Fluxo = "registro" | "login";

export interface AppState {
  fluxo: Fluxo;
  cpf: string;
  bloco: string | null;
  apartamento: string | null;
  respostaCorreta: boolean;
}

export const BLOCOS = ["A", "B", "C", "D", "E"] as const;

export const APARTAMENTOS = Array.from({ length: 12 }, (_, i) => String(100 + i));

export const PERGUNTA_SEGURANCA = {
  pergunta: "Qual o primeiro nome da sua mãe?",
  opcoes: ["Noemi", "Carol", "Bruna", "Luiza"],
  correta: "Carol",
};
