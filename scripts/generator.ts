import { promises as fs } from 'fs'
import path from 'path'

import { noPlural } from '@/lib/utils'

import {
	controllerTemplate,
	routerTemplate,
	validatorTemplate
} from './generator/backendTemplates'
import {
	cardTemplate,
	editTemplate,
	errorTemplate,
	formTemplate,
	indexTemplate,
	newTemplate,
	notFoundTemplate
} from './generator/frontendTemplates'
import { backendTests } from './generator/testTemplates'

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
	type:
		| 'router'
		| 'controller'
		| 'validator'
		| 'page'
		| 'not-found'
		| 'error'
		| 'test'
		| 'custom',
	templateFunction: (modelName: string) => string,
	basePath: string,
	customFileName?: string
) {
	let fileName = `${type}.tsx`
	if (
		type === 'router' ||
		type === 'controller' ||
		type === 'validator' ||
		type === 'test'
	) {
		fileName = `${modelName}.${type}.ts`
	}
	if (customFileName) {
		fileName = customFileName
	}
	const filePath = path.join(basePath, fileName)
	const dirPath = path.dirname(filePath)
	try {
		await fs.mkdir(dirPath, { recursive: true })
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

export async function generateValidatorFile(
	modelName: string,
	basePath = 'app/(server)/validators'
) {
	await generateFile(modelName, 'validator', validatorTemplate, basePath)
}

export async function generateBackendTestFile(
	modelName: string,
	basePath = 'test'
) {
	await generateFile(modelName, 'test', backendTests, basePath)
}

export async function generateIndexPage(
	modelName: string,
	basePath = `app/(site)/${modelName}`
) {
	await generateFile(modelName, 'page', indexTemplate, basePath)
	await generateFile(modelName, 'not-found', notFoundTemplate, basePath)
}

export async function generateNewPage(
	modelName: string,
	basePath = `app/(site)/${modelName}/new`
) {
	await generateFile(modelName, 'page', newTemplate, basePath)
	await generateFile(modelName, 'error', errorTemplate, basePath)
}

export async function generateEditPage(
	modelName: string,
	basePath = `app/(site)/${modelName}/edit/[id]`
) {
	await generateFile(modelName, 'page', editTemplate, basePath)
	await generateFile(modelName, 'error', errorTemplate, basePath)
	await generateFile(modelName, 'not-found', notFoundTemplate, basePath)
}

export async function generateCustomComponents(
	modelName: string,
	basePath = `app/(site)/${modelName}/_components`
) {
	await generateFile(
		modelName,
		'custom',
		cardTemplate,
		basePath,
		`${noPlural(modelName)}-card.tsx`
	)
	await generateFile(
		modelName,
		'custom',
		formTemplate,
		basePath,
		`${noPlural(modelName)}-form.tsx`
	)
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
			await generateValidatorFile(modelName)
		} else if (option === 'tests') {
			await generateBackendTestFile(modelName)
		} else {
			await generateIndexPage(modelName)
			await generateNewPage(modelName)
			await generateEditPage(modelName)
			await generateCustomComponents(modelName)
		}
	} else {
		console.log(`Model "${modelName}" does not exist in schema.`)
	}
}
if (process.env.NODE_ENV !== 'test') {
	await run()
}
