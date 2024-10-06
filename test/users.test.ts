import { treaty } from '@elysiajs/eden'
import { Database } from 'bun:sqlite'
import { beforeEach, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { DB_URL } from '@/db'

const client = treaty(app)

const db = new Database(DB_URL)

const sample = { name: 'Aragorn' }

describe('users router', () => {
	beforeEach(() => {
		const query = db.query('DELETE FROM users;')
		query.get()
	})
	it('creates a user', async () => {
		const { error } = await client.api.users.index.post({ name: 'Aragorn' })
		expect(error).toBe(null)

		const response = await client.api.users.index.get()
		expect(response.error).toBe(null)
		const users = response.data ?? []
		expect(users.length).toBe(1)
		expect(users[0].name).toBe(sample.name)
	})
	it('updates a user', async () => {
		await client.api.users.index.post(sample)
		const response = await client.api.users.index.get()
		const users = response.data ?? []
		const id = users[0]?.id!
		const { error } = await client.api
			.users({ id })
			.patch({ name: 'New Title' })
		expect(error).toBe(null)
		const single = await client.api.users({ id }).get()
		expect(single?.data?.name).toBe('New Title')
	})
	it('deletes a user', async () => {
		await client.api.users.index.post(sample)
		const response = await client.api.users.index.get()
		const users = response.data ?? []
		expect(users.length).toBe(1)
		const id = users[0]?.id!
		const { error } = await client.api.users({ id }).delete()
		expect(error).toBe(null)
		const response2 = await client.api.users.index.get()
		expect(response2.data?.length).toBe(0)
	})
})
