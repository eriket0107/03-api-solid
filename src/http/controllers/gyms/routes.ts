import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/serach', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
