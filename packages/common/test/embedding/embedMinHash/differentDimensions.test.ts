import { expect, it } from "vitest";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";

it("should return consistent vectors for same input with different dimensions", () => {
	const vector1 = embedMinHash({
		value: "hello world",
		dimensions: 32,
	});
	const vector2 = embedMinHash({
		value: "hello world",
		dimensions: 32,
	});
	expect(vector1).toEqual(vector2);
});
