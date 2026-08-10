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

export const PERGUNTA_SEGURANCA = {
  pergunta: "Qual é a sua data de nascimento? (Mês/Dia/Ano)",
  opcoes: ["12/17/1998", "07/15/1995", "05/12/1980", "12/17/1988"],
  correta: "12/17/1998",
};
