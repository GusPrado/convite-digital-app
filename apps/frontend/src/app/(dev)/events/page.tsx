import { events_seed } from "core";
import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function EventsPage() {


  return (
    <div className="grid grid-cols-3 gap-5">
      {events_seed.map(event => (
        <div key={event.id} className="
          bg-zinc-800 rounded-lg
          flex flex-col w-full overflow-hidden
        ">
          <div className="relative w-full h-52">
            <Image src={event.image} fill alt={event.name} className="object-cover "/>

          </div>
            <div className="flex flex-1 flex-col items-center p-7 gap-5 text-center">
              <span className="text-lg font-black">{event.name}</span>
              <p className="flex-1 text-sm text-zinc-400">{event.description}</p>
              <QRCode value={JSON.stringify({id: event.id, password: event.password})} className="w-44 h-44"/>
              <div className="flex gap-5">
              <Link href={`/event/admin/${event.id}/${event.password}`} className="flex-1 button red">
                Admin
              </Link>
              <Link href={`/invite/${event.alias}`} className="flex-1 button green">
                Convite
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}