import { Elysia } from "elysia";

import swagger from "@elysiajs/swagger";

// Never cache this api, cache only on the frontend
export const dynamic = "force-dynamic";

const app = new Elysia({ prefix: "/api" })
  .use(swagger())
  .get("/", () => "hello Next");

export type App = typeof app;

export const GET = app.handle;
export const PATCH = app.handle;
export const PUT = app.handle;
export const POST = app.handle;
export const DELETE = app.handle;
