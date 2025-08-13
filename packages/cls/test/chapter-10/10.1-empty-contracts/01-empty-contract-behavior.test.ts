import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("10.1 Empty Contracts", () => {
	it("should handle edge cases with minimal or empty contracts", () => {
		// Test with completely empty contract
		const EmptyComponent = cls(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			({ def }) => ({
				token: def.token({}),
				rules: [],
				defaults: def.defaults({}),
			}),
		);

		// Verify that empty component can be created
		expect(typeof EmptyComponent.create).toBe("function");
		expect(typeof EmptyComponent.extend).toBe("function");
		expect(typeof EmptyComponent.use).toBe("function");
		expect(EmptyComponent.contract.tokens).toEqual([]);
		expect(EmptyComponent.contract.slot).toEqual([]);
		expect(EmptyComponent.contract.variant).toEqual({});

		// Test that empty component can create instances
		const emptyInstance = EmptyComponent.create();
		expect(emptyInstance).toBeDefined();
		// Since there are no slots, we can't call any slot methods

		// Test with minimal contract (only slots, no tokens or variants)
		const MinimalComponent = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({}),
				rules: [
					def.root({
						root: what.css([
							"p-4",
							"bg-white",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
		);

		// Verify minimal component behavior
		expect(MinimalComponent.contract.slot).toEqual([
			"root",
		]);
		expect(MinimalComponent.contract.tokens).toEqual([]);
		expect(MinimalComponent.contract.variant).toEqual({});

		// Test that minimal component can create instances with styles
		const minimalInstance = MinimalComponent.create();
		expect(minimalInstance.root()).toBe("p-4 bg-white");

		// Test with contract that has tokens but no variants
		const TokenOnlyComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.text.default",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.text.default": [
						"text-gray-900",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
		);

		// Verify token-only component behavior
		expect(TokenOnlyComponent.contract.tokens).toContain(
			"color.bg.default",
		);
		expect(TokenOnlyComponent.contract.variant).toEqual({});

		// Test that token-only component can create instances
		const tokenInstance = TokenOnlyComponent.create();
		expect(tokenInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test with contract that has variants but no tokens
		const VariantOnlyComponent = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({}),
				rules: [
					def.root({
						root: what.css([
							"p-4",
						]),
					}),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"p-2",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"p-6",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		// Verify variant-only component behavior
		expect(VariantOnlyComponent.contract.tokens).toEqual([]);
		expect(VariantOnlyComponent.contract.variant?.size).toEqual([
			"sm",
			"md",
			"lg",
		]);

		// Test that variant-only component can create instances with variants
		const smallInstance = VariantOnlyComponent.create(() => ({
			variant: {
				size: "sm",
			},
		}));
		expect(smallInstance.root()).toBe("p-2");

		const largeInstance = VariantOnlyComponent.create(() => ({
			variant: {
				size: "lg",
			},
		}));
		expect(largeInstance.root()).toBe("p-6");

		// Test extending empty components
		const ExtendedEmpty = EmptyComponent.extend(
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
				token: def.token({
					"color.bg.default": [
						"bg-blue-500",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
		);

		// Verify that extending empty component works
		expect(ExtendedEmpty.contract.tokens).toContain("color.bg.default");
		expect(ExtendedEmpty.contract.slot).toEqual([
			"root",
		]);

		// Test that extended empty component can create instances
		const extendedInstance = ExtendedEmpty.create();
		expect(extendedInstance.root()).toBe("bg-blue-500");

		// Test using empty components
		// Note: EmptyComponent has no slots, so it can't use MinimalComponent directly
		// Instead, test that we can extend EmptyComponent to add slots
		const ExtendedWithSlots = EmptyComponent.extend(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({}),
				rules: [
					def.root({
						root: what.css([
							"p-4",
							"bg-white",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
		);

		// Test that extended empty component with slots works
		const extendedWithSlotsInstance = ExtendedWithSlots.create();
		expect(extendedWithSlotsInstance.root()).toBe("p-4 bg-white");
	});
});
