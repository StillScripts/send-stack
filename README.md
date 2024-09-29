# SEND Stack

The SEND Stack is a modern, full-stack web application built using Bun. It provides a simple and efficient setup for managing Drizzle ORM, including database migrations and model boilerplate generation for both backend and frontend.

## Getting Started

To get started with the SEND Stack, follow these steps:

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/StillScripts/send-stack.git
   cd send-stack
2. Install Dependencies
   Use Bun to install the project dependencies:
   `bun install`

3. Manage Your Drizzle DB Schema
   All database schema definitions are managed in the `db/schema.ts` file. You can modify this file to define your database tables and fields.

4. Generate a Migration
   Once you've updated your schema, generate a migration file:
   `bun db:generate`

5. Run the Migration
   To apply the migration to your database, use:
   `bun db:migrate`

6. Seed the Database
   After the migration, seed your local database with any initial data by running:
   `bun db:seed`

7. Generate Backend Boilerplate (optional)
   To generate backend boilerplate code for a Drizzle model, run:
   `bun generate:backend [model]`
   This will create the necessary backend routes and controllers for your model.

8. Generate Frontend Boilerplate
   To generate frontend boilerplate for Next.js routes and components related to your model, run:
   `bun generate:frontend [model]`
   This will scaffold the routes and components needed for managing the model on the frontend.
