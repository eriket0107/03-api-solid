import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to autheticate', async () => {
    const createdUser = await userRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(
      await sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
