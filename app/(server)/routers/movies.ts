import { Elysia, t } from 'elysia'

import { movies } from '@/db/schema'
import BaseController from '@/lib/base-controller'

const prefix = '/movies'
const frontendPrefix = prefix

/** Control how the application can interact with the `movies` model */
class MoviesController extends BaseController<typeof movies> {
	constructor() {
		super(movies, frontendPrefix)
	}
}

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
			return await MoviesController.create(body)
		},
		{
			body: t.Object({ title: t.String(), releaseYear: t.Number() })
		}
	)
	.patch(
		'/:id',
		async ({ MoviesController, params: { id }, body }) => {
			await MoviesController.update(id, body)
		},
		{
			body: t.Partial(t.Object({ title: t.String(), releaseYear: t.Number() }))
		}
	)
	.delete('/:id', async ({ MoviesController, params: { id } }) => {
		await MoviesController.delete(id)
	})
