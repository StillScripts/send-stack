import type { Metadata } from 'next'

import { UserForm } from '@/app/(site)/users/_components/user-form'

export const metadata: Metadata = {
	title: 'Add New User'
}

export default function AddNewUser() {
	return <UserForm />
}
