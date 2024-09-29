import { Header } from '@/app/(site)/_components/header'

export default function SiteLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="container mx-auto bg-background py-12">
			<Header />
			{children}
		</div>
	)
}
