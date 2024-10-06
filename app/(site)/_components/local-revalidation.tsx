'use client'

import { usePathname, useRouter } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'

/** Force a revalidation of the current page you are on, when working locally */
export const LocalRevalidation = () => {
	const path = usePathname()
	const router = useRouter()
	if (process.env.NODE_ENV !== 'development') {
		return null
	}

	return (
		<Button
			variant="link"
			onClick={() => {
				client.api.revalidate.post({ path })
				router.refresh()
			}}
		>
			Revalidate Current Page
		</Button>
	)
}
