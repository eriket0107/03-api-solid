import { Gym } from '@prisma/client'

import { GymRepository } from '@/repositories/gym-repository'

type SearchGymUseCaseRequest = {
  query: string
  page: number
}
type SearchGymUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
