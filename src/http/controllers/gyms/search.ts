import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchGymQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    page,
    query,
  })

  return reply.status(200).send({
    gyms,
  })
}
