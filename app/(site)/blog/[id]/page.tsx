import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'

export const generateMetadata = async ({
	params
}: {
	params: { id: string }
}) => {
	const { data, error } = await client.api.blogs({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return {
		title: data.title
	}
}

const EditBlog = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.blogs({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return <div>{data.title}</div>
}

export default EditBlog
