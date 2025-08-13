import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance", () => {
	it("should handle token inheritance from parent components", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const ExtendedComponent = BaseComponent.extend?.(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-blue-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = ExtendedComponent.create?.();
		expect(instance.root?.()).toBe("bg-blue-100");
	});
});
