import React from "react";
import Logo from "./Logo";

export interface PageProps {
  children: React.ReactNode
  className?: string
}

export default function Page(props: PageProps) {
  return (
    <div className="flex flex-col items-center py-10 min-h-screen bg-[url('/background.png')] bg-cover">
      <Logo />
      <main className={`flex-1 flex flex-col justify-center py-10 container ${props.className}`}>
        {props.children}
      </main>
    </div>
  )
}