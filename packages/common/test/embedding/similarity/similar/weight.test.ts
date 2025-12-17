import { expect, it } from "vitest";
import { embedNumberRange } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.9;

it("should have high similarity for same value with different weights", () => {
	const vector1 = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector2 = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 2,
	});

	const sim = similarity(vector1, vector2);

	// Same value should have high similarity even with different weights
	// (after normalization, they should be very similar but not perfect)
	expect(sim).toBeGreaterThan(THRESHOLD);
	expect(sim).toBeLessThan(1);
});
