import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/veriy-user-role'

import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/checkIns/:checkInId/validate',
    { onRequest: [verifyUserRole(['ADMIN', 'MANAGER'])] },
    validate,
  )
}
