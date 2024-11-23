import { Guest } from "@/core";
import GuestItem from "./GuestItem";

export interface GuestListProps {
  guests: Guest[]
}

export default function GuestList(props: GuestListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {props.guests.map(guest => (
          <GuestItem key={guest.id} guest={guest} />
        ))}
      </ul>
        
    </div>
  )
}