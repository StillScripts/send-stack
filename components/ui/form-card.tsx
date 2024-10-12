import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'

import { PendingButton } from './pending-button'

export function FormCard<T extends object>({
	children,
	form,
	title,
	description,
	onSubmit,
	buttonText = 'Submit',
	...cardProps
}: {
	children: React.ReactNode
	form: UseFormReturn<T>
	title?: string
	description?: string
	onSubmit: (data: T) => Promise<void>
	buttonText?: string
} & Omit<React.ComponentProps<typeof Card>, 'onSubmit'>) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card {...cardProps}>
					{(title || description) && (
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
					)}
					<CardContent>{children}</CardContent>
					<CardFooter>
						<PendingButton>{buttonText}</PendingButton>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
