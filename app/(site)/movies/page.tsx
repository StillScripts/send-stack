import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

export default async function MoviesPage() {
	const { data, error } = await client.api.movies.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">Movies</h1>
				<Button variant="outline" asChild>
					<Link href="/movies/new">Add New Movie</Link>
				</Button>
			</div>

			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(movie => (
					<Card key={movie.id} className="max-w-96">
						<CardHeader>
							<CardTitle>Movie - {movie.id}</CardTitle>
						</CardHeader>
						<CardContent>{JSON.stringify(movie)}</CardContent>
						<CardFooter className="justify-end gap-2">
							<Button>
								<Link href={`/movies/edit/${movie.id}`}>Edit</Link>
							</Button>
							<Button variant="destructive">Delete</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
