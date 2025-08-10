import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Class Order", () => {
	it("should maintain correct class order across multiple slots", () => {
		const Component = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
					],
					spacing: [
						"md",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
					},
					spacing: {
						md: [
							"px-4",
							"py-2",
						],
					},
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"flex",
								"items-center",
							],
							[
								"color.bg.primary",
								"spacing.md",
							],
						),
						label: what.css([
							"font-medium",
						]),
						icon: what.token([
							"color.bg.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create();
		const rootClasses = instance.root();
		const labelClasses = instance.label();
		const iconClasses = instance.icon();

		// Root should have both base classes and tokens
		expect(rootClasses).toBe("flex items-center bg-blue-600 px-4 py-2");

		// Label should have only base classes
		expect(labelClasses).toBe("font-medium");

		// Icon should have only tokens
		expect(iconClasses).toBe("bg-blue-600");
	});
});
