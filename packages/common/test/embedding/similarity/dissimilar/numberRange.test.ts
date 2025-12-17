import { expect, it } from "vitest";
import { embedNumberRange } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.5;

it("should have low similarity for distant number ranges", () => {
	const vector1 = embedNumberRange({
		value: 0,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector2 = embedNumberRange({
		value: 6,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector3 = embedNumberRange({
		value: 1,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);

	// Distant values should have low similarity
	expect(sim12).toBeLessThan(THRESHOLD);
	// Closer values should have higher similarity than distant ones
	expect(sim13).toBeGreaterThan(sim12);
});
