import { noPlural } from '@/lib/utils'

export const backendTests = (modelName: string) => {
	return `import { treaty } from '@elysiajs/eden'
import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'

import { app } from '@/app/(server)/server'
import { db } from '@/db'
import { setupDB } from '@/db/migrate'
import { ${modelName} } from '@/db/schema'

const client = treaty(app)

const sample = {
	title: 'Lord of the Rings: Return of the King',
}

describe('${modelName} router', () => {
	beforeAll(async () => {
		await setupDB()
	})
	beforeEach(() => {
		db.delete(${modelName}).run()
	})
	it('creates a ${noPlural(modelName)}', async () => {
		const { error } = await client.api.${modelName}.index.post(sample)
		expect(error).toBe(null)

		const response = await client.api.${modelName}.index.get()
		expect(response.error).toBe(null)
		const ${modelName} = response.data ?? []
		expect(${modelName}.length).toBe(1)
		expect(${modelName}[0].title).toBe(sample.title)
	})
	it('updates a ${noPlural(modelName)}', async () => {
		await client.api.${modelName}.index.post(sample)
		const response = await client.api.${modelName}.index.get()
		const ${modelName} = response.data ?? []
		const id = ${modelName}[0]?.id!
		const { error } = await client.api
			.${modelName}({ id })
			.patch({ title: 'New Title' })
		expect(error).toBe(null)
		const single = await client.api.${modelName}({ id }).get()
		expect(single?.data?.title).toBe('New Title')
	})
	it('deletes a ${noPlural(modelName)}', async () => {
		await client.api.${modelName}.index.post(sample)
		const response = await client.api.${modelName}.index.get()
		const ${modelName} = response.data ?? []
		expect(${modelName}.length).toBe(1)
		const id = ${modelName}[0]?.id!
		const { error } = await client.api.${modelName}({ id }).delete()
		expect(error).toBe(null)
		const response2 = await client.api.${modelName}.index.get()
		expect(response2.data?.length).toBe(0)
	})
})
`
}
