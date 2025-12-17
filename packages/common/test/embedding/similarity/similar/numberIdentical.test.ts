import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

it("should have high similarity for identical numbers", async () => {
	const hasher = await createHasher();
	const vector1 = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});

	const sim = similarity(vector1, vector2);

	// Identical numbers should have perfect similarity
	expect(sim).toBeCloseTo(1, 5);
});
