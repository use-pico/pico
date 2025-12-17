import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../src/embedding";

it("should return consistent vectors for same input", async () => {
	const hasher = await createHasher();
	const vector1 = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	expect(vector1).toEqual(vector2);
});
