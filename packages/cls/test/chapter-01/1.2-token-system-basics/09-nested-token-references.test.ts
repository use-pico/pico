import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Nested Token References", () => {
	it("should handle nested token references", () => {
		const Component = cls(
			{
				tokens: [
					"spacing.xs",
					"spacing.sm",
					"spacing.md",
					"spacing.lg",
					"padding.small",
					"padding.medium",
					"padding.large",
					"button.small",
					"button.medium",
					"button.large",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					// Base spacing tokens
					"spacing.xs": what.css([
						"px-1",
						"py-0.5",
					]),
					"spacing.sm": what.css([
						"px-2",
						"py-1",
					]),
					"spacing.md": what.css([
						"px-4",
						"py-2",
					]),
					"spacing.lg": what.css([
						"px-6",
						"py-3",
					]),
					// Padding tokens that reference spacing tokens
					"padding.small": what.token([
						"spacing.sm",
					]),
					"padding.medium": what.token([
						"spacing.md",
					]),
					"padding.large": what.token([
						"spacing.lg",
					]),
					// Button tokens that reference padding tokens
					"button.small": what.both(
						[
							"rounded",
							"font-medium",
						],
						[
							"padding.small",
						],
					),
					"button.medium": what.both(
						[
							"rounded",
							"font-medium",
						],
						[
							"padding.medium",
						],
					),
					"button.large": what.both(
						[
							"rounded",
							"font-medium",
						],
						[
							"padding.large",
						],
					),
				}),
				rules: [
					def.root({
						root: what.token([
							"button.large",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("px-6 py-3 rounded font-medium");
	});
});
