import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Missing Tokens", () => {
	it("should validate that all contract tokens are defined", () => {
		expect(() => {
			contract()
				.tokens([
					"color.primary",
					"color.secondary",
					"spacing.sm",
				])
				.def()
				.token({
					"color.primary": {
						class: [
							"bg-blue-500",
						],
					},
					// Missing "color.secondary" and "spacing.sm"
				} as any) // Use 'as any' to bypass TypeScript validation for this error test
				.cls();
		}).toThrow("Missing token definitions: color.secondary, spacing.sm");
	});
});
