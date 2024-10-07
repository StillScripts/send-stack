import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { UserForm } from '@/app/(site)/admin/users/_components/user-form'

export const metadata: Metadata = {
	title: 'Edit User'
}

const EditUser = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.users({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return <UserForm user={data} />
}

export default EditUser
