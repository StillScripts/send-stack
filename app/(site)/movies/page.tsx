import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function MoviesPage() {
	const { data, error } = await client.api.movies.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex justify-center gap-4">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">Movies</h1>
				<Button>Add New Movie</Button>
			</div>

			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(movie => (
					<Card key={movie.id} className="max-w-96">
						<CardHeader>
							<CardTitle>Movie - {movie.id}</CardTitle>
						</CardHeader>
						<CardContent>{JSON.stringify(movie)}</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
