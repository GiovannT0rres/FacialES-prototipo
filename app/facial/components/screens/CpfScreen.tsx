"use client";

import { useState } from "react";
import GradientScreen from "../GradientScreen";
import PrimaryButton from "../PrimaryButton";

function maskCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function CpfScreen({
  onAvancar,
}: {
  onAvancar: (cpf: string) => void;
}) {
  const [cpf, setCpf] = useState("");
  const isValid = cpf.replace(/\D/g, "").length === 11;

  return (
    <GradientScreen>
      <h1 className="text-center text-2xl font-extrabold text-neutral-900">
        Bem-vindo(a)!
      </h1>

      <div className="flex flex-1 flex-col justify-center gap-4">
        <p className="text-center text-xl font-bold text-neutral-800">
          Para começar, por favor, digite seu CPF
        </p>

        <input
          inputMode="numeric"
          value={cpf}
          onChange={(e) => setCpf(maskCpf(e.target.value))}
          placeholder="000.000.000-00"
          className="w-full rounded-2xl border border-neutral-800/70 bg-white px-5 py-4 text-center text-xl text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-blue-500"
        />

        <p className="text-sm text-neutral-600">
          Usaremos seu CPF apenas para identificação de segurança
        </p>
      </div>

      <PrimaryButton disabled={!isValid} onClick={() => onAvancar(cpf)}>
        Avançar
      </PrimaryButton>
    </GradientScreen>
  );
}
