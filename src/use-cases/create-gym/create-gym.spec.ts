import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { CreateGymUseCase } from './create-gym-use-case'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      name: 'TS Gym',
      phone: '',
      description: '',
      latitude: -23.0096263,
      longitude: -43.4395738,
    })

    expect(gym.name).toEqual('TS Gym')
  })
})
