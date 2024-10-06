import { migrate } from 'drizzle-orm/libsql/migrator'

import { db } from '.'

export const setupDB = async () => {
	await migrate(db, { migrationsFolder: './migrations' })
}
