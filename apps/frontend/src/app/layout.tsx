import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";


const font = Inter({
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "Seu evento começa aqui",
  description: "Aplicação fullstack para gestão de eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
