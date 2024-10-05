import { treaty } from '@elysiajs/eden'
import { Database } from 'bun:sqlite'
import { beforeEach, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { DB_URL } from '@/db'

const client = treaty(app)

const db = new Database(DB_URL)

const sample = {
	title: 'Lord of the Rings: Return of the King',
	releaseYear: 2003
}

describe('movies router', () => {
	beforeEach(() => {
		const query = db.query('DELETE FROM movies;')
		query.get()
	})
	it('creates a movie', async () => {
		const { error } = await client.api.movies.index.post(sample)
		expect(error).toBe(null)

		const response = await client.api.movies.index.get()
		expect(response.error).toBe(null)
		const movies = response.data ?? []
		expect(movies.length).toBe(1)
		expect(movies[0].title).toBe(sample.title)
	})
	it('updates a movie', async () => {
		await client.api.movies.index.post(sample)
		const response = await client.api.movies.index.get()
		const movies = response.data ?? []
		const id = movies[0]?.id!
		const { error } = await client.api
			.movies({ id })
			.patch({ title: 'New Title' })
		expect(error).toBe(null)
		const single = await client.api.movies({ id }).get()
		expect(single?.data?.title).toBe('New Title')
	})
	it('deletes a movie', async () => {
		await client.api.movies.index.post(sample)
		const response = await client.api.movies.index.get()
		const movies = response.data ?? []
		expect(movies.length).toBe(1)
		const id = movies[0]?.id!
		const { error } = await client.api.movies({ id }).delete()
		expect(error).toBe(null)
		const response2 = await client.api.movies.index.get()
		expect(response2.data?.length).toBe(0)
	})
})
