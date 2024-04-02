import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'

describe.skip('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to search a gym', async () => {
    const { token } = await createAndAutheticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JS Gym',
        description: 'Some description',
        phone: '21999999999',
        latitude: -23.0096263,
        longitude: -43.4395738,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TS Gym',
        description: 'Some description',
        phone: '21999999999',
        latitude: -23.0096263,
        longitude: -43.4395738,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'TS Gym',
      })
      .set('Authorization', `Bearer ${token}`)

    console.log(response.body.gyms)
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms)
  })
})
