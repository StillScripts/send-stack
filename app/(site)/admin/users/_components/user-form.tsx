'use client'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import {
	type User,
	usersFrontendSchema
} from '@/app/(server)/validators/users.validator'
import { client } from '@/app/(site)/client'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = usersFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new user or editing an existing one
 * @param user - The user being edited (optional)
 * */
export const UserForm = ({
	user,
	isFirst
}: {
	user?: User
	isFirst: boolean
}) => {
	const searchParams = useSearchParams()
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		defaultValues: user ?? {}
	})

	// Temporary - Enable sign up (without user invites)
	const forceAccountCreation = searchParams.get('force-create')

	const option =
		isFirst || forceAccountCreation ? 'Create Your Account' : 'Sign In'

	const onSubmit = async (data: FormFields) => {
		const payload = data
		if (option === 'Create Your Account') {
			const { error } = await client.api.users.signup.post(payload)
			handleResponse(error, '/admin/me')
		} else {
			const { error } = await client.api.users.signin.post(payload)
			handleResponse(error, '/admin/me')
		}
	}

	return (
		<div className="mx-auto my-8 max-w-96">
			<FormCard
				form={form}
				onSubmit={onSubmit}
				title={option}
				buttonText={option}
			>
				<div className="space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Login with <span className="font-bold">test@example.com</span>
								</FormDescription>
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
								<FormDescription>
									Login with <span className="font-bold">Testing1</span>
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
			</FormCard>
		</div>
	)
}
