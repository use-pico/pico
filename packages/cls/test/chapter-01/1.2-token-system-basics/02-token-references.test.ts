import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token References", () => {
	it("should handle token references in token definitions", () => {
		const Component = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"button.base",
					"button.primary",
					"button.secondary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					// Base color tokens
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-gray-200",
					]),
					// Base button token that references color tokens
					"button.base": what.both(
						[
							"px-4",
							"py-2",
							"rounded",
							"font-medium",
						],
						[
							"color.text.primary",
						],
					),
					// Primary button that references base button and primary colors
					"button.primary": what.token([
						"button.base",
						"color.bg.primary",
					]),
					// Secondary button that references base button and secondary colors
					"button.secondary": what.token([
						"button.base",
						"color.bg.secondary",
						"color.text.secondary",
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

		const instance = Component.create();
		expect(instance.root()).toBe(
			"px-4 py-2 rounded font-medium text-white bg-blue-600",
		);
	});
});
