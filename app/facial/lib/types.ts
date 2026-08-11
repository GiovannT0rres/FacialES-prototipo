export type Cenario =
  | "sem-cadastro-sem-autorizacao"
  | "com-cadastro-sem-autorizacao"
  | "com-cadastro-com-autorizacao";

export type Screen =
  | "splash"
  | "facial"
  | "cpf"
  | "pergunta-seguranca"
  | "destino-apto"
  | "chamando-proprietario"
  | "whatsapp-proprietario"
  | "acesso-negado"
  | "sucesso"
  | "aviso-entrada-proprietario";

export const CENARIO_LABEL: Record<Cenario, string> = {
  "sem-cadastro-sem-autorizacao": "Sem cadastro e sem autorização",
  "com-cadastro-sem-autorizacao": "Com cadastro, sem autorização",
  "com-cadastro-com-autorizacao": "Com cadastro e autorização",
};

export const CENARIO_STEPS: Record<Cenario, Screen[]> = {
  "sem-cadastro-sem-autorizacao": [
    "splash",
    "facial",
    "cpf",
    "pergunta-seguranca",
    "destino-apto",
    "chamando-proprietario",
    "whatsapp-proprietario",
    "sucesso",
    "aviso-entrada-proprietario",
  ],
  "com-cadastro-sem-autorizacao": [
    "splash",
    "facial",
    "destino-apto",
    "chamando-proprietario",
    "whatsapp-proprietario",
    "sucesso",
    "aviso-entrada-proprietario",
  ],
  "com-cadastro-com-autorizacao": [
    "splash",
    "facial",
    "sucesso",
    "aviso-entrada-proprietario",
  ],
};

export const SUCESSO_ITENS: Record<Cenario, string[]> = {
  "sem-cadastro-sem-autorizacao": [
    "Cadastro criado",
    "Autorização ativa",
    "Liberação autorizada",
  ],
  "com-cadastro-sem-autorizacao": [
    "Cadastro checado",
    "Autorização ativa",
    "Liberação autorizada",
  ],
  "com-cadastro-com-autorizacao": [
    "Cadastro checado",
    "Liberação autorizada",
  ],
};

export const APARTAMENTOS = ["101", "102", "103", "104"] as const;

export type PerguntaSeguranca = {
  pergunta: string;
  opcoes: string[];
  correta: string;
};

export const PERGUNTAS_SEGURANCA: PerguntaSeguranca[] = [
  {
    pergunta: "Em qual MÊS você nasceu?",
    opcoes: ["Dezembro", "Julho", "Maio"],
    correta: "Dezembro",
  },
  {
    pergunta: "Em qual DIA do mês você nasceu?",
    opcoes: ["Dia 17", "Dia 15", "Dia 12"],
    correta: "Dia 17",
  },
  {
    pergunta: "Em qual ANO você nasceu?",
    opcoes: ["1998", "1995", "1980"],
    correta: "1998",
  },
];

export function sortearPerguntaSeguranca(): PerguntaSeguranca {
  const indice = Math.floor(Math.random() * PERGUNTAS_SEGURANCA.length);
  return PERGUNTAS_SEGURANCA[indice];
}
