export type Motivo =
  | "Proprietário"
  | "Equipe"
  | "Visitante"
  | "Prestador de Serviço"
  | "Colaborador";

export const MOTIVOS: readonly Motivo[] = [
  "Proprietário",
  "Equipe",
  "Visitante",
  "Prestador de Serviço",
  "Colaborador",
];

export const UNIDADES = ["101", "102", "103", "104"] as const;

export const PEDIDO_MOCK = {
  nome: "Carlos Andrade",
  telefone: "(11) 98888-4321",
  condominio: "Condomínio Exemplo — Bloco A",
};
