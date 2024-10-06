'use client'
import { useForm } from 'react-hook-form'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { eq } from 'drizzle-orm'

import {
	type User,
	usersFrontendSchema
} from '@/app/(server)/validators/users.validator'
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
import { db } from '@/db'
import { users } from '@/db/schema'
import { hashPassword, setSession } from '@/lib/auth/session'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = usersFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new user or editing an existing one
 * @param user - The user being edited (optional)
 * */
export const UserForm = ({ user }: { user?: User }) => {
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		defaultValues: user ?? {}
	})

	const onSubmit = async (data: FormFields) => {
		const payload = data
		const { error } = await client.api.users.index.post(payload)
		handleResponse(error, '/users')
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Sign Up"
			className="mx-auto my-8 max-w-96"
		>
			<div className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</FormCard>
	)
}
