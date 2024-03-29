import { randomUUID } from 'node:crypto'

import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { CheckInRepository } from '../check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  public dataBase: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.dataBase.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.dataBase.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.dataBase
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(checkInId: string) {
    const checkIn = this.dataBase.find((checkIn) => checkIn.id === checkInId)

    if (!checkIn) return null

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.dataBase.filter((checkin) => checkin.user_id === userId).length
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.dataBase.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.dataBase[checkInIndex] = checkIn
    }

    return checkIn
  }
}
