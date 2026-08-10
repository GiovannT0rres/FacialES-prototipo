export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  variant = "blue",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue" | "white";
}) {
  const base =
    "w-full rounded-2xl py-4 text-center text-lg font-bold shadow-md transition active:scale-[0.98]";

  const variants = {
    blue: disabled
      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
      : "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500",
    white: "bg-white text-neutral-900 hover:bg-neutral-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
