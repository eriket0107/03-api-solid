import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { GymRepository } from '../gym-repository'

export class InMemoryGymsRepository implements GymRepository {
  public dataBase: Gym[] = []

  async findById(id: string) {
    const gym = this.dataBase.find((data) => data.id === id)

    if (!gym) return null

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.dataBase.push(gym)

    return gym
  }
}
