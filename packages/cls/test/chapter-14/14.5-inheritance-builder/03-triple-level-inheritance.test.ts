import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.5 Inheritance Builder - Triple Level", () => {
	it("should handle triple level inheritance with complex token and variant interactions", () => {
		// Level 1: Design system foundation
		const FoundationCls = contract()
			.tokens([
				"typography.base",
				"spacing.base",
				"color.neutral",
			])
			.variant("density", [
				"compact",
				"comfortable",
				"spacious",
			])
			.slot("root")
			.def()
			.token({
				"typography.base": {
					class: [
						"font-sans",
					],
				},
				"spacing.base": {
					class: [
						"p-2",
					],
				},
				"color.neutral": {
					class: [
						"text-gray-700",
					],
				},
			})
			.root({
				root: {
					token: [
						"typography.base",
						"spacing.base",
						"color.neutral",
					],
				},
			})
			.rule(
				{
					density: "compact",
				},
				{
					root: {
						class: [
							"p-1",
						],
					},
				},
			)
			.rule(
				{
					density: "spacious",
				},
				{
					root: {
						class: [
							"p-4",
						],
					},
				},
			)
			.defaults({
				density: "comfortable",
			})
			.cls();

		// Level 2: UI component library base
		const UIBaseCls = contract(FoundationCls.contract)
			.tokens([
				"color.primary",
				"color.surface",
				"border.width",
			])
			.slots([
				"root",
				"content",
				"header",
			])
			.variant("elevation", [
				"flat",
				"raised",
				"floating",
			])
			.variant("radius", [
				"none",
				"sm",
				"md",
				"lg",
			])
			.def()
			.token({
				"color.primary": {
					class: [
						"text-blue-600",
					],
				},
				"color.surface": {
					class: [
						"bg-white",
					],
				},
				"border.width": {
					class: [
						"border",
					],
				},
				// Override foundation token
				"color.neutral": {
					class: [
						"text-gray-600",
					],
				},
				// Inherit foundation tokens
				"typography.base": {
					class: [
						"font-sans",
					],
				},
				"spacing.base": {
					class: [
						"p-2",
					],
				},
			})
			.root({
				root: {
					token: [
						"typography.base",
						"color.surface",
					],
					class: [
						"rounded",
					],
				},
			})
			.rule(
				{
					elevation: "raised",
				},
				{
					root: {
						class: [
							"shadow-md",
						],
					},
				},
			)
			.rule(
				{
					elevation: "floating",
				},
				{
					root: {
						class: [
							"shadow-lg",
						],
					},
				},
			)
			.rule(
				{
					radius: "none",
				},
				{
					root: {
						class: [
							"rounded-none",
						],
					},
				},
			)
			.rule(
				{
					radius: "lg",
				},
				{
					root: {
						class: [
							"rounded-lg",
						],
					},
				},
			)
			.defaults({
				density: "comfortable", // From foundation
				elevation: "flat",
				radius: "md",
			})
			.cls();

		// Level 3: Specific component (Card)
		const CardCls = contract(UIBaseCls.contract)
			.tokens([
				"color.title",
				"color.description",
			])
			.variant("variant", [
				"default",
				"outlined",
				"filled",
			])
			.variant("interactive", [
				"static",
				"clickable",
				"hoverable",
			])
			.def()
			.token({
				"color.title": {
					class: [
						"text-gray-900",
					],
				},
				"color.description": {
					class: [
						"text-gray-500",
					],
				},
				// Override parent tokens
				"color.primary": {
					class: [
						"text-blue-700",
					],
				},
				"border.width": {
					class: [
						"border-2",
					],
				},
				// Inherit tokens from parent layers
				"typography.base": {
					class: [
						"font-sans",
					],
				},
				"color.surface": {
					class: [
						"bg-white",
					],
				},
			})
			.rule(
				{
					variant: "outlined",
				},
				{
					root: {
						token: [
							"border.width",
						],
						class: [
							"bg-transparent",
						],
					},
				},
			)
			.rule(
				{
					variant: "filled",
				},
				{
					root: {
						token: [
							"color.primary",
						],
						class: [
							"bg-blue-50",
						],
					},
				},
			)
			.rule(
				{
					interactive: "clickable",
				},
				{
					root: {
						class: [
							"cursor-pointer",
							"hover:shadow-md",
						],
					},
				},
			)
			.rule(
				{
					interactive: "hoverable",
				},
				{
					root: {
						class: [
							"hover:bg-gray-50",
						],
					},
				},
			)
			.defaults({
				density: "comfortable", // From foundation
				elevation: "raised", // Override UI base
				radius: "lg", // Override UI base
				variant: "default",
				interactive: "static",
			})
			.cls();

		// Level 4: Specialized card (Product Card)
		const ProductCardCls = contract(CardCls.contract)
			.tokens([
				"color.price",
				"color.badge",
			])
			.slots([
				"image",
				"badge",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("status", [
				"available",
				"sold",
				"featured",
			])
			.def()
			.token({
				"color.price": {
					class: [
						"text-green-600",
					],
				},
				"color.badge": {
					class: [
						"text-white",
						"bg-red-500",
					],
				},
				// Override multiple levels
				"color.title": {
					class: [
						"text-black",
						"font-semibold",
					],
				},
				"color.surface": {
					class: [
						"bg-gray-50",
					],
				},
				// Inherit tokens from all parent layers
				"typography.base": {
					class: [
						"font-sans",
					],
				},
			})
			.rule(
				{
					size: "sm",
				},
				{
					root: {
						class: [
							"max-w-xs",
						],
					},
					content: {
						class: [
							"p-3",
						],
					},
				},
			)
			.rule(
				{
					size: "lg",
				},
				{
					root: {
						class: [
							"max-w-lg",
						],
					},
					content: {
						class: [
							"p-6",
						],
					},
				},
			)
			.rule(
				{
					status: "featured",
				},
				{
					root: {
						token: [
							"color.badge",
						],
						class: [
							"ring-2",
							"ring-yellow-400",
						],
					},
					badge: {
						token: [
							"color.badge",
						],
						class: [
							"absolute",
							"top-2",
							"right-2",
						],
					},
				},
			)
			.rule(
				{
					status: "sold",
				},
				{
					root: {
						class: [
							"opacity-75",
						],
					},
				},
			)
			.defaults({
				density: "comfortable", // From foundation
				elevation: "raised", // From card
				radius: "lg", // From card
				variant: "filled", // Override card
				interactive: "clickable", // Override card
				size: "md",
				status: "available",
			})
			.cls();

		// Test Level 1 (Foundation)
		const { slots: foundationSlots } = FoundationCls.create();
		expect(foundationSlots.root()).toBe("font-sans p-2 text-gray-700");

		const { slots: foundationCompact } = FoundationCls.create({
			variant: {
				density: "compact",
			},
		});
		expect(foundationCompact.root()).toBe("font-sans text-gray-700 p-1");

		// Test Level 2 (UI Base)
		const { slots: uiBaseSlots } = UIBaseCls.create();
		expect(uiBaseSlots.root()).toBe(
			"p-2 text-gray-600 font-sans bg-white rounded",
		);
		expect(uiBaseSlots.content).toBeDefined();
		expect(uiBaseSlots.header).toBeDefined();

		const { slots: uiBaseRaised } = UIBaseCls.create({
			variant: {
				elevation: "raised",
			},
		});
		expect(uiBaseRaised.root()).toBe(
			"p-2 text-gray-600 font-sans bg-white rounded shadow-md",
		);

		// Test Level 3 (Card)
		const { slots: cardSlots } = CardCls.create();
		expect(cardSlots.root()).toBe(
			"p-2 text-gray-600 font-sans bg-white shadow-md rounded-lg",
		);

		const { slots: cardOutlined } = CardCls.create({
			variant: {
				variant: "outlined",
			},
		});
		expect(cardOutlined.root()).toBe(
			"p-2 text-gray-600 font-sans shadow-md rounded-lg border-2 bg-transparent",
		);

		// Test Level 4 (Product Card)
		const { slots: productSlots } = ProductCardCls.create();
		expect(productSlots.root()).toBe(
			"p-2 font-sans shadow-md rounded-lg text-blue-700 bg-blue-50 cursor-pointer hover:shadow-md",
		);
		expect(productSlots.image).toBeDefined();
		expect(productSlots.badge).toBeDefined();

		const { slots: productFeatured } = ProductCardCls.create({
			variant: {
				size: "lg",
				status: "featured",
			},
		});
		expect(productFeatured.root()).toBe(
			"p-2 font-sans shadow-md rounded-lg cursor-pointer hover:shadow-md max-w-lg text-white bg-red-500 ring-2 ring-yellow-400",
		);
		expect(productFeatured.content()).toBe("p-6");
		expect(productFeatured.badge()).toBe(
			"text-white bg-red-500 absolute top-2 right-2",
		);

		// Test complex multi-level variant combination
		const { slots: productComplex } = ProductCardCls.create({
			variant: {
				density: "spacious", // From foundation
				elevation: "floating", // From UI base
				radius: "none", // From UI base
				variant: "outlined", // From card
				interactive: "hoverable", // From card
				size: "sm", // From product card
				status: "sold", // From product card
			},
		});
		expect(productComplex.root()).toBe(
			"text-gray-600 p-4 font-sans shadow-lg rounded-none border-2 bg-transparent hover:bg-gray-50 max-w-xs opacity-75",
		);

		// Verify complete inheritance chain
		expect(ProductCardCls.contract["~use"]).toBe(CardCls.contract);
		expect(CardCls.contract["~use"]).toBe(UIBaseCls.contract);
		expect(UIBaseCls.contract["~use"]).toBe(FoundationCls.contract);
		expect(FoundationCls.contract["~use"]).toBeUndefined();
	});
});
