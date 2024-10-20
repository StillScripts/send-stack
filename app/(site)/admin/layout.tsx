'use client'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'

import { LocalRevalidation } from '@/app/(site)/_components/local-revalidation'
import { AppSidebar } from '@/components/app-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/sidebar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const pages = [{ href: '/', name: 'Home' }]
	if (pathname.endsWith('blog') || pathname.includes('/blog/')) {
		pages.push({ href: '/admin/blog', name: 'Blog' })
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							{pages.map((page, index) => (
								<Fragment key={page.href}>
									{index !== 0 && (
										<BreadcrumbSeparator className="hidden md:block" />
									)}
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href={page.href}>
											{page.name}
										</BreadcrumbLink>
									</BreadcrumbItem>
								</Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
					<div className="ml-auto">
						<LocalRevalidation />
					</div>
				</header>
				<main className="p-4 sm:px-12">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
