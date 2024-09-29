import { defineConfig } from 'drizzle-kit'

const url = process.env.NODE_ENV === 'test' ? 'test.db' : 'sqlite.db'
console.log(url)

export default defineConfig({
	schema: './db/schema.ts',
	out: './migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url
	}
})
