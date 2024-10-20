'use client'

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react'
import { use } from 'react'

import type { SelectUser } from '@/db/schema'

export type User = SelectUser

type UserContextType = {
	user: User | null
	setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
	let context = useContext(UserContext)
	if (context === null) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}

export function UserProvider({
	children,
	userPromise
}: {
	children: ReactNode
	userPromise: Promise<User | null>
}) {
	let initialUser = use(userPromise)
	let [user, setUser] = useState<User | null>(initialUser)

	useEffect(() => {
		setUser(initialUser)
	}, [initialUser])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
