import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Missing Defaults", () => {
	it("should validate that all contract variants have defaults", () => {
		expect(() => {
			contract()
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.variant("tone", [
					"light",
					"dark",
				])
				.def()
				.defaults({
					size: "md",
					// Missing "tone" default
				} as any) // Use 'as any' to bypass TypeScript validation for this error test
				.cls();
		}).toThrow("Missing default values for variants: tone");
	});
});
