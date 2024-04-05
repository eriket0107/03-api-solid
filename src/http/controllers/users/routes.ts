import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './autheticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /* Autheticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
