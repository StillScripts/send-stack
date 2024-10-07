import { InferSelectModel } from 'drizzle-orm'
import { t } from 'elysia'

import { blogs } from '@/db/schema'

export type Blog = InferSelectModel<typeof blogs>

const blogContentItem = t.Object({
	type: t.Union([
		t.Literal('h1'),
		t.Literal('h2'),
		t.Literal('h3'),
		t.Literal('h4'),
		t.Literal('h5'),
		t.Literal('h6'),
		t.Literal('paragraph')
	]),
	text: t.String()
})

const blogSchema = t.Object({
	title: t.String(),
	description: t.String(),
	content: t.Array(blogContentItem),
	userId: t.Integer()
})

export const blogsBackendSchema = blogSchema

export const blogsFrontendSchema = t.Omit(blogSchema, ['userId'])
