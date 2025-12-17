import { expect, it } from "vitest";
import { createHasher, embedNumber } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.7;

it("should have low similarity for opposite order numbers", async () => {
	const hasher = await createHasher();
	const vector1 = embedNumber({
		value: 100,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedNumber({
		value: 100,
		hasher,
		order: "desc",
		dimensions: 10,
		weight: 1,
	});

	const sim = similarity(vector1, vector2);

	// Same value but opposite order should have different embeddings
	// They should be noticeably different
	expect(sim).toBeLessThan(THRESHOLD);
});
