import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

it("should have high similarity for identical strings", async () => {
	const hasher = await createHasher();
	const vector1 = embedString({
		value: "hello world",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedString({
		value: "hello world",
		hasher,
		dimensions: 10,
		weight: 1,
	});

	const sim = similarity(vector1, vector2);

	// Identical strings should have perfect similarity
	expect(sim).toBeCloseTo(1, 5);
});
