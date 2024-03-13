import { Gym, Prisma } from '@prisma/client'

export type GymRepository = {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
