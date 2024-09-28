import { Type } from '@sinclair/typebox'
import { InferSelectModel } from 'drizzle-orm'
import { t } from 'elysia'

import { movies } from '@/db/schema'

export type Movie = InferSelectModel<typeof movies>

export const moviesBackendSchema = t.Object({
	title: t.String(),
	releaseYear: t.Number()
})

export const moviesFrontendSchema = Type.Object({
	title: Type.String(),
	releaseYear: Type.String()
})
