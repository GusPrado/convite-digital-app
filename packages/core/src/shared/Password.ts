export default class Password {
  static create(size: number = 8): string {
    const lowercase = 'abcdefghijklmnopqrstuvxywz'
    const uppercase = lowercase.toUpperCase()
    const numbers = '0123456789'
    const special = '!@#$%&*'

    const groups = [lowercase, uppercase, numbers, special]

    const password = []

    for (let i = 0; i < size; i++) {

      const group = groups[Math.floor(Math.random() * groups.length)]
  
      password.push(group[Math.floor(Math.random() * group.length)])
    }

    return password.join('')
  }
}


