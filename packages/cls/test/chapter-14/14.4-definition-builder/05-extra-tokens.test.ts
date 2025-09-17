import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Extra Tokens", () => {
	it("should validate that no extra tokens are defined", () => {
		expect(() => {
			contract()
				.tokens([
					"color.primary",
				])
				.def()
				.token({
					"color.primary": {
						class: [
							"bg-blue-500",
						],
					},
					"color.secondary": {
						class: [
							"bg-red-500",
						],
					}, // Extra token
				} as any) // Use 'as any' to bypass TypeScript validation for this error test
				.cls();
		}).toThrow("Extra token definitions not in contract: color.secondary");
	});
});
