import { and, eq, isNull } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'

import { verifyToken } from './session'

export async function getUser(
	sessionCookie: { name?: string; value?: string } | null
) {
	if (!sessionCookie || !sessionCookie.value) {
		return null
	}

	const sessionData = await verifyToken(sessionCookie.value)
	if (
		!sessionData ||
		!sessionData.user ||
		typeof sessionData.user.id !== 'number'
	) {
		return null
	}

	if (new Date(sessionData.expires) < new Date()) {
		return null
	}

	const user = await db
		.select()
		.from(users)
		.where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
		.limit(1)

	if (user.length === 0) {
		return null
	}

	return user[0]
}
