import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './autheticate-controller'
import { profile } from './profile-controller'
import { register } from './register-controller'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /* Autheticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
