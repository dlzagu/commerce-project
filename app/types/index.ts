import { User, Product } from '@prisma/client'

export type SafeUser = Omit<
  User,
  'createdAt' | 'emailVerified' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SafeProduct = Omit<Product, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt?: string
}
