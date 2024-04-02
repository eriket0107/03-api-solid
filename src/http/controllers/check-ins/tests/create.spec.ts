import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAutheticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        name: 'Gym Check-In',
        description: 'Some',
        phone: '21999999999',
        latitude: -23.0096263,
        longitude: -43.4395738,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.0096263,
        longitude: -43.4395738,
      })

    expect(response.statusCode).toEqual(201)
  })
})
