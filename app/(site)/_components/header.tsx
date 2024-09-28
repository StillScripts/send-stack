import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
			</nav>
		</header>
	)
}
