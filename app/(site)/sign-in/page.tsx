import { Suspense } from 'react'
import type { Metadata } from 'next'

import { UserForm } from '@/app/(site)/admin/users/_components/user-form'
import { client } from '@/app/(site)/client'

const checkIfUserIsFirst = async () => {
	const { data } = await client.api.users['no-users'].get()
	return !!data
}

export const generateMetadata = async () => {
	const isFirst = await checkIfUserIsFirst()
	return {
		title: isFirst ? 'Create Your Account' : 'Sign In'
	}
}

export default async function AddNewUser() {
	const isFirst = await checkIfUserIsFirst()
	return (
		<Suspense fallback={null}>
			<UserForm isFirst={isFirst} />
		</Suspense>
	)
}
