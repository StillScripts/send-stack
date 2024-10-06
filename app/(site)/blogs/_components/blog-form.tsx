'use client'
import { useForm } from 'react-hook-form'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import {
	type Blog,
	blogsFrontendSchema
} from '@/app/(server)/validators/blogs.validator'
import { client } from '@/app/(site)/client'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'

import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = blogsFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new blog or editing an existing one
 * @param blog - The blog being edited (optional)
 * */
export const BlogForm = ({ blog }: { blog?: Blog }) => {
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		// @ts-expect-error - you may need to handle types for default values
		defaultValues: blog ?? {}
	})

	const onSubmit = async (data: FormFields) => {
		const payload = data
		if (blog?.id) {
			// @ts-expect-error - you may need to handle types between client and server payloads
			const { error } = await client.api.blogs({ id: blog.id }).patch(payload)
			handleResponse(error, '/blogs')
		} else {
			// @ts-expect-error - you may need to handle types between client and server payloads
			const { error } = await client.api.blogs.index.post(payload)
			handleResponse(error, '/blogs')
		}
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Create New Blog"
			className="mx-auto my-8 max-w-96"
		>
			<div className="space-y-6">
				Form fields go here...
				<FormField
					control={form.control}
					// @ts-expect-error - this may not be a field on your model
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Blog title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</FormCard>
	)
}
