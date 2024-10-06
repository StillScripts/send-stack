'use client'

import Link from 'next/link'

import type { User } from '@/app/(server)/validators/users.validator'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { DeleteButton } from '@/components/ui/delete-button'

export const UserCard = ({ user }: { user: User }) => {
	return (
		<Card key={user.id} className="max-w-96">
			<CardHeader>
				<CardTitle>Your Details</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					{Object.entries(user).map(([key, value], index) => (
						<li className="truncate" key={key + '-' + index}>
							<span className="font-bold">{key}</span>: {value}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<DeleteButton
					description="This will permanently delete this user."
					handleDelete={async () => {
						await client.api.users({ id: user.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
