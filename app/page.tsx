"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ScanFace, UserCheck, UserPlus } from "lucide-react";

export default function Hub() {
  const router = useRouter();

  // Para adicionar uma nova opção ao hub, inclua um novo objeto neste array.
  // Campos: id, title, description, icon (componente do lucide-react),
  // textColor / bgLight (classes Tailwind para o ícone) e path (rota do módulo).
  const cards = [
    {
      id: "facial",
      title: "Liberação de Visitante na Portaria",
      description: "Cadastro, verificação facial e liberação de acesso.",
      icon: ScanFace,
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      path: "/facial",
    },
    {
      id: "ativacao-proprietario",
      title: "Ativação de proprietário na Plataforma",
      description: "Tela do síndico autorizando um proprietário na plataforma.",
      icon: UserCheck,
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      path: "/ativacao-proprietario",
    },
    {
      id: "autorizacao-familiar",
      title: "Autorização do proprietário via Whatsapp Check-in ",
      description: "Painel do proprietário autorizando um familiar na sua unidade.",
      icon: UserPlus,
      textColor: "text-sky-600",
      bgLight: "bg-sky-50",
      path: "/autorizacao-familiar",
    },
    // Novo módulo: adicione o próximo card aqui.
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Portaria Autônoma
          </h1>
          <p className="text-[15px] text-gray-500">
            Selecione o protótipo que deseja acessar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                onClick={() => router.push(card.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-start text-left transition-all hover:shadow-md"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bgLight} ${card.textColor} flex items-center justify-center mb-5`}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                  {card.title}
                </h2>
                <p className="text-[14px] text-gray-500 line-clamp-2">
                  {card.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
