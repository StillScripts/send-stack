import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { UserCard } from '@/app/(site)/admin/users/_components/user-card'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Users'
}

export default async function UsersPage() {
	const { data, error } = await client.api.users.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	const sessionCookie = cookies().get('session')
	const currentSession = await client.api.users.me.post(sessionCookie || null)

	const isLoggedIn = !!currentSession?.data?.id

	async function signOut() {
		'use server'
		cookies().delete('session')
		redirect('/sign-in')
	}

	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">Users</h1>
				{!isLoggedIn ? (
					<Button variant="outline" asChild>
						<Link href="/users/new">Sign In</Link>
					</Button>
				) : (
					<form action={signOut}>
						<Button variant="outline">Sign Out</Button>
					</form>
				)}
			</div>
			{isLoggedIn && (
				<div className="mt-8">
					<h2 className="text-center text-xl font-bold">
						You are logged in as: {currentSession.data?.email}
					</h2>
				</div>
			)}
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data
					?.filter(user => user.id === currentSession?.data?.id)
					.map(user => <UserCard key={user.id} user={user} />)}{' '}
			</div>
		</div>
	)
}
