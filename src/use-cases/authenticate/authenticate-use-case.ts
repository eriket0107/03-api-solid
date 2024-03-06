import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'

import { UserRepository } from '@/repositories/user-repository'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}
type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

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
