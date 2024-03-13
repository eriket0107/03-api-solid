import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInRepository } from '@/repositories/check-in-repository'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-use-case'

let checkInRepository: CheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    await checkInRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })

    await checkInRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1,
    })

    console.log(checkIns)

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_01' }),
      expect.objectContaining({ gym_id: 'gym_02' }),
    ])
  })

  it.only('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
