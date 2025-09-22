import { describe, expect, it } from "vitest";
import { mergeVariants } from "../../../src/utils/mergeVariants";

describe("utils/mergeVariants/merge-variants-basic", () => {
	it("merges two variant objects with no overlapping keys", () => {
		const variantsA = {
			size: [
				"sm",
				"md",
			],
		};
		const variantsB = {
			tone: [
				"light",
				"dark",
			],
		};

		const result = mergeVariants(variantsA, variantsB);

		expect(result).toEqual({
			size: [
				"sm",
				"md",
			],
			tone: [
				"light",
				"dark",
			],
		});
	});
});
