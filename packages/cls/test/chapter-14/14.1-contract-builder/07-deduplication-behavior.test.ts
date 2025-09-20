import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Deduplication Behavior", () => {
	it("should deduplicate tokens, slots, and variants when called multiple times with same values", () => {
		// Create contract with duplicate calls
		const TestCls = contract()
			.tokens([
				"color.bg",
				"color.text",
			])
			.tokens([
				"color.bg", // Duplicate token
				"color.border",
			])
			.token("color.text") // Duplicate token
			.token("spacing.padding")
			.slots([
				"root",
				"label",
			])
			.slots([
				"root", // Duplicate slot
				"icon",
			])
			.slot("label") // Duplicate slot
			.slot("badge")
			.variant("size", [
				"sm",
				"md",
			])
			.variant("size", [
				"md", // Duplicate value
				"lg",
			])
			.variant("theme", [
				"light",
				"dark",
			])
			.variant("theme", [
				"dark", // Duplicate value
			])
			.bool("disabled")
			.bool("disabled") // Duplicate bool variant
			.bool("loading")
			.def()
			.token({
				"color.bg": {
					class: [
						"bg-white",
					],
				},
				"color.text": {
					class: [
						"text-gray-900",
					],
				},
				"color.border": {
					class: [
						"border-gray-200",
					],
				},
				"spacing.padding": {
					class: [
						"p-4",
					],
				},
			})
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.defaults({
				size: "md",
				theme: "light",
				disabled: false,
				loading: false,
			})
			.cls();

		// Verify tokens are deduplicated
		expect(TestCls.contract.tokens).toEqual([
			"color.bg",
			"color.text",
			"color.border",
			"spacing.padding",
		]);
		expect(TestCls.contract.tokens.length).toBe(4);

		// Verify slots are deduplicated
		expect(TestCls.contract.slot).toEqual([
			"root",
			"label",
			"icon",
			"badge",
		]);
		expect(TestCls.contract.slot.length).toBe(4);

		// Verify variant values are deduplicated
		expect(TestCls.contract.variant).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
			theme: [
				"light",
				"dark",
			],
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
		});

		// Verify size variant has deduplicated values
		expect(TestCls.contract.variant.size.length).toBe(3);
		expect(TestCls.contract.variant.size).toContain("sm");
		expect(TestCls.contract.variant.size).toContain("md");
		expect(TestCls.contract.variant.size).toContain("lg");

		// Verify theme variant has deduplicated values
		expect(TestCls.contract.variant.theme.length).toBe(2);
		expect(TestCls.contract.variant.theme).toContain("light");
		expect(TestCls.contract.variant.theme).toContain("dark");

		// Verify bool variants are deduplicated
		expect(TestCls.contract.variant.disabled).toEqual([
			"bool",
		]);
		expect(TestCls.contract.variant.loading).toEqual([
			"bool",
		]);

		// Verify functionality still works correctly
		const { slots: defaultSlots } = TestCls.create();
		expect(defaultSlots.root()).toBe("base");

		const { slots: customSlots } = TestCls.create({
			variant: {
				size: "lg",
				theme: "dark",
				disabled: true,
				loading: true,
			},
		});
		expect(customSlots.root()).toBe("base");
	});
});
