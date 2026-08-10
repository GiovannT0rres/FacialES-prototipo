"use client";

import { useEffect } from "react";

export default function ChamandoScreen({ onConectado }: { onConectado: () => void }) {
  useEffect(() => {
    const t = setTimeout(onConectado, 2200);
    return () => clearTimeout(t);
  }, [onConectado]);

  return (
    <div
      onClick={onConectado}
      className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-white via-teal-50 to-teal-200 px-6"
    >
      <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-gradient-to-b from-blue-500 to-blue-800 px-6 py-14 shadow-lg">
        <p className="text-center text-xl font-bold text-white">
          Um instante,
          <br />
          acionando proprietário...
        </p>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.1 2.2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
