import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

export const DB_URL =
	process.env.NODE_ENV === 'test' ? 'test-sqlite.db' : 'sqlite.db'

const sqlite = new Database(DB_URL)
export const db = drizzle(sqlite)
