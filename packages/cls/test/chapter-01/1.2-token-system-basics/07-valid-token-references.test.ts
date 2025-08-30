import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Valid Token References", () => {
	it("should not throw error for valid token references", () => {
		const Component = cls(
			{
				tokens: [
					"color.primary",
					"spacing.md",
					"button.base",
					"button.primary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.primary": what.css([
						"bg-blue-600",
						"text-white",
					]),
					"spacing.md": what.css([
						"px-4",
						"py-2",
					]),
					"button.base": what.both(
						[
							"rounded",
							"font-medium",
						],
						[
							"spacing.md",
						],
					),
					"button.primary": what.token([
						"button.base",
						"color.primary",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"button.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// This should not throw an error
		const instance = Component.create();
		expect(instance.root()).toBe(
			"px-4 py-2 rounded font-medium bg-blue-600 text-white",
		);
	});
});
