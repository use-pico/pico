import { describe, expect, it } from "vitest";
import { cls, withVariants } from "../../../src";

describe("13.1 Utility Functions - withVariants - Complex Inheritance Chains", () => {
	it("should handle complex inheritance chains correctly", () => {
		// Create base CLS instance
		const BaseCls = cls(
			{
				tokens: [
					"color.bg.base",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.base": what.css([
						"bg-gray-100",
					]),
				}),
				rules: [], // Add empty rules array
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		// Create middle CLS instance
		const MiddleCls = cls(
			{
				tokens: [
					"color.bg.middle",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					theme: [
						"light",
						"dark",
					],
				},
				"~use": BaseCls.contract,
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.middle": what.css([
						"bg-blue-200",
					]),
				}),
				rules: [], // Add empty rules array
				defaults: def.defaults({
					size: "md",
					theme: "light",
				}),
			}),
		);

		// Create child CLS instance
		const ChildCls = cls(
			{
				tokens: [
					"color.bg.child",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
						"xl",
					],
					theme: [
						"light",
						"dark",
					],
					tone: [
						"primary",
						"secondary",
					],
				},
				"~use": MiddleCls.contract,
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.child": what.css([
						"bg-green-300",
					]),
				}),
				rules: [], // Add empty rules array
				defaults: def.defaults({
					size: "xl",
					theme: "light",
					tone: "primary",
				}),
			}),
		);

		// Test complex inheritance with withVariants
		const result = withVariants(ChildCls, () => ({
			variant: {
				size: "xl",
				theme: "dark",
				tone: "secondary",
			},
		}));

		// Should inherit from all layers: Base (size: "md") -> Middle (theme: "light") -> Child (tone: "primary")
		// Then override with user config: size: "xl", theme: "dark", tone: "secondary"
		expect(result).toEqual({
			size: "xl",
			theme: "dark",
			tone: "secondary",
		});
	});
});
