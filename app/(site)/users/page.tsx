import type { Metadata } from 'next'
import Link from 'next/link'

import { client } from '@/app/(site)/client'
import { UserCard } from '@/app/(site)/users/_components/user-card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Users'
}

export default async function UsersPage() {
	const { data, error } = await client.api.users.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">Users</h1>
				<Button variant="outline" asChild>
					<Link href="/users/new">Add New User</Link>
				</Button>
			</div>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(user => <UserCard key={user.id} user={user} />)}
			</div>
		</div>
	)
}
