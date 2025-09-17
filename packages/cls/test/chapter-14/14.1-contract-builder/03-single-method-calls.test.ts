import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Single Method Calls", () => {
	it("should handle individual method calls correctly", () => {
		const tokenContract = contract().token("color.primary").build();

		expect(tokenContract.tokens).toEqual([
			"color.primary",
		]);
		expect(tokenContract.slot).toEqual([]);
		expect(tokenContract.variant).toEqual({});

		const slotContract = contract().slot("root").build();

		expect(slotContract.tokens).toEqual([]);
		expect(slotContract.slot).toEqual([
			"root",
		]);
		expect(slotContract.variant).toEqual({});

		const variantContract = contract()
			.variant("size", [
				"sm",
				"md",
			])
			.build();

		expect(variantContract.tokens).toEqual([]);
		expect(variantContract.slot).toEqual([]);
		expect(variantContract.variant).toEqual({
			size: [
				"sm",
				"md",
			],
		});
	});
});
