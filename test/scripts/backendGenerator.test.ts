import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import { afterAll, beforeAll, describe, expect, it } from 'bun:test'

import { generateControllerFile, generateRouterFile } from '@/scripts/generator'
import { controllerSample, routerSample } from '@/scripts/generator/samples'

const modelName = 'movies'

describe('generateControllerFile', () => {
	let tempDir: string

	beforeAll(() => {
		tempDir = path.join(os.tmpdir(), 'test-controllers')
	})

	afterAll(async () => {
		await fs.rmdir(tempDir, { recursive: true })
	})

	it('should generate a controller file with valid content', async () => {
		const filePath = path.join(tempDir, `${modelName}.controller.ts`)

		await fs.mkdir(tempDir, { recursive: true })

		await generateControllerFile(modelName, tempDir)

		const fileExists = await fs
			.access(filePath)
			.then(() => true)
			.catch(() => false)
		expect(fileExists).toBe(true)

		const fileContent = await fs.readFile(filePath, 'utf-8')
		expect(fileContent).toContain(controllerSample)
	})
})

describe('generateRouterFile', () => {
	let tempDir: string

	beforeAll(() => {
		tempDir = path.join(os.tmpdir(), 'test-controllers')
	})

	afterAll(async () => {
		await fs.rmdir(tempDir, { recursive: true })
	})

	it('should generate a router file with valid content', async () => {
		const filePath = path.join(tempDir, `${modelName}.router.ts`)

		await fs.mkdir(tempDir, { recursive: true })

		await generateRouterFile(modelName, tempDir)

		const fileExists = await fs
			.access(filePath)
			.then(() => true)
			.catch(() => false)
		expect(fileExists).toBe(true)

		const fileContent = await fs.readFile(filePath, 'utf-8')
		expect(fileContent).toContain(routerSample)
	})
})
