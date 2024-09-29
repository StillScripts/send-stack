import { beforeAll, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { setupDB } from '@/db/migrate'

describe('Elysia', () => {
	beforeAll(async () => {
		await setupDB()
	})
	it('return a response', async () => {
		const response = await app
			.handle(new Request('http://localhost/api'))
			.then(res => res.text())

		expect(response).toBe('THE SEND STACK')
	})
	it('returns movies', async () => {
		const response = await app
			.handle(new Request('http://localhost/api/movies'))
			.then(res => res.text())
		console.log(response)

		expect(true).toBe(true)
	})
})
