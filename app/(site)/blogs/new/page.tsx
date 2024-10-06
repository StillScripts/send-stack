import type { Metadata } from 'next'

import { BlogForm } from '@/app/(site)/blogs/_components/blog-form'

export const metadata: Metadata = {
	title: 'Add New Blog'
}

export default function AddNewBlog() {
	return <BlogForm />
}
