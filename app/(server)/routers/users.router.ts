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
	.post(
		'/me',
		async ({ UsersController, body }) => {
			console.log(22)
			console.log(body)
			return await UsersController.getUser(body)
		},
		{
			body: t.Optional(t.Object({ name: t.String(), value: t.String() }))
		}
	)
	.get('/:id', async ({ UsersController, params: { id } }) => {
		return await UsersController.show(id)
	})
	.post(
		'/signup',
		async ({ UsersController, body }) => {
			await UsersController.signUp(body)
		},
		{
			body: usersFrontendSchema
		}
	)
	.post(
		'/signin',
		async ({ UsersController, body }) => {
			await UsersController.signIn(body)
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
