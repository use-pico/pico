import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../src/embedding";

it("should apply weight correctly", async () => {
	const hasher = await createHasher();
	const vector1 = embedString({
		value: "test",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedString({
		value: "test",
		hasher,
		dimensions: 10,
		weight: 2,
	});
	// Both should be normalized to unit length
	const mag1 = Math.sqrt(
		Array.from(vector1).reduce((sum, v) => sum + v * v, 0),
	);
	const mag2 = Math.sqrt(
		Array.from(vector2).reduce((sum, v) => sum + v * v, 0),
	);
	expect(mag1).toBeCloseTo(1, 5);
	expect(mag2).toBeCloseTo(1, 5);
});
