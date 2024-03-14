import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { SearchGymUseCase } from './search-gyms-use-case'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', async () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to search by name', async () => {
    await gymRepository.create({
      name: 'TS Gym',
      latitude: -23.0096263,
      longitude: -43.4395738,
    })

    await gymRepository.create({
      name: 'JS Gym',
      latitude: -23.0096263,
      longitude: -43.4395738,
    })

    const { gyms } = await sut.execute({
      query: 'JS Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'JS Gym',
      }),
    ])
  })

  it.only('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        name: `JS Gym ${i}`,
        latitude: -23.0096263,
        longitude: -43.4395738,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'JS Gym 21' }),
      expect.objectContaining({ name: 'JS Gym 22' }),
    ])
  })
})
