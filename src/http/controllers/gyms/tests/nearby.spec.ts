import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAutheticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Near Gym',
        description: 'Some nearby gyms',
        phone: '21999999999',
        latitude: -23.0096263,
        longitude: -43.4395738,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Near Gym',
        description: 'Some far gyms',
        phone: '21999999999',
        latitude: -22.9365434,
        longitude: -43.1800878,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.0096263,
        longitude: -43.4395738,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: 'Near Gym' }),
    ])
  })
})
