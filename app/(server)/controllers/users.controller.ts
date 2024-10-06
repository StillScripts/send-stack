import { eq } from 'drizzle-orm'

import { users } from '@/db/schema'
import { hashPassword, setSession } from '@/lib/auth/session'

import BaseController from './base.controller'

export const prefix = '/users'
const frontendPrefix = prefix

export class UsersController extends BaseController<typeof users> {
	constructor() {
		super(users, frontendPrefix)
	}

	async signup(data: { email: string; password: string }) {
		const { email, password } = data

		const existingUser = await this.db
			.select()
			.from(this.model)
			.where(eq(this.model.email, email))
			.limit(1)

		if (existingUser.length > 0) {
			return { error: 'Failed to create user. Please try again.' }
		}

		const passwordHash = await hashPassword(password)

		const newUser = {
			email,
			passwordHash,
			role: 'user'
		}

		const [createdUser] = await this.db
			.insert(users)
			.values(newUser)
			.returning()

		if (!createdUser) {
			return { error: 'Failed to create user. Please try again.' }
		}

		await setSession(createdUser)
	}
}
