import { client } from '@/app/(site)/client'

export default async function MoviesPage() {
	const { data, error } = await client.api.movies.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return <div>{data?.map(movie => <div key={movie.id}>{movie.id}</div>)}</div>
}
