import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Mixed Styling", () => {
	it("should handle multiple slots with mixed styling approaches", () => {
		const Component = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
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
							],
						),
						label: what.css([
							"font-medium",
							"text-sm",
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
		expect(instance.root()).toBe("flex items-center bg-blue-600");
		expect(instance.label()).toBe("font-medium text-sm");
		expect(instance.icon()).toBe("bg-blue-600");
	});
});
