import { capitalize } from '@/lib/utils'

export const indexTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import type { Metadata } from 'next'
import Link from 'next/link'

import { client } from '@/app/(site)/client'
import { ${ModelName}Card } from '@/app/(site)/${modelName}s/_components/${modelName}-card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: '${ModelName}s'
}

export default async function ${ModelName}sPage() {
	const { data, error } = await client.api.${modelName}s.index.get()
	if (error || !data) {
		throw new Error((error.value as string) ?? 'An Error Occurred')
	}
	return (
		<div className="mt-8">
			<div className="flex flex-wrap justify-center gap-6">
				<h1 className="text-center text-3xl font-bold sm:text-4xl">${ModelName}s</h1>
				<Button variant="outline" asChild>
					<Link href="/${modelName}s/new">Add New ${ModelName}</Link>
				</Button>
			</div>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				{data?.map(${modelName} => <${ModelName}Card key={${modelName}.id} ${modelName}={${modelName}} />)}
			</div>
		</div>
	)
}
`
}

export const newTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import type { Metadata } from 'next'

import { ${ModelName}Form } from '@/app/(site)/${modelName}s/_components/${modelName}-form'

export const metadata: Metadata = {
	title: 'Add New ${ModelName}'
}

export default function AddNew${ModelName}() {
	return <${ModelName}Form />
}
`
}

export const editTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { client } from '@/app/(site)/client'
import { ${ModelName}Form } from '@/app/(site)/${modelName}s/_components/${modelName}-form'

export const metadata: Metadata = {
	title: 'Edit ${ModelName}'
}

const Edit${ModelName} = async ({ params }: { params: { id: string } }) => {
	const { data, error } = await client.api.${modelName}s({ id: params.id }).get()

	if (error) {
		notFound()
	}

	return <${ModelName}Form ${modelName}={data} />
}

export default Edit${ModelName}
`
}

export const modelCard = (modelName: string) => {
	const ModelName = capitalize(modelName)
	const editPath = '`/' + modelName + 's/edit/' + modelName + '.id}`'
	return `'use client'

import Link from 'next/link'

import type { ${ModelName} } from '@/app/(server)/validators/${modelName}s.validator'
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

export const ${ModelName}Card = ({ ${modelName} }: { ${modelName}: ${ModelName} }) => {
	return (
		<Card key={${modelName}.id} className="max-w-96">
			<CardHeader>
				<CardTitle>${ModelName} - {${modelName}.id}</CardTitle>
			</CardHeader>
			<CardContent>{JSON.stringify(${modelName})}</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button>
					<Link href={${editPath}}>Edit</Link>
				</Button>
				<DeleteButton
					description="This will permanently delete this ${modelName}."
					handleDelete={async () => {
						await client.api.${modelName}s({ id: ${modelName}.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
`
}
