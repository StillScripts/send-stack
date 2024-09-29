import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const createdAndUpdated = {
	createdAt: integer('created_at', { mode: 'number' })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'number' })
		.$onUpdate(() => sql`strftime('%s', 'now')`)
		.default(sql`(strftime('%s', 'now'))`)
		.notNull()
}

export const movies = sqliteTable('movies', {
	id: integer('id').primaryKey(),
	title: text('name'),
	releaseYear: integer('release_year')
	//...createdAndUpdated
})
