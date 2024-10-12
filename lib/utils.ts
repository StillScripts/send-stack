import { Omit, type TObject } from '@sinclair/typebox'
import { type ClassValue, clsx } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export const noPlural = (text: string) => {
	const exclusions = ['movies']
	if (!exclusions.includes(text.toLowerCase()) && text.endsWith('ies')) {
		return text.slice(0, -3) + 'y'
	}
	return text.endsWith('s') ? text.slice(0, -1) : text
}

export const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	7
)

export function withoutDefaults<Schema extends TObject>(schema: Schema) {
	return Omit(schema, ['id', 'createdAt', 'updatedAt'])
}

/** Placeholder for reporting error to an error service */
export const reportError = (error: Error) => {
	console.error(error)
}
