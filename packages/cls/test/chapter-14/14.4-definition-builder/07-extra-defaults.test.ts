import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Extra Defaults", () => {
	it("should validate that no extra defaults are provided", () => {
		expect(() => {
			contract()
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.def()
				.defaults({
					size: "md",
					tone: "light", // Extra default
				} as any) // Use 'as any' to bypass TypeScript validation for this error test
				.cls();
		}).toThrow("Extra default values not in contract variants: tone");
	});
});
