import { expect, it } from "vitest";
import { createHasher } from "../../../src/embedding";

it("should create a hasher function", async () => {
	const hasher = await createHasher();
	expect(typeof hasher).toBe("function");
});
