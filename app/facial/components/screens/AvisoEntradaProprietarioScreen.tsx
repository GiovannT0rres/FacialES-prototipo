"use client";

const AVATAR = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-700 to-neutral-900">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#d4a574" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#d4a574" />
    </svg>
  </div>
);

export default function AvisoEntradaProprietarioScreen() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#e5ddd5]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4">
        <div className="h-10 w-10 overflow-hidden rounded-full">{AVATAR}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Proprietário</span>
          <span className="text-xs text-emerald-100">online</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-3 p-4">
        <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white p-2 shadow">
          <p className="text-sm text-neutral-800">
            🔔 A pessoa acabou de entrar.
          </p>
        </div>
      </div>
    </div>
  );
}
