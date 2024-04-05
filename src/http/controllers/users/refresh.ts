import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await reply.jwtSign(
    {
      sub: request.user.sub,
      role,
    },
    {
      sign: {
        expiresIn: '10m',
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { sub: request.user.sub, role },
    {
      sign: {
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
