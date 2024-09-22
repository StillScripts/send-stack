import { capitalize } from '@/lib/utils'

export const routerTemplate = (modelName: string) => {
	const ModelName = capitalize(modelName)
	return `import { Elysia, t } from 'elysia'

import { ${modelName} } from '@/db/schema'
import BaseController from '@/lib/base-controller'

const prefix = '/${modelName}'
const frontendPrefix = prefix

/** Control how the application can interact with the \`${modelName}\` model */
class ${ModelName}Controller extends BaseController<typeof ${modelName}> {
	constructor() {
		super(${modelName}, frontendPrefix)
	}
}

export const ${modelName}Router = new Elysia({ prefix })
	.decorate({
		${ModelName}Controller: new ${ModelName}Controller()
	})
	.get('/', async ({ ${ModelName}Controller }) => {
        return await ${ModelName}Controller.index()
    })
	.get(
		'/:id',
		async ({ ${ModelName}Controller, params: { id } }) => {
            return await ${ModelName}Controller.show(id)
        }
	)
	.post(
		'/',
		async ({ ${ModelName}Controller, body }) => {
			return await ${ModelName}Controller.create(body)
		},
		{
			body: t.Object({ title: t.String(), releaseYear: t.Number() })
		}
	)
	.patch(
		'/:id',
		async ({ ${ModelName}Controller, params: { id }, body }) => {
			await ${ModelName}Controller.update(id, body)
		},
		{
			body: t.Partial(t.Object({ title: t.String(), releaseYear: t.Number() }))
		}
	)
	.delete(
		'/:id',
		async ({ ${ModelName}Controller, params: { id } }) => {
			await ${ModelName}Controller.delete(id)
		}
	)`
}
