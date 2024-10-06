import { relations, sql } from 'drizzle-orm'
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

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull().default('member'),
	...createdAndUpdated,
	deletedAt: integer('deleted_at', { mode: 'number' })
})

export const blogs = sqliteTable('blogs', {
	id: integer('id').primaryKey(),
	title: text('title'),
	content: text('content'),
	userId: integer('user_id').references(() => users.id),
	...createdAndUpdated
})

export const movies = sqliteTable('movies', {
	id: integer('id').primaryKey(),
	title: text('name'),
	releaseYear: integer('release_year'),
	...createdAndUpdated
})

export const blogsRelations = relations(blogs, ({ one }) => ({
	user: one(users, {
		fields: [blogs.userId],
		references: [users.id]
	})
}))

export const usersRelations = relations(users, ({ many }) => ({
	blogs: many(blogs)
}))
