'use client'
import { useRouter } from 'next/navigation'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, type ButtonProps } from '@/components/ui/button'

export function DeleteButton({
	buttonProps,
	title = 'Are you sure?',
	description = `This will permanently delete this item.`,
	handleDelete
}: {
	title?: string
	description?: string
	buttonProps?: ButtonProps
	handleDelete: () => Promise<void>
}) {
	const router = useRouter()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="sm" variant="destructive" {...buttonProps}>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<div className="space-y-8">
						<AlertDialogAction
							onClick={async () => {
								await handleDelete()
								router.refresh()
							}}
							className="w-full sm:w-auto"
						>
							Confirm
						</AlertDialogAction>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
