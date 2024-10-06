'use client'
import { useFieldArray, useForm } from 'react-hook-form'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import {
	type Blog,
	blogsFrontendSchema
} from '@/app/(server)/validators/blogs.validator'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/lib/auth/user-context'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = blogsFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new blog or editing an existing one
 * @param blog - The blog being edited (optional)
 * */
export const BlogForm = ({ blog }: { blog?: Blog }) => {
	const { user } = useUser()
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		// @ts-expect-error - you may need to handle types for default values
		defaultValues: blog ?? { content: [{ type: 'h1', text: 'Heading' }] }
	})
	const { fields, append } = useFieldArray({
		control: form.control,
		name: 'content'
	})

	const onSubmit = async (data: FormFields) => {
		if (!user) {
			throw new Error('You must be logged in to continue!')
		}
		const payload = { ...data, userId: user.id }
		if (blog?.id) {
			const { error } = await client.api.blogs({ id: blog.id }).patch(payload)
			handleResponse(error, '/blog')
		} else {
			const { error } = await client.api.blogs.index.post(payload)
			handleResponse(error, '/blog')
		}
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Create New Blog"
			className="mx-auto my-8"
		>
			{user?.email ? (
				<div className="space-y-6">
					<FormField
						control={form.control}
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
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input placeholder="Blog description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="rounded-lg bg-muted p-4 lg:p-6">
						<h4 className="text-lg font-medium">Blog Content</h4>
						{fields.map((fieldItem, index) => (
							<div key={index} className="my-4 flex gap-4">
								<FormField
									control={form.control}
									name={`content.${index}.type`}
									render={({ field }) => (
										<FormItem className="w-40">
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select content type" />
													</SelectTrigger>
													<SelectContent>
														{[1, 2, 3, 4, 5, 6].map(level => (
															<SelectItem
																key={'heading' + level}
																value={`h${level}`}
															>
																Heading {level}
															</SelectItem>
														))}
														<SelectItem value="paragraph">Paragraph</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`content.${index}.text`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												{fieldItem.type === 'paragraph' ? (
													<Textarea placeholder="Text..." {...field} />
												) : (
													<Input placeholder="Text..." {...field} />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
						<Button
							size="sm"
							onClick={() => append({ type: 'paragraph', text: '' })}
							type="button"
						>
							New Block
						</Button>
					</div>
				</div>
			) : (
				<div>You must be logged in to continue</div>
			)}
		</FormCard>
	)
}
