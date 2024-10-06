import type { Metadata } from 'next'
import Link from 'next/link'

import { BlogCard } from '@/app/(site)/blog/_components/blog-card'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Blogs'
}

export default async function BlogsPage() {
	const { data, error } = await client.api.blogs.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">Blogs</h1>
				<Button variant="outline" asChild>
					<Link href="/blog/new">Add New Blog</Link>
				</Button>
			</div>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(blog => <BlogCard key={blog.id} blog={blog} />)}
			</div>
		</div>
	)
}
