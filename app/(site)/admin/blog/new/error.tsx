'use client'
import { useEffect } from 'react'

import { ErrorPage } from '@/components/ui/error-page'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		reportError(error)
	}, [error])

	return (
		<ErrorPage
			title="An Error Occured"
			description={error.message}
			reset={reset}
		/>
	)
}
