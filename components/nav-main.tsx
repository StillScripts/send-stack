'use client'

import Link from 'next/link'

import { Component } from 'lucide-react'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Models</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/admin/blog">
							<Component />
							<span>Blog</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	)
}
