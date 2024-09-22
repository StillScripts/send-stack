import { Elysia } from 'elysia'

import swagger from '@elysiajs/swagger'
import { moviesRouter } from './routers/movies.router'

export const app = new Elysia({ prefix: '/api' })
	.use(swagger())
	.use(moviesRouter)
	.get('/', () => 'THE SEND STACK')

export type App = typeof app
