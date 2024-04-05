import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/veriy-user-role'

import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRole(['ADMIN', 'MANAGER'])] },
    create,
  )
}
