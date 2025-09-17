import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Tokens Required", () => {
	it("should require token() when contract has tokens", () => {
		expect(() => {
			contract()
				.tokens([
					"color.primary",
					"color.secondary",
				])
				.def()
				.cls(); // Missing .token() call
		}).toThrow(
			"Token definitions are required. Call .token() before .cls()",
		);
	});
});
