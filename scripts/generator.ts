import { promises as fs } from 'fs'
import path from 'path'

import { controllerTemplate, routerTemplate } from './generator/templates'

// Function to check if a model exists in the schema file
async function checkTable(modelName: string) {
	try {
		const schemaContent = await fs.readFile('db/schema.ts', 'utf-8')
		const regex = new RegExp(
			`export\\s+const\\s+${modelName}\\s*=\\s*sqliteTable\\(\\s*"${modelName}"`,
			'i'
		)
		return regex.test(schemaContent)
	} catch (error) {
		console.error('Error reading schema file:', error)
		return false
	}
}

// Function to generate a new route file based on a model name
export async function generateRouterFile(
	modelName: string,
	basePath = 'app/(server)/routers'
) {
	const filePath = path.join(basePath, `${modelName}.router.ts`)
	try {
		await fs.writeFile(filePath, routerTemplate(modelName))
		console.log(`Generated route file: ${filePath}`)
	} catch (error) {
		console.error(`Error generating router file for ${modelName}:`, error)
	}
}

// Function to generate a new route file based on a model name
export async function generateControllerFile(
	modelName: string,
	basePath = 'app/(server)/controllers'
) {
	const filePath = path.join(basePath, `${modelName}.controller.ts`)
	try {
		await fs.writeFile(filePath, controllerTemplate(modelName))
		console.log(`Generated controller file: ${filePath}`)
	} catch (error) {
		console.error(`Error generating controller file for ${modelName}:`, error)
	}
}

// Check if the model exists and then generate the route file
const run = async () => {
	// Extract the model name from the command line argument
	const modelName = process.argv[2]?.replace('-', '')

	if (!modelName) {
		console.error('Please provide a model name to check.')
		process.exit(1)
	}

	const modelExists = await checkTable(modelName)
	if (modelExists) {
		await generateControllerFile(modelName)
		await generateRouterFile(modelName)
	} else {
		console.log(`Model "${modelName}" does not exist in schema.`)
	}
}
if (process.env.NODE_ENV !== 'test') {
	await run()
}
