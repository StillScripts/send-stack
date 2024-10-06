import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { LocalRevalidation } from './local-revalidation'

export const Header = () => {
	return (
		<header>
			<nav className="flex items-center gap-2">
				<Button variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>
				<Button variant="link" asChild>
					<Link href="/movies">Movies</Link>
				</Button>
				<Button variant="link" asChild>
					<Link href="/users">Users</Link>
				</Button>
				{process.env.NODE_ENV === 'development' && <LocalRevalidation />}
			</nav>
		</header>
	)
}
