import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Type-Safe Variants", () => {
	it("should handle type-safe variant usage with what.variant", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					intent: [
						"default",
						"primary",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
					def.rule(
						what.variant({
							intent: "primary",
						}),
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.css([
								"px-6",
								"py-3",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
					intent: "default",
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const primaryInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
			}),
		}));
		expect(primaryInstance.root()).toBe("bg-blue-600");

		const largeInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(largeInstance.root()).toBe("bg-gray-100 px-6 py-3");

		const primaryLargeInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
				size: "lg",
			}),
		}));
		expect(primaryLargeInstance.root()).toBe("bg-blue-600 px-6 py-3");
	});
});
