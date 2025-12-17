import { expect, it } from "vitest";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";

it("should return consistent vectors for same input", () => {
	const vector1 = embedMinHash({
		value: "test string",
		dimensions: 64,
	});
	const vector2 = embedMinHash({
		value: "test string",
		dimensions: 64,
	});
	expect(vector1).toEqual(vector2);
});
