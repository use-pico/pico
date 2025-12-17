import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";
import { similarity } from "../../../src/similarity";

const THRESHOLD = 0.5;

it("should have low similarity for completely different strings", () => {
	const vector1 = unit(
		embedMinHash({
			value: "hello",
			dimensions: 64,
		}).slice(),
	);
	const vector2 = unit(
		embedMinHash({
			value: "world",
			dimensions: 64,
		}).slice(),
	);
	const vector3 = unit(
		embedMinHash({
			value: "completely different text",
			dimensions: 64,
		}).slice(),
	);

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Completely different strings should have low similarity
	expect(sim12).toBeLessThan(THRESHOLD);
	expect(sim13).toBeLessThan(THRESHOLD);
	expect(sim23).toBeLessThan(THRESHOLD);
});
