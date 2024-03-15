import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

import { CreateGymUseCase } from '../create-gym/create-gym-use-case'

export const makeCreateGymUseCase = () => {
  const gymRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(gymRepository)

  return useCase
}
