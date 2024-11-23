import Event from "./model/Event";
import Guest from "./model/Guest";
import complementEvent from "./functions/complementEvent";
import complementGuest from "./functions/complementGuest";
import createEmptyEvent from "./functions/createEmptyEvent";
import createEmptyGuest from "./functions/createEmptyGuest";

export type { Event, Guest }

export {
  createEmptyEvent, createEmptyGuest, complementEvent, complementGuest
}