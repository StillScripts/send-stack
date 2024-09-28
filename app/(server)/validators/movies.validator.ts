import { Type } from '@sinclair/typebox'
import { t } from 'elysia'

export const moviesBackendSchema = t.Object({
	title: t.String(),
	releaseYear: t.Number()
})

export const moviesFrontendSchema = Type.Object({
	title: Type.String(),
	releaseYear: Type.Number()
})
