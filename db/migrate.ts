import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { DB_URL } from '.'

const sqlite = new Database(DB_URL)
const db = drizzle(sqlite)
await migrate(db, { migrationsFolder: './migrations' })

export const setupDB = async () => {
	await migrate(db, { migrationsFolder: './migrations' })
}
