import { Id } from "../../shared";
import Guest from "../model/Guest";


export default function createEmptyGuest(): Partial<Guest> {
  return {
    id: Id.new(),
    name: '',
    email: '',
    confirmed: true,
    companion: false,
    companionAmount: 0
  }
}