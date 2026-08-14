export type Motivo = "Proprietário" | "Visitante" | "Prestador de Serviço";

export const MOTIVOS: readonly Motivo[] = [
  "Proprietário",
  "Visitante",
  "Prestador de Serviço",
];

export const UNIDADES = ["101", "102", "103"] as const;

export const PEDIDO_MOCK = {
  nome: "Carlos Andrade",
  telefone: "(11) 98888-4321",
  condominio: "Condomínio Exemplo — Bloco A",
  foto: "https://i.pravatar.cc/300?img=12",
};
