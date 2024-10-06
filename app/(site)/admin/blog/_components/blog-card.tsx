'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Blog } from '@/app/(server)/validators/blogs.validator'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { DeleteButton } from '@/components/ui/delete-button'

export const BlogCard = ({ blog }: { blog: Blog }) => {
	const pathname = usePathname()
	const isAdmin = pathname.includes('/admin')
	return (
		<Card key={blog.id} className="max-w-96">
			<CardHeader>
				<CardTitle>{blog.title}</CardTitle>
				<CardDescription>{blog.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm italic">
					Last updated at&nbsp;
					{new Date(blog.updatedAt * 1000).toLocaleDateString('en-AU', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</CardContent>
			{isAdmin ? (
				<CardFooter className="justify-end gap-2">
					<Button>
						<Link href={`/admin/blog/edit/${blog.id}`}>Edit</Link>
					</Button>
					<DeleteButton
						description="This will permanently delete this blog."
						handleDelete={async () => {
							await client.api.blogs({ id: blog.id }).delete()
						}}
					/>
				</CardFooter>
			) : (
				<CardFooter>
					<Button className="w-full" asChild>
						<Link href={`/blog/${blog.id}`}>Read More</Link>
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
