import { Prisma, User } from '@prisma/client'

export type UserRepository = {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
