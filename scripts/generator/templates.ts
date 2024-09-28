import { capitalize } from '@/lib/utils'

export const controllerTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import { ${modelName} } from '@/db/schema'

import BaseController from './base.controller'

export const prefix = '/${modelName}'
const frontendPrefix = prefix

export class ${ModelName}Controller extends BaseController<typeof ${modelName}> {
	constructor() {
		super(${modelName}, frontendPrefix)
	}
}
`
}

export const routerTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import { Elysia, t } from 'elysia'

import {
	${ModelName}Controller,
	prefix
} from '@/app/(server)/controllers/${modelName}.controller'
import { ${modelName}BackendSchema } from '@/app/(server)/validators/${modelName}.validator'

export const ${modelName}Router = new Elysia({ prefix })
	.decorate({
		${ModelName}Controller: new ${ModelName}Controller()
	})
	.get('/', async ({ ${ModelName}Controller }) => {
		return await ${ModelName}Controller.index()
	})
	.get('/:id', async ({ ${ModelName}Controller, params: { id } }) => {
		return await ${ModelName}Controller.show(id)
	})
	.post(
		'/',
		async ({ ${ModelName}Controller, body }) => {
			await ${ModelName}Controller.create(body)
		},
		{
			body: ${modelName}BackendSchema
		}
	)
	.patch(
		'/:id',
		async ({ ${ModelName}Controller, params: { id }, body }) => {
			await ${ModelName}Controller.update(id, body)
		},
		{
			body: t.Partial(${modelName}BackendSchema)
		}
	)
	.delete('/:id', async ({ ${ModelName}Controller, params: { id } }) => {
		await ${ModelName}Controller.delete(id)
	})
`
}
