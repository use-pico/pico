import { describe, expect, it } from "vitest";
import { cls } from "../src/cls";
import { withVariants } from "../src/withVariants";

describe("withVariants standalone function", () => {
	it("should compute variants with the same behavior as create method", () => {
		// Create a simple contract and definition
		const contract = {
			tokens: [
				"color.bg",
				"color.text",
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
		} as const;

		const definition = ({ what, def }: any) => ({
			token: def.token({
				"color.bg": what.css([
					"bg-white",
				]),
				"color.text": what.css([
					"text-black",
				]),
			}),
			rules: [
				def.rule(
					what.variant({
						size: "sm",
					}),
					{
						root: what.css([
							"px-2",
							"py-1",
						]),
					},
				),
				def.rule(
					what.variant({
						size: "md",
					}),
					{
						root: what.css([
							"px-4",
							"py-2",
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
				theme: "light",
			}),
		});

		// Create CLS instance
		const ButtonCls = cls(contract, definition);

		// Test the create method
		const slots = ButtonCls.create(
			() => ({
				variant: {
					size: "lg",
				},
			}),
			() => ({
				variant: {
					theme: "dark",
				},
			}),
		);

		// Test the standalone withVariants function
		const result = withVariants(
			ButtonCls,
			() => ({
				variant: {
					size: "lg",
				},
			}),
			() => ({
				variant: {
					theme: "dark",
				},
			}),
		);

		// Verify that both approaches produce the same effective variant
		expect(result).toEqual({
			size: "lg",
			theme: "dark",
		});

		// Verify that the create method still works and produces the same result
		const createResult = slots.root();
		expect(createResult).toContain("px-6");
		expect(createResult).toContain("py-3");
	});

	it("should handle undefined config functions gracefully", () => {
		const contract = {
			tokens: [
				"color.bg",
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
		} as const;

		const definition = ({ what, def }: any) => ({
			token: def.token({
				"color.bg": what.css([
					"bg-blue-500",
				]),
			}),
			rules: [], // Add empty rules array
			defaults: def.defaults({
				size: "md",
			}),
		});

		// Create CLS instance
		const ButtonCls = cls(contract, definition);

		// Test with undefined config functions
		const result = withVariants(ButtonCls);

		// Should use defaults when no config is provided
		expect(result).toEqual({
			size: "md",
		});
	});

	it("should preserve inheritance behavior", () => {
		const baseContract = {
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
		} as const;

		const baseDefinition = ({ what, def }: any) => ({
			token: def.token({
				"color.bg.base": what.css([
					"bg-gray-100",
				]),
			}),
			rules: [], // Add empty rules array
			defaults: def.defaults({
				size: "md",
			}),
		});

		const childContract = {
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
			"~use": baseContract,
		} as const;

		const childDefinition = ({ what, def }: any) => ({
			token: def.token({
				"color.bg.primary": what.css([
					"bg-blue-500",
				]),
			}),
			rules: [], // Add empty rules array
			defaults: def.defaults({
				tone: "primary",
			}),
		});

		// Create CLS instances
		const BaseCls = cls(baseContract, baseDefinition);
		const ChildCls = cls(childContract, childDefinition);

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
