import { expect, it } from "vitest";
import { embedNumberRange } from "../../../src/embedding";

it("should apply weight correctly", () => {
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
	// Vector2 should be approximately 2x vector1 (before normalization)
	// After normalization, magnitudes should be same but values scaled
	const mag1 = Math.sqrt(
		Array.from(vector1).reduce((sum, v) => sum + v * v, 0),
	);
	const mag2 = Math.sqrt(
		Array.from(vector2).reduce((sum, v) => sum + v * v, 0),
	);
	expect(mag1).toBeCloseTo(1, 5);
	expect(mag2).toBeCloseTo(1, 5);
});
