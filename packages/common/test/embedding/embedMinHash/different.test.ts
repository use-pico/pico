import { expect, it } from "vitest";
import { embedMinHash } from "../../../src/embedding/embed/embedMinHash";

it("should return different vectors for different inputs", () => {
	const vector1 = embedMinHash({
		value: "test1",
		dimensions: 64,
	});
	const vector2 = embedMinHash({
		value: "test2",
		dimensions: 64,
	});
	expect(vector1).not.toEqual(vector2);
});
