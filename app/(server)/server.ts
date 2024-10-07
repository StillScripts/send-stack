import { revalidatePath } from 'next/cache'

import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'

import { blogsRouter } from './routers/blogs.router'
import { usersRouter } from './routers/users.router'

export const app = new Elysia({ prefix: '/api' })
	.use(swagger())
	.get('/', () => ({ title: 'THE SEND STACK' }))
	.use(usersRouter)
	.use(blogsRouter)
	.post(
		'/revalidate',
		({ body }) => {
			console.log(body.path)
			if (body.path) revalidatePath(body.path)
		},
		{
			body: t.Object({ path: t.String() })
		}
	)

export type App = typeof app
