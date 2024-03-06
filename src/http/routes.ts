import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/autheticate-controller'
import { register } from './controllers/register-controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
