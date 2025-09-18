import { describe, expect, it } from "vitest";
import { contract, type Slot } from "../../../src";

describe("14.5 Inheritance Builder - Double Level", () => {
	it("should handle double level inheritance with proper token and variant resolution", () => {
		// Level 1: Base theme contract
		const ThemeCls = contract()
			.tokens([
				"color.base",
				"spacing.unit",
			])
			.variant("theme", [
				"light",
				"dark",
			])
			.slot("root")
			.def()
			.token({
				"color.base": {
					class: [
						"text-gray-900",
					],
				},
				"spacing.unit": {
					class: [
						"p-1",
					],
				},
			})
			.root({
				root: {
					token: [
						"color.base",
						"spacing.unit",
					],
				},
			})
			.rule(
				{
					theme: "dark",
				},
				{
					root: {
						class: [
							"bg-gray-900",
						],
					},
				},
			)
			.defaults({
				theme: "light",
			})
			.cls();

		// Level 2: Component base contract inheriting from theme
		const ComponentCls = contract(ThemeCls.contract)
			.tokens([
				"color.primary",
				"color.border",
			])
			.slots([
				"content",
			])
			.variant("size", [
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
				"color.border": {
					class: [
						"border-gray-300",
					],
				},
				// Override inherited token
				"color.base": {
					class: [
						"text-gray-800",
					],
				},
				// Inherit parent token
				"spacing.unit": {
					class: [
						"p-1",
					],
				},
			})
			.root({
				root: {
					token: [
						"color.base",
						"spacing.unit",
					],
					class: [
						"border",
						"rounded",
					],
				},
			})
			.rule(
				{
					size: "lg",
				},
				{
					root: {
						token: [
							"spacing.unit",
						],
						class: [
							"text-lg",
						],
					},
				},
			)
			.defaults({
				theme: "light", // Inherited variant
				size: "md", // New variant
			})
			.cls();

		// Level 3: Specific button contract inheriting from component
		const ButtonCls = contract(ComponentCls.contract)
			.tokens([
				"color.hover",
			])
			.variant("variant", [
				"primary",
				"secondary",
			])
			.slot("button")
			.def()
			.token({
				"color.hover": {
					class: [
						"hover:bg-blue-100",
					],
				},
				// Override inherited tokens
				"color.primary": {
					class: [
						"text-blue-700",
					],
				},
				"color.border": {
					class: [
						"border-blue-300",
					],
				},
			})
			.rule(
				{
					variant: "primary",
				},
				{
					root: {
						token: [
							"color.primary",
							"color.hover",
						],
						class: [
							"bg-blue-50",
						],
					},
				},
			)
			.rule(
				{
					variant: "secondary",
				},
				{
					root: {
						token: [
							"color.border",
						],
						class: [
							"bg-transparent",
						],
					},
				},
			)
			.defaults({
				theme: "light", // From level 1
				size: "md", // From level 2
				variant: "primary", // New variant
			})
			.cls();

		const _slot: Slot.Optional<(typeof ButtonCls)["contract"]> = {
			button: {
				class: [],
			},
		};

		// Test level 1 (Theme)
		const themeSlots = ThemeCls.create();
		expect(themeSlots.root()).toContain("text-gray-900"); // color.base
		expect(themeSlots.root()).toContain("p-1"); // spacing.unit

		const themeDark = ThemeCls.create(({ what }) => ({
			variant: what.variant({
				theme: "dark",
			}),
		}));
		expect(themeDark.root()).toContain("bg-gray-900"); // theme: dark rule

		// Test level 2 (Component)
		const componentSlots = ComponentCls.create();
		expect(componentSlots.root()).toContain("text-gray-800"); // overridden color.base
		expect(componentSlots.root()).toContain("p-1"); // inherited spacing.unit
		expect(componentSlots.root()).toContain("border"); // root rule
		expect(componentSlots.content).toBeDefined();

		const componentLarge = ComponentCls.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(componentLarge.root()).toContain("text-lg"); // size: lg rule
		expect(componentLarge.root()).toContain("p-1"); // spacing.unit in rule

		// Test level 3 (Button)
		const buttonSlots = ButtonCls.create();
		expect(buttonSlots.root()).toBe(
			"p-1 border rounded text-blue-700 hover:bg-blue-100 bg-blue-50",
		);

		const buttonSecondary = ButtonCls.create(({ what }) => ({
			variant: what.variant({
				variant: "secondary",
			}),
		}));
		expect(buttonSecondary.root()).toBe(
			"text-gray-800 p-1 border rounded border-blue-300 bg-transparent",
		);

		// Test complex variant combination
		const buttonComplex = ButtonCls.create(({ what }) => ({
			variant: what.variant({
				theme: "dark",
				size: "lg",
				variant: "secondary",
			}),
		}));
		expect(buttonComplex.root()).toBe(
			"text-gray-800 border rounded p-1 text-lg border-blue-300 bg-transparent",
		);

		// Verify inheritance chain
		expect(ButtonCls.contract["~use"]).toBe(ComponentCls.contract);
		expect(ComponentCls.contract["~use"]).toBe(ThemeCls.contract);
		expect(ThemeCls.contract["~use"]).toBeUndefined();
	});
});
