import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from '@prisma/client'
import { Environment } from 'vitest'

const generateDataBaseUrl = (schema: string) => {
  if (!process.env.DATABASE_URL)
    throw new Error('Provide a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  transformMode: 'web',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dataBaseURL = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = dataBaseURL

    execSync('npx prisma migrate deploy')

    console.log('Executou')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
