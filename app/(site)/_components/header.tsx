import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

import { CurrentUser } from './current-user'
import { LocalRevalidation } from './local-revalidation'

export const Header = () => {
	return (
		<header className="flex flex-wrap justify-between gap-4">
			<nav className="flex flex-wrap items-center gap-2">
				<Button variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>
				<Button variant="link" asChild>
					<Link href="/blog">Blog</Link>
				</Button>
				{process.env.NODE_ENV === 'development' && <LocalRevalidation />}
			</nav>
			<div className="flex items-center">
				<CurrentUser />
				<ThemeToggle />
			</div>
		</header>
	)
}
