import Link from "next/link";

const apps = [
  {
    href: "/facial",
    nome: "Entrada Segura",
    descricao: "Cadastro, verificação facial e liberação de acesso.",
    cor: "from-teal-400 to-blue-600",
  },
];

export default function Hub() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-slate-100 px-6 py-16">
      <div className="flex w-full max-w-3xl flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-neutral-900">
            Protótipos
          </h1>
          <p className="text-neutral-600">
            Selecione um protótipo para navegar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.href}
              href={app.href}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className={`h-24 w-full bg-gradient-to-r ${app.cor}`} />
              <div className="flex flex-col gap-1 p-5">
                <h2 className="text-lg font-bold text-neutral-900">
                  {app.nome}
                </h2>
                <p className="text-sm text-neutral-600">{app.descricao}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
