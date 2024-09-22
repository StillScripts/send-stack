import { capitalize } from "@/lib/utils";
import { promises as fs } from "fs";
import path from "path";

// Function to check if a model exists in the schema file
async function checkTable(modelName: string) {
  try {
    const schemaContent = await fs.readFile("db/schema.ts", "utf-8");
    const regex = new RegExp(
      `export\\s+const\\s+${modelName}\\s*=\\s*sqliteTable\\(\\s*"${modelName}"`,
      "i"
    );
    return regex.test(schemaContent);
  } catch (error) {
    console.error("Error reading schema file:", error);
    return false;
  }
}

// Function to generate a new route file based on a model name
async function generateRouteFile(modelName: string) {
  const fileContent = `import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Elysia, t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { ${modelName} } from '@/db/schema'
import BaseController from '@/lib/base-controller'
import { nanoid, withoutId } from '@/lib/utils'


const prefix = '/${modelName}'

/** Control how the application can interact with the \`${modelName}\` model */
class ${capitalize(
    modelName
  )}Controller extends BaseController <typeof ${modelName}> {
	constructor() {
		super(${modelName})
	}

	async featured() {
		return await this.db.select().from(this.model).limit(3)
	}
}

const insertSchema = createInsertSchema(${modelName})
const selectSchema = createSelectSchema(${modelName})

/** Handle routes for the \`${modelName}\` model */
export const ${modelName}Router = new Elysia({ prefix })
	.decorate({
		${capitalize(modelName)}Controller: new ${capitalize(modelName)}Controller()
	})
	// index
	.get(
		'/',
		async ({ ${capitalize(modelName)}Controller }) => await ${capitalize(
    modelName
  )}Controller.index(),
		{
			response: t.Array(selectSchema)
		}
	)
	// show
	.get(
		'/:id',
		async ({ ${capitalize(modelName)}Controller, params: { id } }) =>
			await ${capitalize(modelName)}Controller.show(id),
		{
			response: selectSchema
		}
	)
	// create
	.post(
		'/',
		async ({ ${capitalize(modelName)}Controller, body }) => {
			await ${capitalize(
        modelName
      )}Controller.create({ id: \`${modelName}_\${nanoid(10)}\`, ...body })
		},
		{
			body: withoutId(insertSchema),
			afterHandle() {
				revalidatePath(prefix)
				redirect(prefix)
			}
		}
	)
	// update
	.patch(
		'/:id',
		async ({ ${capitalize(modelName)}Controller, params: { id }, body }) => {
			await ${capitalize(modelName)}Controller.update(id, body)
		},
		{
			body: t.Partial(withoutId(insertSchema)),
			afterHandle() {
				revalidatePath(prefix)
			}
		}
	)
	// delete
	.delete(
		'/:id',
		async ({ ${capitalize(modelName)}Controller, params: { id } }) => {
			await ${capitalize(modelName)}Controller.delete(id)
		},
		{
			afterHandle() {
				revalidatePath(prefix)
			}
		}
	)
	// example route that goes beyond the core CRUD routes
	.get(
		'/featured',
		async ({ ${capitalize(modelName)}Controller }) => await ${capitalize(
    modelName
  )}Controller.featured(),
		{
			response: t.Array(selectSchema)
		}
	)`;

  const filePath = path.join("app/(server)/routers", `${modelName}.ts`);
  try {
    await fs.writeFile(filePath, fileContent);
    console.log(`Generated route file: ${filePath}`);
  } catch (error) {
    console.error(`Error generating file for ${modelName}:`, error);
  }
}

// Extract the model name from the command line argument
const modelName = process.argv[2]?.replace("-", "");

if (!modelName) {
  console.error("Please provide a model name to check.");
  process.exit(1);
}

// Check if the model exists and then generate the route file
(async () => {
  const modelExists = await checkTable(modelName);
  if (modelExists) {
    await generateRouteFile(modelName);
  } else {
    console.log(`Model "${modelName}" does not exist in schema.`);
  }
})();
