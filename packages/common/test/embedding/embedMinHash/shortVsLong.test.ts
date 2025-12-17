import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";
import { similarity } from "../../../src/similarity";

const THRESHOLD = 0.5;

it("should have low similarity for short vs long strings", () => {
	const vector1 = unit(
		embedMinHash({
			value: "hi",
			dimensions: 64,
		}).slice(),
	);
	const vector2 = unit(
		embedMinHash({
			value: "This is a very long string with many words that should produce a different embedding",
			dimensions: 64,
		}).slice(),
	);

	const sim = similarity(vector1, vector2);

	// Short and long strings should have low similarity
	expect(sim).toBeLessThan(THRESHOLD);
});
