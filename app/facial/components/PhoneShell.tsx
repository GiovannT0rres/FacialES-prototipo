export default function PhoneShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-200 p-4">
      <div
        className={`relative flex h-[812px] w-[375px] max-h-[92vh] flex-col overflow-hidden rounded-[2.5rem] border-[10px] border-neutral-900 bg-white shadow-2xl ${className}`}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
        <div className="relative flex h-full w-full flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
