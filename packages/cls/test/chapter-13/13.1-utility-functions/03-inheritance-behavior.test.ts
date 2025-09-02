import { describe, expect, it } from "vitest";
import { cls, withVariants } from "../../../src";

describe("13.1 Utility Functions - withVariants - Inheritance Behavior", () => {
	it("should preserve inheritance behavior", () => {
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

		// Create child CLS instance
		const ChildCls = cls(
			{
				tokens: [
					"color.bg.primary",
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
					tone: [
						"primary",
						"secondary",
					],
				},
				"~use": BaseCls.contract,
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
				}),
				rules: [], // Add empty rules array
				defaults: def.defaults({
					size: "lg",
					tone: "primary",
				}),
			}),
		);

		// Test inheritance with withVariants
		const result = withVariants(ChildCls, () => ({
			variant: {
				size: "lg",
				tone: "secondary",
			},
		}));

		// Should inherit base defaults and merge with child defaults
		expect(result).toEqual({
			size: "lg",
			tone: "secondary",
		});
	});
});
