import { Elysia } from "elysia";

import swagger from "@elysiajs/swagger";

export const app = new Elysia({ prefix: "/api" })
  .use(swagger())
  .get("/", () => "THE SEND STACK");

export type App = typeof app;
