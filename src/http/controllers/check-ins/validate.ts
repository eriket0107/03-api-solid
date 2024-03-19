import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateChecInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const valideCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = valideCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateChecInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
