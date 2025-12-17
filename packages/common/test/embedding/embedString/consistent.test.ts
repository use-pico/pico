import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../src/embedding";

it("should return consistent vectors for same input", async () => {
	const hasher = await createHasher();
	const vector1 = embedString({
		value: "test",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedString({
		value: "test",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	expect(vector1).toEqual(vector2);
});
