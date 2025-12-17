import { expect, it } from "vitest";
import { embedNumberRange } from "../../../src/embedding";

it("should clamp value to range", () => {
	const vector1 = embedNumberRange({
		value: -1,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const vector2 = embedNumberRange({
		value: 0,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	expect(vector1).toEqual(vector2);
});
