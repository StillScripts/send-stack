import { revalidatePath } from 'next/cache'

import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'

import { moviesRouter } from '@/app/(server)/routers/movies.router'

import { usersRouter } from './routers/users.router'

export const app = new Elysia({ prefix: '/api' })
	.use(swagger())
	.use(moviesRouter)
	.use(usersRouter)
	.get('/', () => 'THE SEND STACK')
	.post(
		'/revalidate',
		({ body }) => {
			if (body.path) revalidatePath(body.path)
		},
		{
			body: t.Object({ path: t.String() })
		}
	)

export type App = typeof app
