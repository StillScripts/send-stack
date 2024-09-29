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
					<Link href="/${modelName}/new">Add New ${noPlural(ModelName)}</Link>
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

	if (error) {
		notFound()
	}

	return <${ModelName}Form ${noPlural(modelName)}={data} />
}

export default Edit${ModelName}
`
}

export const modelCard = (modelName: string) => {
	const ModelName = capitalize(modelName)
	const editPath = '`/' + modelName + 's/edit/' + modelName + '.id}`'
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
						await client.api.${modelName}({ id: ${modelName}.id }).delete()
					}}
				/>
			</CardFooter>
		</Card>
	)
}
`
}
