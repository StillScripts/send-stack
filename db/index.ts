import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'

export const DB_URL =
	process.env.NODE_ENV === 'test' ? 'test-sqlite.db' : 'sqlite.db'

config({ path: '.env' })
const client = createClient({
	url: process.env.TURSO_CONNECTION_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!
})
export const db = drizzle(client)
