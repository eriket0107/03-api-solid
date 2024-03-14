import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

import { CheckInRepository } from '@/repositories/check-in-repository'

import { ExpiredCheckInError } from '../errors/expired-check-in-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type ValidateCheckInUseCaseRequest = {
  checkInId: string
}
type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCreation > 20) throw new ExpiredCheckInError()

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
