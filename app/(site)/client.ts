import { treaty } from '@elysiajs/eden'

import type { App } from '@/app/(server)/server'

const getBaseUrl = () => {
	if (process.env.NODE_ENV === 'production') {
		return (
			(process.env.NEXT_PUBLIC_SITE_URL ||
				process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
			'localhost:3000'
		)
	}
	if (process.env.VERCEL_ENV === 'preview') {
		return process.env.VERCEL_URL ?? 'localhost:3000'
	}
	return 'localhost:3000'
}

export const client = treaty<App>(getBaseUrl())
