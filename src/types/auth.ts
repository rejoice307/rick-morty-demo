import type { IdType } from './index'

export type UserType = {
  id: IdType
  name: string
  avatar?: string
  email: string
  token: string
}
