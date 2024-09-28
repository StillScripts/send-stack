'use client'
import { useForm } from 'react-hook-form'
import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
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
import {
	type Movie,
	moviesFrontendSchema
} from '@/app/(server)/validators/movies.validator'
import { client } from '@/app/(site)/client'
import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = moviesFrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new movie or editing an existing one
 * @param movie - The movie being edited (optional)
 * */
export const MovieForm = ({ movie }: { movie?: Movie }) => {
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		defaultValues: {
			title: movie?.title ?? '',
			releaseYear: movie?.releaseYear ? `${movie.releaseYear}` : ''
		}
	})

	/**
	 * Handle updating an existing action if the movie exists already,
	 * or create a new movie. Redirect to `/movies` if action was successful.
	 * @param data - User data from the form
	 */
	const onSubmit = async (data: FormFields) => {
		const payload = {
			...data,
			releaseYear: parseInt(data.releaseYear)
		}
		if (movie?.id) {
			const { error } = await client.api.movies({ id: movie.id }).patch(payload)
			handleResponse(error, '/movies')
		} else {
			const { error } = await client.api.movies.index.post(payload)
			handleResponse(error, '/movies')
		}
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Create New Movie"
			className="mx-auto my-8 max-w-96"
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
