import { expect, it } from "vitest";
import { createHasher } from "../../../src/embedding";

it("should return consistent hashes for same input", async () => {
	const hasher = await createHasher();
	const hash1 = hasher("test");
	const hash2 = hasher("test");
	expect(hash1).toBe(hash2);
});
