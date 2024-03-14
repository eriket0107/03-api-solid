import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'

import { GetUserMetricsUseCase } from './get-user-metrics-use-case'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get user check-ins count from metrics', async () => {
    for (let i = 1; i <= 5; i++) {
      await checkInRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { checkInsCount } = await sut.execute({
      userId: 'user_01',
    })

    expect(checkInsCount).toEqual(5)
  })
})
