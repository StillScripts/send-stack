import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { getUser } from '@/lib/auth/get-user'
import { UserProvider } from '@/lib/auth/user-context'

import { ThemeProvider } from './theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: 'Send Stack',
		template: `%s - Send Stack`
	},
	description:
		'Starter site for building sites with ShadCN, Elysia, Next.js, and Drizzle.'
}

const getUserWithCookies = async () => {
	const sessionCookie = cookies().get('session')
	return await getUser(sessionCookie || null)
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const userPromise = getUserWithCookies()
	return (
		<html lang="en" className="bg-background">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<UserProvider userPromise={userPromise}>{children}</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
