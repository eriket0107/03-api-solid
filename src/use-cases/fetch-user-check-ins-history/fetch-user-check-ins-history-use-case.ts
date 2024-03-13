import { CheckIn } from '@prisma/client'

import { CheckInRepository } from '@/repositories/check-in-repository'

type FetchUserCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
    return {
      checkIns,
    }
  }
}
