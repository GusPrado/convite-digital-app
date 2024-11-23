export default class EventDate {
  static format(date: Date = new Date()): string {
    const pad = (n: number) => n.toString().padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hour = pad(date.getHours())
    const minute = pad(date.getMinutes())

    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  static parse(date: string): Date {
    const [year, month, day] = date.split('T')[0].split('-')
    const [hour, minute] = date.split('T')[1].split(':')

    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute), 
    )
  }
 }

 console.log(EventDate.parse('2024-11-19T20:10'))