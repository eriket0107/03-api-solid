import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

import { FetchNearByGymsUseCase } from '../fetch-nearby-gyms/fetch-nearby-gyms-use-case'

export const makeFetchNearbyGymsUseCase = () => {
  const gymRepository = new PrismaGymRepository()
  const useCase = new FetchNearByGymsUseCase(gymRepository)

  return useCase
}
