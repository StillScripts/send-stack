'use client'

import type { User } from '@/app/(server)/validators/users.validator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
		</Card>
	)
}
