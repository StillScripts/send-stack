import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import { moviesRouter } from '@/app/(server)/routers/movies.router'

import { usersRouter } from './routers/users.router'

export const app = new Elysia({ prefix: '/api' })
	.use(swagger())
	.use(moviesRouter)
	.use(usersRouter)
	.get('/', () => 'THE SEND STACK')

export type App = typeof app
