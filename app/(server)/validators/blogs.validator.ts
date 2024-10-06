import { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-typebox'

import { blogs } from '@/db/schema'
import { withoutDefaults } from '@/lib/utils'

export type Blog = InferSelectModel<typeof blogs>

export const blogsBackendSchema = withoutDefaults(createInsertSchema(blogs))

export const blogsFrontendSchema = withoutDefaults(createInsertSchema(blogs))
