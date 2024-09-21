import { app } from "@/app/(server)/api";

// Never cache this api, cache only on the frontend
export const dynamic = "force-dynamic";

export const GET = app.handle;
export const PATCH = app.handle;
export const PUT = app.handle;
export const POST = app.handle;
export const DELETE = app.handle;
