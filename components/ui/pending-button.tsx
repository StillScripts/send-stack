'use client'
import React from 'react'
import { Button } from './button'
import { useFormState } from 'react-hook-form'
import { cn } from '@/lib/utils'

function IconSpinner({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn('size-4 animate-spin', className)}
			{...props}
		>
			<path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
		</svg>
	)
}

/** Show loading state when form is submitting or redirecting */
export const PendingButton = ({
	children,
	iconProps,
	...props
}: React.ComponentProps<typeof Button> & {
	iconProps?: React.ComponentProps<typeof IconSpinner>
}) => {
	const { isSubmitting, isValidating, isSubmitSuccessful } = useFormState()
	const loading = isSubmitting || isValidating || isSubmitSuccessful
	return (
		<Button type="submit" {...props}>
			{loading ? <IconSpinner {...iconProps} /> : children}
		</Button>
	)
}
