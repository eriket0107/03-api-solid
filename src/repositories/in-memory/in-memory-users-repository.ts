import { Prisma, User } from '@prisma/client'

import { UserRepository } from '../user-repository'

export class InMemoryUsersRepository implements UserRepository {
  public dataBase: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '12341223',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.dataBase.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.dataBase.find((data) => data.email === email)

    if (!user) return null

    return user
  }

  async findById(id: string) {
    const user = this.dataBase.find((data) => data.id === id)

    if (!user) return null

    return user
  }
}
