import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../src/embedding";

it("should create a vector with correct dimensions", async () => {
	const hasher = await createHasher();
	const vector = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	expect(vector.length).toBe(10);
});
