import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'

config({ path: '.env' })

export function getDbConfig() {
	if (process.env.NODE_ENV === 'test') {
		return {
			url: process.env.TEST_TURSO_CONNECTION_URL!,
			authToken: process.env.TEST_TURSO_AUTH_TOKEN!
		}
	}
	if (process.env.NODE_ENV === 'development') {
		return {
			url: process.env.DEV_TURSO_CONNECTION_URL!,
			authToken: process.env.DEV_TURSO_AUTH_TOKEN!
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
