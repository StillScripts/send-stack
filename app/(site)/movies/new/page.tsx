import type { Metadata } from 'next'

import { MovieForm } from '@/app/(site)/movies/_components/movie-form'

export const metadata: Metadata = {
	title: 'Add New Movie'
}

export default function AddNewMovie() {
	return <MovieForm />
}
