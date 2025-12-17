import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.8;

it("should have low similarity for very different numbers", async () => {
	const hasher = await createHasher();
	const vector1 = embedNumber({
		value: 1,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedNumber({
		value: 1000,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector3 = embedNumber({
		value: 999999,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Very different numbers should have low similarity
	// (hash-based embedding doesn't guarantee distance preservation)
	// Check that similarity is low
	expect(sim12).toBeLessThan(THRESHOLD);
	expect(sim13).toBeLessThan(THRESHOLD);
	expect(sim23).toBeLessThan(THRESHOLD);
});
