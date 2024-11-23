import Guest from "./Guest"

export default interface Event {
  id: string
  alias: string
  password: string
  name: string
  date: Date
  location: string
  description: string
  image: string
  backgroundImage: string
  expectedPublic: number
  guests: Guest[]
}