import { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-typebox'

import { users } from '@/db/schema'

import { withoutDefaults } from '@/lib/utils'

export type User = InferSelectModel<typeof users>

export const usersBackendSchema = withoutDefaults(createInsertSchema(users))

export const usersFrontendSchema = withoutDefaults(createInsertSchema(users))
