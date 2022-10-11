import { describe, expect, it } from "vitest";
import { setup } from "@nuxt/test-utils-edge";

describe("Nuxt run check", async () => {
  await setup({});

  it("Nuxt application runs", () => {
    expect(1).toBe(1);
  });
});
