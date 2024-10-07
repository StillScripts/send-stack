import { revalidatePath } from 'next/cache'

import { Elysia, t } from 'elysia'

import { blogsRouter } from './routers/blogs.router'
import { usersRouter } from './routers/users.router'

export const app = new Elysia({ prefix: '/api' })
	.get('/', () => [
		{
			heading: 'ShadCN',
			text: 'Explore beautifully designed, accessible, and customizable React components.',
			url: 'https://ui.shadcn.com/docs'
		},
		{
			heading: 'Elysia.js',
			text: 'Build TypeScript-first, high-performance web services with ease.',
			url: 'https://elysiajs.com/quick-start.html'
		},
		{
			heading: 'Next.js',
			text: 'Learn about server-side rendering, routing, and API features in Next.js.',
			url: 'https://nextjs.org/docs'
		},
		{
			heading: 'Drizzle',
			text: 'Discover a lightweight, type-safe ORM for SQL databases in TypeScript.',
			url: 'https://orm.drizzle.team/docs/overview'
		}
	])
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
