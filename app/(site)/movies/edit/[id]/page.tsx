import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { MovieForm } from '@/app/(site)/movies/_components/movie-form'

export const metadata: Metadata = {
	title: 'Edit Movie'
}

const EditMovie = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.movies({ id: params.id }).get()

	if (error) {
		notFound()
	}

	return <MovieForm movie={data} />
}

export default EditMovie
