import { defineConfig } from 'drizzle-kit'

import { DB_URL } from './db'

export default defineConfig({
	schema: './db/schema.ts',
	out: './migrations',
	dialect: 'sqlite',
	dbCredentials: {
		url: DB_URL
	}
})
