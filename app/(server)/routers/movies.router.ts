import { Elysia, t } from 'elysia'

import {
	MoviesController,
	prefix
} from '@/app/(server)/controllers/movies.controller'

export const moviesRouter = new Elysia({ prefix })
	.decorate({
		MoviesController: new MoviesController()
	})
	.get('/', async ({ MoviesController }) => {
        return await MoviesController.index()
    })
	.get(
		'/:id',
		async ({ MoviesController, params: { id } }) => {
            return await MoviesController.show(id)
        }
	)
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
	.delete(
		'/:id',
		async ({ MoviesController, params: { id } }) => {
			await MoviesController.delete(id)
		}
	)