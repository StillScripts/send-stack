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
import { moviesFrontendSchema } from '@/app/(server)/validators/movies.validator'

const schema = moviesFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

export const MovieForm = () => {
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck)
	})

	const onSubmit = async (d: FormFields) => {
		alert(d.title)
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
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Movie title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="releaseYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year of Release</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</FormCard>
	)
}
