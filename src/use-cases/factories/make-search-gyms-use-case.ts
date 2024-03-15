import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

import { SearchGymUseCase } from '../search-gyms/search-gyms-use-case'

export const makeSearchGymsUseCase = () => {
  const gymRepository = new PrismaGymRepository()
  const useCase = new SearchGymUseCase(gymRepository)

  return useCase
}
