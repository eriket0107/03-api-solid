import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'

import { ExpiredCheckInError } from '../errors/expired-check-in-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in-use-case'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validat Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const checkIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await sut.execute({
      checkInId: checkIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.dataBase[0].validated_at).toEqual(expect.any(Date))
  })
  it('should be able to validate a non-existent check-in', async () => {
    expect(
      async () =>
        await sut.execute({
          checkInId: 'non-existent-checkin-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 2, 14, 13, 40))

    const checkIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect(async () => {
      await sut.execute({
        checkInId: checkIn.id,
      })
    }).rejects.toBeInstanceOf(ExpiredCheckInError)
  })
})
