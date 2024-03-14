import { Gym } from '@prisma/client'

import { GymRepository } from '@/repositories/gym-repository'

type FetchNearByGymsRequest = {
  userLatitude: number
  userLongitude: number
}

type FetchNearByGymsResponse = {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsRequest): Promise<FetchNearByGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
