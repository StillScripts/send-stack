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
		const { data } = await client.api.index.get()
		expect(data?.title).toBe('THE SEND STACK')
	})
})
