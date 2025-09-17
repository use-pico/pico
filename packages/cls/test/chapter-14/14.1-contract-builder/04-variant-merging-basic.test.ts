import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Variant Merging Basic", () => {
	it("should merge variant values when the same variant name is used multiple times", () => {
		// Test variant value merging behavior
		const result = contract()
			.variant("tone", [
				"light",
				"dark",
			])
			.variant("tone", [
				"foo",
				"bar",
			]) // Should merge, not override
			.variant("size", [
				"sm",
			])
			.variant("size", [
				"md",
				"lg",
			]) // Should merge, not override
			.build();

		// Verify that variant values were merged, not overridden
		expect(result.variant).toEqual({
			tone: [
				"light",
				"dark",
				"foo",
				"bar",
			],
			size: [
				"sm",
				"md",
				"lg",
			],
		});
	});
});
