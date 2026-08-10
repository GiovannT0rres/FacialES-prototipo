export default function GradientScreen({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "red";
}) {
  const tones = {
    teal: "from-white via-teal-50 to-teal-200",
    red: "from-red-200 via-red-400 to-red-600",
  };

  return (
    <div
      className={`flex h-full w-full flex-col bg-gradient-to-b px-6 pt-16 pb-10 ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
