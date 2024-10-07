import { treaty } from '@elysiajs/eden'
import { beforeAll, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { setupDB } from '@/db/migrate'

const client = treaty(app)

describe('Elysia', () => {
	beforeAll(async () => {
		await setupDB()
	})
	it('return a response', async () => {
		const { data, error } = await client.api.index.get()
		expect(error).toBe(null)
		expect(data?.length).toBe(4)
		expect(data![1].heading).toBe('Elysia.js')
	})
})
