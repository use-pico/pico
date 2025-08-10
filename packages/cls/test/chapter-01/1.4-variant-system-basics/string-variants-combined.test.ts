import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - String Variants Combined", () => {
	it("should handle combined string variants", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
					spacing: [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					intent: [
						"default",
						"primary",
					],
					size: [
						"sm",
						"md",
						"lg",
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
					spacing: {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"spacing.md",
						]),
					}),
					def.rule(
						what.variant({
							intent: "primary",
						}),
						{
							root: what.token([
								"color.bg.primary",
								"spacing.md",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.token([
								"color.bg.default",
								"spacing.sm",
							]),
						},
					),
					def.rule(
						what.variant({
							intent: "primary",
							size: "sm",
						}),
						{
							root: what.token([
								"color.bg.primary",
								"spacing.sm",
							]),
						},
					),
				],
				defaults: def.defaults({
					intent: "default",
					size: "md",
				}),
			}),
		);

		const defaultMdInstance = Button.create();
		expect(defaultMdInstance.root()).toBe("bg-gray-100 px-4 py-2");

		const primaryMdInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
			}),
		}));
		expect(primaryMdInstance.root()).toBe("bg-blue-600 px-4 py-2");

		const defaultSmInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(defaultSmInstance.root()).toBe("bg-gray-100 px-2 py-1");

		const primarySmInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
				size: "sm",
			}),
		}));
		expect(primarySmInstance.root()).toBe("bg-blue-600 px-2 py-1");
	});
});
