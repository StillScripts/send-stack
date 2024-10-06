import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'

export const DB_URL =
	process.env.NODE_ENV === 'test' ? 'test-sqlite.db' : 'sqlite.db'

config({ path: '.env' })

function getDbConfig() {
	if (process.env.NODE_ENV === 'test') {
		return {
			url: process.env.TEST_TURSO_CONNECTION_URL!,
			authToken: process.env.TEST_TURSO_AUTH_TOKEN!
		}
	}
	return {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
}

const dbConfig = getDbConfig()
const client = createClient(dbConfig)
export const db = drizzle(client)
