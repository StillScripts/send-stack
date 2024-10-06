import { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-typebox'
import { t } from 'elysia'

import { users } from '@/db/schema'
import { withoutDefaults } from '@/lib/utils'

export type User = InferSelectModel<typeof users>

export const usersBackendSchema = withoutDefaults(createInsertSchema(users))

export const usersFrontendSchema = t.Object({
	email: t.String(),
	password: t.String()
})
