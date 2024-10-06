import { Suspense } from 'react'
import type { Metadata } from 'next'

import { UserForm } from '@/app/(site)/admin/users/_components/user-form'

export const metadata: Metadata = {
	title: 'Add New User'
}

export default function AddNewUser() {
	return (
		<Suspense fallback={null}>
			<UserForm />
		</Suspense>
	)
}
