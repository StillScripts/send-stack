'use client'

import Link from 'next/link'

import type { Blog } from '@/app/(server)/validators/blogs.validator'
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

export const BlogCard = ({ blog }: { blog: Blog }) => {
	return (
		<Card key={blog.id} className="max-w-96">
			<CardHeader>
				<CardTitle>Blog - {blog.id}</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					{Object.entries(blog).map(([key, value], index) => (
						<li key={key + '-' + index}>
							<span className="font-bold">{key}</span>: {value}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button>
					<Link href={`/blogs/edit/${blog.id}`}>Edit</Link>
				</Button>
				<DeleteButton
					description="This will permanently delete this blog."
					handleDelete={async () => {
						await client.api.blogs({ id: blog.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
