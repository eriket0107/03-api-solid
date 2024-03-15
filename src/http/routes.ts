import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/autheticate-controller'
import { profile } from './controllers/profile-controller'
import { register } from './controllers/register-controller'
import { verifyJwt } from './middlewares/verif-jwt'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /* Autheticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
