import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it } from 'vitest'

import { GymRepository } from '@/repositories/gym-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { FetchNearByGymsUseCase } from './fetch-nearby-gyms-use-case'

let gymsRepository: GymRepository
let sut: FetchNearByGymsUseCase

describe('Fetch  Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it.only('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      latitude: new Decimal(-23.0096263),
      longitude: new Decimal(-43.4395738),
    })

    await gymsRepository.create({
      name: 'Far Gym',
      latitude: new Decimal(-22.9365434),
      longitude: new Decimal(-43.1800878),
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.0096263,
      userLongitude: -43.4395738,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
