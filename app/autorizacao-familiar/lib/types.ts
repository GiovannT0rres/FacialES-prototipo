export type Motivo =
  | "Proprietário"
  | "Equipe"
  | "Visitante"
  | "Prestador de Serviço"
  | "Colaborador"
  | "Familiar";

export const MOTIVOS: readonly Motivo[] = [
  "Proprietário",
  "Equipe",
  "Visitante",
  "Prestador de Serviço",
  "Colaborador",
  "Familiar",
];

export const UNIDADES = ["101", "102", "103", "104"] as const;

export const PEDIDO_MOCK = {
  nome: "Mariana Andrade",
  telefone: "(11) 97777-6543",
  condominio: "Condomínio Exemplo — Bloco A",
};
