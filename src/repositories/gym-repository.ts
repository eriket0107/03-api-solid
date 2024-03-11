import { Gym } from '@prisma/client'

export type GymRepository = {
  findById(id: string): Promise<Gym | null>
}
