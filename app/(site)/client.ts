// client.ts
import { treaty } from "@elysiajs/eden";

import type { App } from "@/app/(server)/server";

export const client = treaty<App>("localhost:3000");
