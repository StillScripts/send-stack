'use client'
import Link from 'next/link'

import { Button } from './button'

export function ErrorPage({
	title = 'Oops, something went wrong!',
	description = `An error has occurred. Please check the URL or try again later.`,
	reset
}: {
	title?: string
	description?: string
	reset?: () => void
}) {
	return (
		<div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto h-12 w-12 text-primary" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					{title}
				</h1>
				<p className="mt-4 text-muted-foreground">{description}</p>
				<div className="mt-6 flex justify-center gap-2">
					<Button variant={reset ? 'secondary' : 'default'} asChild>
						<Link href="/" prefetch={false}>
							Go to Homepage
						</Link>
					</Button>
					{reset && <Button onClick={() => reset()}>Try Again</Button>}
				</div>
			</div>
		</div>
	)
}
