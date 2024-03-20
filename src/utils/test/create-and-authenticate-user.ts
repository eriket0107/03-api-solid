import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAutheticateUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
