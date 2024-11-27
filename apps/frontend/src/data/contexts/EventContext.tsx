'use client'
import { createEmptyEvent, createEmptyGuest, Event, EventDate, Guest } from "core";
import { createContext, useCallback, useEffect, useState } from "react";
import useAPI from "../hooks/useApi";
import { useRouter } from "next/router";

export interface EventContextProps {
  event: Partial<Event>
  guest: Partial<Guest>
  validAlias: boolean

  changeEvent(event: Partial<Event>): void
  changeGuest(guest: Partial<Guest>): void
  loadEvent(idOrAlias: string): Promise<void> 
  saveEvent(): Promise<void>
  addGuest(): void
}

const EventContext = createContext<EventContextProps>({} as any)

export function EventContextProvider(props: any) {

  const {httpGet, httpPost} = useAPI()
  const router = useRouter()

  const [validAlias, setValidAlias] = useState(true)
  const [event, setEvent] = useState<Partial<Event>>(createEmptyEvent())
  const [guest, setGuest] = useState<Partial<Guest>>(createEmptyGuest())

  const saveEvent = useCallback(async function () {
    try{
      const createdEvent = await httpPost('/events', event)
    router.push('/event/success')
    setEvent({
      ...createdEvent,
      date: EventDate.parse(createdEvent.date)
    })
    } catch (error) {
      //TODO: Implement error handler
      console.log(error)
    }
    
  }, [event, httpPost, router])

  const loadEvent = useCallback(async function(idOrAlias: string) {
    try {
      const event = await httpGet(`/events/${idOrAlias}`)
      setEvent({
        ...event,
        date: EventDate.parse(event.date)
      })
    } catch (error) {
      //TODO: Implement error handler
      console.log(error)
    }
  }, [httpGet, setEvent])

  const addGuest = useCallback(async function() {
    await httpPost(`/events/${event.alias}/guest`, guest)
    router.push('/invite/thanks')
  }, [httpPost, event, guest, router])

  const validateAlias = useCallback(async function() {
    try {
      const { valid } = await httpGet(`/events/validate/${event.alias}/${event.id}`)

      setValidAlias(valid)
    } catch (error) {
      //TODO: Implement error handler
      console.log(error)
    }
  }, [httpGet, event])

  useEffect(() => {
    if (event?.alias) validateAlias()
  }, [event?.alias, validateAlias])

  return <EventContext.Provider value={{
    event,
    guest,
    validAlias,
    changeEvent: setEvent,
    changeGuest: setGuest,
    saveEvent,
    loadEvent,
    addGuest
  }}>
    {props.children}
  </EventContext.Provider>
}

export default EventContext 