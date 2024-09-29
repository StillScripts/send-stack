export const controllerSample = `import { movies } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/movies'
const frontendPrefix = prefix

export class MoviesController extends BaseController<typeof movies> {
	constructor() {
		super(movies, frontendPrefix)
	}
}`

export const routerSample = `import { Elysia, t } from 'elysia'

import {
	MoviesController,
	prefix
} from '@/app/(server)/controllers/movies.controller'
import { moviesBackendSchema } from '@/app/(server)/validators/movies.validator'

export const moviesRouter = new Elysia({ prefix })
	.decorate({
		MoviesController: new MoviesController()
	})
	.get('/', async ({ MoviesController }) => {
		return await MoviesController.index()
	})
	.get('/:id', async ({ MoviesController, params: { id } }) => {
		return await MoviesController.show(id)
	})
	.post(
		'/',
		async ({ MoviesController, body }) => {
			await MoviesController.create(body)
		},
		{
			body: moviesBackendSchema
		}
	)
	.patch(
		'/:id',
		async ({ MoviesController, params: { id }, body }) => {
			await MoviesController.update(id, body)
		},
		{
			body: t.Partial(moviesBackendSchema)
		}
	)
	.delete('/:id', async ({ MoviesController, params: { id } }) => {
		await MoviesController.delete(id)
	})
`

export const validatorSample = `import { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-typebox'

import { movies } from '@/db/schema'

import { withoutId } from '@/lib/utils'

export type Movie = InferSelectModel<typeof movies>

export const moviesBackendSchema = withoutId(createInsertSchema(movies))

export const moviesFrontendSchema = withoutId(createInsertSchema(movies))`
