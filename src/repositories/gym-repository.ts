import { Gym, Prisma } from '@prisma/client'

export type FindManyNearByParams = {
  latitude: number
  longitude: number
}

export type GymRepository = {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
