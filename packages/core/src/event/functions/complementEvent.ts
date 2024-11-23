import { Id, Password } from "../../shared";
import Event from "../model/Event";
import validateEvent from "./validateEvent";

export default function complementEvent(partialEvent: Partial<Event>): Event {
  const validate = validateEvent(partialEvent)

  if (validate.length > 0) {
    throw new Error(validate.join('\n'))
  }

  const event: Event = {
    ...partialEvent,
    id: partialEvent.id ?? Id.new(),
    password: partialEvent.password ?? Password.create(15),
    expectedPublic: +(partialEvent.expectedPublic ?? 1)
  } as Event

  return event
}