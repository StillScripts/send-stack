'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/auth/user-context'

export const CurrentUser = () => {
	const { user } = useUser()
	if (!user?.id) {
		return (
			<div className="ml-4">
				<Button asChild variant="link">
					<Link href="/sign-in">Sign In</Link>
				</Button>
			</div>
		)
	}
	return (
		<div className="ml-4">
			<p>
				Logged in as&nbsp;
				<Button asChild className="pl-0" variant="link">
					<Link href="/admin/users">
						<strong className="font-bold">{user?.email}</strong>
					</Link>
				</Button>
			</p>
		</div>
	)
}
