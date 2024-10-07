import type { Route } from 'next'
import { revalidatePath } from 'next/cache'

import { eq, type InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { SQLiteTable } from 'drizzle-orm/sqlite-core' // or MySql, Postgres, etc...

import { db } from '@/db'

class BaseController<
	T extends SQLiteTable & {
		id: any
	}
> {
	db: typeof db
	model: T
	prefix: Route

	constructor(model: T, prefix: Route) {
		this.db = db
		this.model = model
		this.prefix = prefix
	}

	updateCache(id?: string | number) {
		if (process.env.NODE_ENV === 'test') {
			return
		}
		revalidatePath(this.prefix)
		revalidatePath(`/admin${this.prefix}`)
		if (id) {
			revalidatePath(`${this.prefix}/${id}`)
			revalidatePath(`/admin${this.prefix}/edit/${id}`)
		}
	}

	async index(): Promise<Array<InferSelectModel<T>>> {
		return await this.db.select().from(this.model)
	}

	async show(id: string | number): Promise<InferSelectModel<T>> {
		const result = await this.db
			.select()
			.from(this.model)
			.where(eq(this.model.id, id))
			.limit(1)
		return result[0]
	}

	async create(data: InferInsertModel<T>) {
		const [result] = await this.db.insert(this.model).values(data).returning()
		this.updateCache()
		return result
	}

	async update(
		id: string | number,
		data: Partial<Omit<InferInsertModel<T>, 'id'>>
	) {
		const [result] = await this.db
			.update(this.model)
			.set(data as any)
			.where(eq(this.model.id, id))
			.returning()
		this.updateCache(id)
		return result
	}

	async delete(id: string) {
		const [result] = await this.db
			.delete(this.model)
			.where(eq(this.model.id, id))
			.returning()
		this.updateCache(id)
		return result
	}
}

export default BaseController
