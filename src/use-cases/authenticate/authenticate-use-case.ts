import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'

import { UserRepository } from '@/repositories/user-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

type AutheticateUseCaseRequest = {
  email: string
  password: string
}

type AutheticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await bcryptjs.compare(
      password,
      user.password_hash,
    )

    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      user,
    }
  }
}
