import { expect, it } from "vitest";
import { createHasher, embedString } from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.5;

it("should have low similarity for different strings", async () => {
	const hasher = await createHasher();
	const vector1 = embedString({
		value: "hello",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector2 = embedString({
		value: "world",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const vector3 = embedString({
		value: "completely different text",
		hasher,
		dimensions: 10,
		weight: 1,
	});

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Different strings should have low similarity
	expect(sim12).toBeLessThan(THRESHOLD);
	expect(sim13).toBeLessThan(THRESHOLD);
	expect(sim23).toBeLessThan(THRESHOLD);
});
