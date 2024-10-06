import Link from 'next/link'

import { Button } from '@/components/ui/button'

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
			</nav>
		</header>
	)
}
