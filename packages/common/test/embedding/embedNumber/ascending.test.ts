import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../src/embedding";

it("should handle ascending order", async () => {
	const hasher = await createHasher();
	const vector = embedNumber({
		value: 100,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	expect(vector.length).toBe(10);
	// All values should be non-negative
	for (let i = 0; i < vector.length; i++) {
		expect(vector[i]).toBeGreaterThanOrEqual(0);
	}
});
