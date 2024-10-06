import { capitalize, noPlural } from '@/lib/utils'

export const indexTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import type { Metadata } from 'next'
import Link from 'next/link'

import { client } from '@/app/(site)/client'
import { ${noPlural(ModelName)}Card } from '@/app/(site)/${modelName}/_components/${noPlural(modelName)}-card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: '${ModelName}'
}

export default async function ${ModelName}Page() {
	const { data, error } = await client.api.${modelName}.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">${ModelName}</h1>
				<Button variant="outline" asChild>
					<Link href="/admin/${modelName}/new">Add New ${noPlural(ModelName)}</Link>
				</Button>
			</div>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(${noPlural(modelName)} => <${noPlural(ModelName)}Card key={${noPlural(modelName)}.id} ${noPlural(modelName)}={${noPlural(modelName)}} />)}
			</div>
		</div>
	)
}
`
}

export const newTemplate = (modelName: string) => {
	const ModelName = noPlural(capitalize(modelName))
	return `import type { Metadata } from 'next'

import { ${ModelName}Form } from '@/app/(site)/${modelName}/_components/${noPlural(modelName)}-form'

export const metadata: Metadata = {
	title: 'Add New ${ModelName}'
}

export default function AddNew${ModelName}() {
	return <${ModelName}Form />
}
`
}

export const editTemplate = (modelName: string) => {
	const ModelName = noPlural(capitalize(modelName))
	return `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { ${ModelName}Form } from '@/app/(site)/${modelName}/_components/${noPlural(modelName)}-form'

export const metadata: Metadata = {
	title: 'Edit ${ModelName}'
}

const Edit${ModelName} = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.${modelName}({ id: params.id }).get()

	if (error || !data) {
		notFound()
	}

	return <${ModelName}Form ${noPlural(modelName)}={data} />
}

export default Edit${ModelName}
`
}

export const cardTemplate = (modelName: string) => {
	const ModelName = noPlural(capitalize(modelName))
	const editPath =
		'`/admin/' + modelName + '/edit/${' + noPlural(modelName) + '.id}`'
	return `'use client'

import Link from 'next/link'

import type { ${ModelName} } from '@/app/(server)/validators/${modelName}.validator'
import { client } from '@/app/(site)/client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { DeleteButton } from '@/components/ui/delete-button'

export const ${ModelName}Card = ({ ${noPlural(modelName)} }: { ${noPlural(modelName)}: ${ModelName} }) => {
	return (
		<Card key={${noPlural(modelName)}.id} className="max-w-96">
			<CardHeader>
				<CardTitle>${ModelName} - {${noPlural(modelName)}.id}</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
					{Object.entries(${noPlural(modelName)}).map(([key, value], index) => (
						<li key={key + '-' + index}>
							<span className="font-bold">{key}</span>: {value}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button>
					<Link href={${editPath}}>Edit</Link>
				</Button>
				<DeleteButton
					description="This will permanently delete this ${noPlural(modelName)}."
					handleDelete={async () => {
						await client.api.${modelName}({ id: ${noPlural(modelName)}.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
`
}

export const formTemplate = (modelName: string) => {
	const ModelName = noPlural(capitalize(modelName))
	return `'use client'
import { useForm } from 'react-hook-form'

import { typeboxResolver } from '@hookform/resolvers/typebox'
import { Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

import {
	type ${ModelName},
	${modelName}FrontendSchema
} from '@/app/(server)/validators/${modelName}.validator'
import { client } from '@/app/(site)/client'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'

import { useErrorOrRedirect } from '@/lib/hooks/use-error-or-redirect'

const schema = ${modelName}FrontendSchema
const typecheck = TypeCompiler.Compile(schema)
type FormFields = Static<typeof schema>

/**
 * Form for creating a new ${noPlural(modelName)} or editing an existing one
 * @param ${noPlural(modelName)} - The ${noPlural(modelName)} being edited (optional)
 * */
export const ${ModelName}Form = ({ ${noPlural(modelName)} }: { ${noPlural(modelName)}?: ${ModelName} }) => {
	const { handleResponse } = useErrorOrRedirect()
	const form = useForm<FormFields>({
		resolver: typeboxResolver(typecheck),
		// @ts-expect-error - you may need to handle types for default values
		defaultValues: ${noPlural(modelName)} ?? {}
	})

	const onSubmit = async (data: FormFields) => {
		const payload = data
		if (${noPlural(modelName)}?.id) {
			// @ts-expect-error - you may need to handle types between client and server payloads
			const { error } = await client.api.${modelName}({ id: ${noPlural(modelName)}.id }).patch(payload)
			handleResponse(error, '/${modelName}')
		} else {
			// @ts-expect-error - you may need to handle types between client and server payloads
			const { error } = await client.api.${modelName}.index.post(payload)
			handleResponse(error, '/${modelName}')
		}
	}

	return (
		<FormCard
			form={form}
			onSubmit={onSubmit}
			title="Create New ${ModelName}"
			className="mx-auto my-8 max-w-96"
		>
			<div className="space-y-6">
				Form fields go here...
				<FormField
					control={form.control}
					// @ts-expect-error - this may not be a field on your model
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="${ModelName} title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</FormCard>
	)
}
`
}

export const errorTemplate = () => {
	return `'use client'
import { useEffect } from 'react'

import { ErrorPage } from '@/components/ui/error-page'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		reportError(error)
	}, [error])

	return (
		<ErrorPage
			title="An Error Occured"
			description={error.message}
			reset={reset}
		/>
	)
}
`
}

export const notFoundTemplate = () => {
	return `import { ErrorPage } from '@/components/ui/error-page'

export default function NotFound() {
	return (
		<ErrorPage
			title="Page Not Found"
			description="There appears to be no valid page for the current url path."
		/>
	)
}
`
}
