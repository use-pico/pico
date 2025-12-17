import { expect, it } from "vitest";
import { embedNumberRange } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.7;

it("should have high similarity for similar number ranges", () => {
	const vector1 = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector2 = embedNumberRange({
		value: 3.5,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector3 = embedNumberRange({
		value: 2.8,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Similar values should have high similarity but not perfect
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim12).toBeLessThan(1);
	expect(sim13).toBeGreaterThan(THRESHOLD);
	expect(sim13).toBeLessThan(1);
	expect(sim23).toBeGreaterThan(THRESHOLD);
	expect(sim23).toBeLessThan(1);
});
