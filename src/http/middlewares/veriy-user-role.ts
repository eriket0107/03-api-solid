import { FastifyReply, FastifyRequest } from 'fastify'

type RolesToVerify = 'ADMIN' | 'USER' | 'MANAGER'

export const verifyUserRole = (roleToVerify: RolesToVerify[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
