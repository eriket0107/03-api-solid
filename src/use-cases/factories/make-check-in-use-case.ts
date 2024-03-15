import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

import { CheckInUseCase } from '../check-in/check-in-use-case'

export const makeCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymRepository)

  return useCase
}
