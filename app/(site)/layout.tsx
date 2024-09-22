export default function SiteLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <div className="bg-background p-12">{children}</div>
}
