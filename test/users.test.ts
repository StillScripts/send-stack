import { treaty } from '@elysiajs/eden'
import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { db } from '@/db'
import { setupDB } from '@/db/migrate'
import { users } from '@/db/schema'

const client = treaty(app)

const sample = {
	email: 'test@test.com',
	password: 'testing'
}

describe('users router', () => {
	beforeAll(async () => {
		await setupDB()
	})
	beforeEach(() => {
		db.delete(users).run()
	})
	it('creates a user', async () => {
		await client.api.users.signup.post(sample)
		const response = await client.api.users.index.get()
		expect(response.error).toBe(null)
		const users = response.data ?? []
		expect(users.length).toBe(1)
		expect(users[0].email).toBe(sample.email)
	})
	it('updates a user', async () => {
		await client.api.users.signup.post(sample)
		const response = await client.api.users.index.get()
		const users = response.data ?? []
		const id = users[0]?.id!
		const { error } = await client.api
			.users({ id })
			.patch({ email: 'test2@test.com' })
		expect(error).toBe(null)
		const single = await client.api.users({ id }).get()
		expect(single?.data?.email).toBe('test2@test.com')
	})
	it('deletes a user', async () => {
		await client.api.users.signup.post(sample)
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
