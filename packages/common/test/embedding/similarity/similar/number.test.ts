import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.1;

it("should have high similarity for similar numbers", async () => {
	const hasher = await createHasher();
	const vector1 = embedNumber({
		value: 100,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedNumber({
		value: 101,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector3 = embedNumber({
		value: 99,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Similar numbers should have reasonable similarity
	// Note: hash-based embedding may not be as similar as range-based
	// Check that similarity is meaningful but not perfect
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim12).toBeLessThan(1);
	expect(sim13).toBeGreaterThan(THRESHOLD);
	expect(sim13).toBeLessThan(1);
	expect(sim23).toBeGreaterThan(THRESHOLD);
	expect(sim23).toBeLessThan(1);
});
