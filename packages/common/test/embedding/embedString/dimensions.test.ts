import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../src/embedding";

it("should create a vector with correct dimensions", async () => {
	const hasher = await createHasher();
	const vector = embedString({
		value: "test",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	expect(vector.length).toBe(10);
});
