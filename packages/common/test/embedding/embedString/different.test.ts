import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../src/embedding";

it("should return different vectors for different inputs", async () => {
	const hasher = await createHasher();
	const vector1 = embedString({
		value: "test1",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedString({
		value: "test2",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	expect(vector1).not.toEqual(vector2);
});
