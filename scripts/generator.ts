import { promises as fs } from "fs";

// Function to check if a model exists in the schema file
async function checkTable(modelName: string) {
  try {
    // Read the content of the schema file
    const schemaContent = await fs.readFile("db/schema.ts", "utf-8");

    // Define a regex pattern to match the specific model format
    const regex = new RegExp(
      `export\\s+const\\s+${modelName}\\s*=\\s*sqliteTable\\(\\s*"${modelName}"`,
      "i"
    );

    // Check if the model exists in the file content
    if (regex.test(schemaContent)) {
      console.log(`Table "${modelName}" found.`);
      return true;
    } else {
      console.log(`Table "${modelName}" not found.`);
      return false;
    }
  } catch (error) {
    console.error("Error reading schema file:", error);
    return false;
  }
}

// Extract the model name from the command line argument
const modelName = process.argv[2]?.replace("-", "");

if (!modelName) {
  console.error("Please provide a model name to check.");
  process.exit(1);
}

// Call the function to check the table
checkTable(modelName);
