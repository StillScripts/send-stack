import { Elysia, t } from 'elysia'

import {
	prefix,
	UsersController
} from '@/app/(server)/controllers/users.controller'
import {
	usersBackendSchema,
	usersFrontendSchema
} from '@/app/(server)/validators/users.validator'

export const usersRouter = new Elysia({ prefix })
	.decorate({
		UsersController: new UsersController()
	})
	.get('/', async ({ UsersController }) => {
		return await UsersController.index()
	})
	.get('/:id', async ({ UsersController, params: { id } }) => {
		return await UsersController.show(id)
	})
	.post(
		'/',
		async ({ UsersController, body }) => {
			await UsersController.signup(body)
		},
		{
			body: usersFrontendSchema
		}
	)
	.patch(
		'/:id',
		async ({ UsersController, params: { id }, body }) => {
			await UsersController.update(id, body)
		},
		{
			body: t.Partial(usersBackendSchema)
		}
	)
	.delete('/:id', async ({ UsersController, params: { id } }) => {
		await UsersController.delete(id)
	})
