"use client"
import EventDashboard from "@/components/event/EventDashboard"
import PasswordEventForm from "@/components/event/PasswordEventForm"
import { Event, events_seed, Guest } from "@/core"
import { use, useEffect, useState } from "react"

export default function EventAdminPage(props: any) {

  const params: any = use(props.params)

  const id = params.all_params[0]
  const [event, setEvent] = useState<Event | null>(null)
  const [password, setPassword] = useState<string | null>(params.all_params[1] ?? null) 

  const confirmed = event?.guests.filter(guest => guest.confirmed) ?? []
  const notConfirmed = event?.guests.filter(guest => !guest.confirmed) ?? []

  const total = confirmed?.reduce((total: number, guest: Guest) => {
    return total + guest.companionAmount + 1
  }, 0) ?? 0

  function loadEvent() {
    const event = events_seed.find(event => event.id === id && event.password === password)

    setEvent(event ?? null)
  }

  useEffect(() => {
    loadEvent()
  }, [id, password])

  return (
    <div className="flex flex-col items-center">
      {event ? (
        <EventDashboard confirmed={confirmed} notConfirmed={notConfirmed} total={total} event={event} />
      ) : (
        <PasswordEventForm />
      )}
    </div>
  )
}