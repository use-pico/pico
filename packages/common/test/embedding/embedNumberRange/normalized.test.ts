import { expect, it } from "vitest";
import { embedNumberRange } from "../../../src/embedding";

it("should return normalized vector", () => {
	const vector = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const magnitude = Math.sqrt(
		Array.from(vector).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
