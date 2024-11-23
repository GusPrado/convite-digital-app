import { Id } from "../../shared";
import Guest from "../model/Guest";
import validateGuest from "./validateGuest";

export default function complementGuest(guest: Partial<Guest>): Guest {
  const validate = validateGuest(guest)

  if (validate.length > 0) {
    throw new Error(validate.join('\n'))
  }

  const confirmed = guest.confirmed ?? false
  const hasCompanion = guest.companion ?? false

  const companionQuantity = guest.companionAmount ?? 0
  const companionValidated = hasCompanion && confirmed && companionQuantity > 0

  const updatedGuest: Guest = {
    ...guest,
    id: guest.id ?? Id.new(),
    companionAmount: companionValidated ? companionQuantity : 0,
    companion: companionValidated
  } as Guest

  return updatedGuest
}