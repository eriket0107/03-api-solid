import { Gym } from '@prisma/client'

import { GymRepository } from '../gym-repository'

export class InMemoryGymsRepository implements GymRepository {
  public dataBase: Gym[] = []

  async findById(id: string) {
    const gym = this.dataBase.find((data) => data.id === id)

    if (!gym) return null

    return gym
  }
}
