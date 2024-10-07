import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

import { getDbConfig } from './db'

config({ path: '.env' })

console.log(process.env.NODE_ENV)
console.log(getDbConfig())

export default defineConfig({
	schema: './db/schema.ts',
	out: './migrations',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: getDbConfig()
})
