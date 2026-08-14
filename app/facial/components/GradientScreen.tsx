export default function GradientScreen({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "red";
}) {
  const tones = {
    teal: "from-[#0B0E11] via-[#0B0E11] to-[#101722]",
    red: "from-[#2B0B10] via-[#3A0D14] to-[#0B0E11]",
  };

  return (
    <div
      className={`flex h-full w-full flex-col bg-gradient-to-b px-6 pt-16 pb-10 ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
