import { expect, it } from "vitest";
import { embedNumberRange } from "../../../src/embedding";

it("should create a vector with correct dimensions", () => {
	const vector = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	expect(vector.length).toBe(7);
});
