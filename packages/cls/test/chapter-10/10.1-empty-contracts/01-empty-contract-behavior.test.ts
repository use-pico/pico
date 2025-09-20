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
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		// Verify that empty component can be created
		expect(typeof EmptyComponent.create).toBe("function");
		expect(typeof EmptyComponent.extend).toBe("function");
		expect(typeof EmptyComponent.use).toBe("function");
		expect(EmptyComponent.contract.tokens).toEqual([]);
		expect(EmptyComponent.contract.slot).toEqual([]);
		expect(EmptyComponent.contract.variant).toEqual({});

		// Test that empty component can create instances
		const { slots: emptyInstance } = EmptyComponent.create();
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"p-4",
									"bg-white",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Verify minimal component behavior
		expect(MinimalComponent.contract.slot).toEqual([
			"root",
		]);
		expect(MinimalComponent.contract.tokens).toEqual([]);
		expect(MinimalComponent.contract.variant).toEqual({});

		// Test that minimal component can create instances with styles
		const { slots: minimalInstance } = MinimalComponent.create();
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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.text.default": {
						class: [
							"text-gray-900",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Verify token-only component behavior
		expect(TokenOnlyComponent.contract.tokens).toContain(
			"color.bg.default",
		);
		expect(TokenOnlyComponent.contract.variant).toEqual({});

		// Test that token-only component can create instances
		const { slots: tokenInstance } = TokenOnlyComponent.create();
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"p-4",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"p-2",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"p-6",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		// Verify variant-only component behavior
		expect(VariantOnlyComponent.contract.tokens).toEqual([]);
		expect(VariantOnlyComponent.contract.variant?.size).toEqual([
			"sm",
			"md",
			"lg",
		]);

		// Test that variant-only component can create instances with variants
		const { slots: smallInstance } = VariantOnlyComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallInstance.root()).toBe("p-2");

		const { slots: largeInstance } = VariantOnlyComponent.create({
			variant: {
				size: "lg",
			},
		});
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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Verify that extending empty component works
		expect(ExtendedEmpty.contract.tokens).toContain("color.bg.default");
		expect(ExtendedEmpty.contract.slot).toEqual([
			"root",
		]);

		// Test that extended empty component can create instances
		const { slots: extendedInstance } = ExtendedEmpty.create();
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"p-4",
									"bg-white",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Test that extended empty component with slots works
		const { slots: extendedWithSlotsInstance } = ExtendedWithSlots.create();
		expect(extendedWithSlotsInstance.root()).toBe("p-4 bg-white");
	});
});
