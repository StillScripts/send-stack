import { InferSelectModel } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'

import { movies } from '@/db/schema'

import { withoutId } from '@/lib/utils'

export type Movie = InferSelectModel<typeof movies>

export const moviesBackendSchema = withoutId(createSelectSchema(movies))

export const moviesFrontendSchema = t.Object({
	title: t.String(),
	releaseYear: t.String()
})
