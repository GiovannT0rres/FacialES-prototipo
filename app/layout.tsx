import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entrada Segura",
  description: "Cadastrou. Autorizou. Protegeu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-200">{children}</body>
    </html>
  );
}
