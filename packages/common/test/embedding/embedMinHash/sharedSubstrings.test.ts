import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";
import { similarity } from "../../../src/similarity";

const THRESHOLD = 0.1;

it("should have high similarity for strings with shared substrings", () => {
	const vector1 = unit(
		embedMinHash({
			value: "apple pie",
			dimensions: 64,
		}).slice(),
	);
	const vector2 = unit(
		embedMinHash({
			value: "apple cake",
			dimensions: 64,
		}).slice(),
	);
	const vector3 = unit(
		embedMinHash({
			value: "apple juice",
			dimensions: 64,
		}).slice(),
	);

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim23 = similarity(vector2, vector3);

	// Strings with shared substrings should have high similarity
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim13).toBeGreaterThan(THRESHOLD);
	expect(sim23).toBeGreaterThan(THRESHOLD);
});
