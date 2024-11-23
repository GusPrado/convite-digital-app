import LogoMain from "@/components/template/LogoMain";
import Link from "next/link";

export default function Home() {
  return (
    <div className="
      h-screen flex flex-col justify-center items-center gap-10
      bg-[url('/background-main.svg')] bg-cover
    ">
      <div className="flex flex-col items-center gap-4">
        <LogoMain />
        <p className="text-zinc-500 font-light w-96 leading-6 text-center select-none">
          Crie e gerencie o convite do seu evento de forma rápida e fácil, sem complicações!</p>
      </div>
      <Link href="/event" className="button blue text-lg uppercase">Criar meu evento</Link>
    </div>
  )
}
