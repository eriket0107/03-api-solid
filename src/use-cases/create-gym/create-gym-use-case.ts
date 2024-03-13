import { Gym } from '@prisma/client'

import { GymRepository } from '@/repositories/gym-repository'

type CreateGymUseCaseRequest = {
  name: string
  description?: string | null
  phone: string
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
