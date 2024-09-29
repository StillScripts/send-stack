import { promises as fs } from 'fs'
import path from 'path'

import {
	controllerTemplate,
	routerTemplate
} from './generator/backendTemplates'
import {
	editTemplate,
	indexTemplate,
	newTemplate
} from './generator/frontendTemplates'

async function checkModelExists(modelName: string) {
	try {
		const schemaContent = await fs.readFile('db/schema.ts', 'utf-8')
		return schemaContent.includes(`export const ${modelName} = sqliteTable`)
	} catch (error) {
		console.error('Error reading schema file:', error)
		return false
	}
}

async function generateFile(
	modelName: string,
	type: 'router' | 'controller' | 'page',
	templateFunction: (modelName: string) => string,
	basePath: string
) {
	const filePath = path.join(
		basePath,
		type === 'page' ? 'page.tsx' : `${modelName}.${type}.ts`
	)
	try {
		await fs.writeFile(filePath, templateFunction(modelName))
		console.log(`Generated ${type} file: ${filePath}`)
	} catch (error) {
		console.error(`Error generating ${type} file for ${modelName}:`, error)
	}
}

export async function generateRouterFile(
	modelName: string,
	basePath = 'app/(server)/routers'
) {
	await generateFile(modelName, 'router', routerTemplate, basePath)
}

export async function generateControllerFile(
	modelName: string,
	basePath = 'app/(server)/controllers'
) {
	await generateFile(modelName, 'controller', controllerTemplate, basePath)
}

export async function generateIndexPage(
	modelName: string,
	basePath = `app/(site)/${modelName}`
) {
	await generateFile(modelName, 'page', indexTemplate, basePath)
}

export async function generateNewPage(
	modelName: string,
	basePath = `app/(site)/${modelName}/new`
) {
	await generateFile(modelName, 'page', newTemplate, basePath)
}

export async function generateEditPage(
	modelName: string,
	basePath = `app/(site)/${modelName}/edit/[id]`
) {
	await generateFile(modelName, 'page', editTemplate, basePath)
}

// Check if the model exists and then generate the route file
const run = async () => {
	// Extract the model name from the command line argument
	const option = process.argv[2]
	const modelName = process.argv[3]?.replace('-', '')

	if (!modelName) {
		console.error('Please provide a model name to check.')
		process.exit(1)
	}

	const modelExists = await checkModelExists(modelName)
	if (modelExists) {
		if (option === 'backend') {
			await generateControllerFile(modelName)
			await generateRouterFile(modelName)
		} else {
			await generateIndexPage(modelName)
			await generateNewPage(modelName)
			await generateEditPage(modelName)
		}
	} else {
		console.log(`Model "${modelName}" does not exist in schema.`)
	}
}
if (process.env.NODE_ENV !== 'test') {
	await run()
}
