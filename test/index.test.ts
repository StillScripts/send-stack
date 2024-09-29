// test/index.test.ts
import { describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'

describe('Elysia', () => {
	it('return a response', async () => {
		const response = await app
			.handle(new Request('http://localhost/api'))
			.then(res => res.text())

		expect(response).toBe('THE SEND STACK')
	})
	it('return a response', async () => {
		const response = await app
			.handle(new Request('http://localhost/api/movies'))
			.then(res => res.text())
		console.log(response)

		expect(true).toBe(true)
	})
})
