import Guest from "../model/Guest"


export default function validateGuest(guest: Partial<Guest>): string[] {
  const errors: string[] = []

  if (!guest.name) {
    errors.push('Name is required.')
  }

  if (!guest.email) {
    errors.push('E-mail is required.')
  }

  if (!guest.confirmed) {
    errors.push('Confirmation is required')
  }

  if (guest.confirmed && !guest.companion) {
    errors.push('Companion is required')
  }

  return errors
}


