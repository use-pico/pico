import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../src/embedding";

it("should return normalized vector", async () => {
	const hasher = await createHasher();
	const vector = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const magnitude = Math.sqrt(
		Array.from(vector).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
