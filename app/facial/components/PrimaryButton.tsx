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
    "w-full rounded-2xl py-4 text-center text-lg font-extrabold tracking-tight transition active:scale-[0.98]";

  const variants = {
    blue: disabled
      ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
      : "bg-[#2F6BFF] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_24px_-6px_rgba(47,107,255,0.6)] hover:bg-[#4A7DFF]",
    white: "bg-white text-neutral-900 hover:bg-neutral-100",
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
