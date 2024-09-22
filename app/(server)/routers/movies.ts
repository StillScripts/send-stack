import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Elysia, t } from 'elysia'

import { movies } from '@/db/schema'
import BaseController from '@/lib/base-controller'

const prefix = '/movies'
const frontendPrefix = prefix

/** Control how the application can interact with the `movies` model */
class MoviesController extends BaseController<typeof movies> {
	constructor() {
		super(movies)
	}
}

export const moviesRouter = new Elysia({ prefix })
	.decorate({
		MoviesController: new MoviesController()
	})
	.get('/', async ({ MoviesController }) => await MoviesController.index())
	.get(
		'/:id',
		async ({ MoviesController, params: { id } }) =>
			await MoviesController.show(id)
	)
	.post(
		'/',
		async ({ MoviesController, body }) => {
			await MoviesController.create(body)
		},
		{
			body: t.Object({ title: t.String(), releaseYear: t.Number() }),
			afterHandle() {
				revalidatePath(frontendPrefix)
				redirect(frontendPrefix)
			}
		}
	)
	.patch(
		'/:id',
		async ({ MoviesController, params: { id }, body }) => {
			await MoviesController.update(id, body)
		},
		{
			body: t.Partial(t.Object({ title: t.String(), releaseYear: t.Number() })),
			afterHandle() {
				revalidatePath(frontendPrefix)
			}
		}
	)
	// delete
	.delete(
		'/:id',
		async ({ MoviesController, params: { id } }) => {
			await MoviesController.delete(id)
		},
		{
			afterHandle() {
				revalidatePath(frontendPrefix)
			}
		}
	)
