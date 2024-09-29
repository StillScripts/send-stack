'use client'

import Link from 'next/link'

import type { Movie } from '@/app/(server)/validators/movies.validator'
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

export const MovieCard = ({ movie }: { movie: Movie }) => {
	return (
		<Card key={movie.id} className="max-w-96">
			<CardHeader>
				<CardTitle>Movie - {movie.id}</CardTitle>
			</CardHeader>
			<CardContent>{JSON.stringify(movie)}</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button>
					<Link href={`/movies/edit/${movie.id}`}>Edit</Link>
				</Button>
				<DeleteButton
					description="This will permanently delete this movie."
					handleDelete={async () => {
						await client.api.movies({ id: movie.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
