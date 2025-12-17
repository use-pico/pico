import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";
import { similarity } from "../../../src/similarity";

const THRESHOLD = 0.5;

it("should have high similarity for similar strings", () => {
	const vector1 = unit(
		embedMinHash({
			value: "hello world",
			dimensions: 64,
		}).slice(),
	);
	const vector2 = unit(
		embedMinHash({
			value: "hello world!",
			dimensions: 64,
		}).slice(),
	);
	const vector3 = unit(
		embedMinHash({
			value: "Hello World",
			dimensions: 64,
		}).slice(),
	);
	const vector4 = unit(
		embedMinHash({
			value: "hello  world",
			dimensions: 64,
		}).slice(),
	);

	const sim12 = similarity(vector1, vector2);
	const sim13 = similarity(vector1, vector3);
	const sim14 = similarity(vector1, vector4);

	// Similar strings should have high similarity
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim13).toBeGreaterThan(THRESHOLD);
	expect(sim14).toBeGreaterThan(THRESHOLD);
});
