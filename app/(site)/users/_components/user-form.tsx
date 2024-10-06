'use client'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import {
	type User,
	usersFrontendSchema
} from '@/app/(server)/validators/users.validator'
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
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = usersFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new user or editing an existing one
 * @param user - The user being edited (optional)
 * */
export const UserForm = ({ user }: { user?: User }) => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		defaultValues: user ?? {}
	})

	const option = searchParams.get('option') === 'signin' ? 'Sign In' : 'Sign Up'

	const onSubmit = async (data: FormFields) => {
		const payload = data
		if (option === 'Sign Up') {
			const { error } = await client.api.users.signup.post(payload)
			handleResponse(error, '/users')
		} else {
			const { data, error } = await client.api.users.signin.post(payload)
			alert(JSON.stringify(data))
			//handleResponse(error, '/users')
		}
	}

	return (
		<div className="mx-auto my-8 max-w-96">
			<FormCard form={form} onSubmit={onSubmit} title={option}>
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
			<div className="mt-6">
				<h4>Have an existing account?</h4>
				<Button
					className="mt-2"
					variant="outline"
					onClick={() => router.push(`${pathname}?option=signin`)}
				>
					Switch to sign in
				</Button>
			</div>
		</div>
	)
}
