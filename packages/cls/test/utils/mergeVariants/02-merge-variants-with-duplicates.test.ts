import { describe, expect, it } from "vitest";
import { mergeVariants } from "../../../src/utils/mergeVariants";

describe("utils/mergeVariants/merge-variants-with-duplicates", () => {
	it("merges variants with overlapping keys and deduplicates", () => {
		const variantsA = {
			size: [
				"sm",
				"md",
			],
			tone: [
				"light",
			],
		};
		const variantsB = {
			size: [
				"lg",
				"md",
			],
			tone: [
				"dark",
				"light",
			],
		};

		const result = mergeVariants(variantsA, variantsB);

		expect(result).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
			tone: [
				"light",
				"dark",
			],
		});
	});
});
