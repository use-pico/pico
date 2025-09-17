import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Variant Merging Empty", () => {
	it("should handle empty initial state with variant merging", () => {
		const result = contract()
			.variant("tone", [
				"light",
			])
			.variant("tone", [
				"dark",
			])
			.build();

		expect(result.variant).toEqual({
			tone: [
				"light",
				"dark",
			],
		});
	});
});
