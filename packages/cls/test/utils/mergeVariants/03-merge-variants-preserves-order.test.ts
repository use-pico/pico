import { describe, expect, it } from "vitest";
import { mergeVariants } from "../../../src/utils/mergeVariants";

describe("utils/mergeVariants/merge-variants-preserves-order", () => {
	it("preserves order from first object then second", () => {
		const variantsA = {
			size: [
				"xs",
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
				"xs",
				"xl",
			],
			tone: [
				"dark",
				"light",
			],
		};

		const result = mergeVariants(variantsA, variantsB);

		expect(result).toEqual({
			size: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			],
			tone: [
				"light",
				"dark",
			],
		});
	});
});
