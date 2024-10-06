import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { BlogForm } from '@/app/(site)/blogs/_components/blog-form'

export const metadata: Metadata = {
	title: 'Edit Blog'
}

const EditBlog = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.blogs({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return <BlogForm blog={data} />
}

export default EditBlog
