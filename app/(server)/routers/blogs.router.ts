import { Elysia, t } from 'elysia'

import {
	BlogsController,
	prefix
} from '@/app/(server)/controllers/blogs.controller'
import { blogsBackendSchema } from '@/app/(server)/validators/blogs.validator'

export const blogsRouter = new Elysia({ prefix })
	.decorate({
		BlogsController: new BlogsController()
	})
	.get('/', async ({ BlogsController }) => {
		return await BlogsController.index()
	})
	.get('/:id', async ({ BlogsController, params: { id } }) => {
		return await BlogsController.show(id)
	})
	.post(
		'/',
		async ({ BlogsController, body }) => {
			await BlogsController.create(body)
		},
		{
			body: blogsBackendSchema
		}
	)
	.patch(
		'/:id',
		async ({ BlogsController, params: { id }, body }) => {
			await BlogsController.update(id, body)
		},
		{
			body: t.Partial(blogsBackendSchema)
		}
	)
	.delete('/:id', async ({ BlogsController, params: { id } }) => {
		await BlogsController.delete(id)
	})
