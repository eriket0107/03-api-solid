import { describe } from 'node:test'

import request from 'supertest'
import { afterAll, beforeAll, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAutheticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JS Gym',
        description: 'Some description',
        phone: '21999999999',
        latitude: -23.0096263,
        longitude: -43.4395738,
      })

    expect(response.statusCode).toEqual(201)
  })
})
