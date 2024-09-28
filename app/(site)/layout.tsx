import { Header } from '@/app/(site)/_components/header'

export default function SiteLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-background p-12">
			<Header />
			{children}
		</div>
	)
}
