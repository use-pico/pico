import { expect, it } from "vitest";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";

it("should return consistent vectors for empty string", () => {
	const vector1 = embedMinHash({
		value: "",
		dimensions: 64,
	});
	const vector2 = embedMinHash({
		value: "",
		dimensions: 64,
	});
	expect(vector1).toEqual(vector2);
});
