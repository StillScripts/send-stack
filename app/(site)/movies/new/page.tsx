'use client'
import { useForm } from 'react-hook-form'
import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormCard } from '@/components/ui/form-card'

const schema = Type.Object({
	username: Type.String({ minLength: 1 }),
	password: Type.String({ minLength: 1 })
})

const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

const CreateMovies = () => {
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck)
	})

	const onSubmit = async (d: FormFields) => {
		alert(d.username)
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Create New Movie"
			className="max-w-96"
		>
			<div className="space-y-6">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
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
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</FormCard>
	)
}

export default CreateMovies
