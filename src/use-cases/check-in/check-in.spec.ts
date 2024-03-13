import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-numbers-of-check-ins-error'
import { CheckInUseCase } from './check-in-use-case'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      name: 'JS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 2, 11, 7, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      async () =>
        await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
          userLongitude: 0,
        }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 2, 11, 7, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 2, 12, 7, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it.only('should not be able to check in on distant gym', async () => {
    gymRepository.dataBase.push({
      id: 'gym-02',
      name: 'JS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.0096263),
      longitude: new Decimal(-43.4395738),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.0108663,
        userLongitude: -43.3132931,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
