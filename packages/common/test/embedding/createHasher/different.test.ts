import { expect, it } from "vitest";
import { createHasher } from "../../../src/embedding";

it("should return different hashes for different inputs", async () => {
	const hasher = await createHasher();
	const hash1 = hasher("test1");
	const hash2 = hasher("test2");
	expect(hash1).not.toBe(hash2);
});
