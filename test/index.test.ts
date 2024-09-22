// test/index.test.ts
import { app } from "@/app/(server)/server";
import { describe, expect, it } from "bun:test";

describe("Elysia", () => {
  it("return a response", async () => {
    const response = await app
      .handle(new Request("http://localhost/api"))
      .then((res) => res.text());

    expect(response).toBe("THE SEND STACK");
  });
});
