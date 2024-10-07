import { treaty } from '@elysiajs/eden'
import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { db } from '@/db'
import { setupDB } from '@/db/migrate'
import { blogs, type InsertBlog } from '@/db/schema'

const client = treaty(app)

const sample = {
	title: 'Lord of the Rings: Return of the King',
	description: 'End of the trilogy',
	content: [
		{
			type: 'h1' as 'h1',
			text: 'For Frodo'
		}
	],
	userId: 1
}

describe('blogs router', () => {
	beforeAll(async () => {
		await setupDB()
		await client.api.users.signup.post({
			email: 'test@test.com',
			password: 'testing'
		})
	})
	beforeEach(() => {
		db.delete(blogs).run()
	})
	it('creates a blog', async () => {
		const { error } = await client.api.blogs.index.post(sample)
		expect(error).toBe(null)

		const response = await client.api.blogs.index.get()
		expect(response.error).toBe(null)
		const blogs = response.data ?? []
		expect(blogs.length).toBe(1)
		expect(blogs[0].title).toBe(sample.title)
	})
	it('updates a blog', async () => {
		await client.api.blogs.index.post(sample)
		const response = await client.api.blogs.index.get()
		const blogs = response.data ?? []
		const id = blogs[0]?.id!
		const { error } = await client.api
			.blogs({ id })
			.patch({ title: 'New Title' })
		expect(error).toBe(null)
		const single = await client.api.blogs({ id }).get()
		expect(single?.data?.title).toBe('New Title')
	})
	it('deletes a blog', async () => {
		await client.api.blogs.index.post(sample)
		const response = await client.api.blogs.index.get()
		const blogs = response.data ?? []
		expect(blogs.length).toBe(1)
		const id = blogs[0]?.id!
		const { error } = await client.api.blogs({ id }).delete()
		expect(error).toBe(null)
		const response2 = await client.api.blogs.index.get()
		expect(response2.data?.length).toBe(0)
	})
})
