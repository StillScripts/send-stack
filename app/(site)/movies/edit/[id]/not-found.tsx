import { ErrorPage } from '@/components/ui/error-page'

export default function NotFound() {
	return (
		<ErrorPage
			title="Page Not Found"
			description="There appears to be an error with the current url path"
		/>
	)
}
