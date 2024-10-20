'use client'

import { usePathname, useRouter } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'

/** Force a revalidation of the current page you are on, when working locally */
export const LocalRevalidation = () => {
	const path = usePathname()
	if (process.env.NODE_ENV !== 'development') {
		return null
	}
	return (
		<Button
			variant="link"
			onClick={() => {
				client.api.revalidate.post({ path })
				typeof window !== undefined && window.location.reload()
			}}
			className="text-muted-foreground"
		>
			Revalidate Current Page
		</Button>
	)
}
