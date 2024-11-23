import { Event, Guest } from "@/core"
import EventInfo from "./EventInfo"
import QrCodeAccess from "./QrCodeAccess"
import Statistics from "../shared/Statistics"
import GuestList from "./GuestList"

export interface EventDashboardProps {
  event: Event
  confirmed: Guest[]
  notConfirmed: Guest[]
  total: number
}

export default function EventDashboard(props: EventDashboardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 self-stretch">
        <EventInfo event={props.event} className="flex-1" />
        <QrCodeAccess event={props.event}/>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <Statistics 
          text="Expectativa de convidados:"
          value={props.event.expectedPublic}
          image="/icones/convidados.svg"
        />
        <Statistics 
        text="Confirmações:"
        value={props.confirmed.length}
        image="/icones/confirmados.svg"
        />
        <Statistics 
          text="Total confirmado:"
          value={props.total}
          image="/icones/acompanhantes.svg"
        />
      </div>
      <button className="button blue self-end mt-12">
        <span>Atualizar lista de convidados</span>
      </button>
      <span className="flex py-2 text-xl font-bold text-white/80">Convidados que confirmaram PRESENÇA</span>
      <GuestList guests={props.confirmed} />
      <span className="flex py-2 text-xl font-bold text-white/80">Convidados que confirmaram AUSÊNCIA</span>
      <GuestList guests={props.notConfirmed} />
    </div>
  )
}