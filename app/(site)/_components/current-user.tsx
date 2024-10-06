'use client'

import { useUser } from '@/lib/auth/user-context'

export const CurrentUser = () => {
	const { user } = useUser()
	if (!user?.id) {
		return null
	}
	return (
		<div className="ml-4">
			<p>
				Logged in as <strong className="font-bold">{user?.email}</strong>
			</p>
		</div>
	)
}
