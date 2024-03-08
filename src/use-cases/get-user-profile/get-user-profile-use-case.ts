import { User } from '@prisma/client'

import { UserRepository } from '@/repositories/user-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type GetUserProfileCaseRequest = {
  userId: string
}
type GetUserProfileCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
