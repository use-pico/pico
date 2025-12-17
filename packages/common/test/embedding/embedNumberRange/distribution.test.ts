/** biome-ignore-all lint/style/noNonNullAssertion: Ssst */
import { expect, it } from "vitest";
import { embedNumberRange } from "../../../src/embedding";

it("should create distribution centered at value", () => {
	const vector = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	// Middle index (3) should have highest value
	const middleValue = vector[3]!;
	expect(middleValue).toBeGreaterThan(vector[0]!);
	expect(middleValue).toBeGreaterThan(vector[6]!);
});
