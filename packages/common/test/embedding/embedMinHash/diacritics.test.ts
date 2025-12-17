import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";
import { similarity } from "../../../src/similarity";

const THRESHOLD = 0.5;

it("should have high similarity for strings with diacritics normalization", () => {
	const vector1 = unit(
		embedMinHash({
			value: "café",
			dimensions: 64,
		}).slice(),
	);
	const vector2 = unit(
		embedMinHash({
			value: "cafe",
			dimensions: 64,
		}).slice(),
	);
	const vector3 = unit(
		embedMinHash({
			value: "résumé",
			dimensions: 64,
		}).slice(),
	);
	const vector4 = unit(
		embedMinHash({
			value: "resume",
			dimensions: 64,
		}).slice(),
	);

	const sim12 = similarity(vector1, vector2);
	const sim34 = similarity(vector3, vector4);

	// Diacritics should be normalized, so they should be similar
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim34).toBeGreaterThan(THRESHOLD);
});
