import { expect, it } from "vitest";
import { createHasher } from "../../../src/embedding";

it("should return a bigint hash", async () => {
	const hasher = await createHasher();
	const hash = hasher("test");
	expect(typeof hash).toBe("bigint");
});
