import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.5 Inheritance - Three Level Inheritance", () => {
	it("should support fluent creation at three inheritance levels", () => {
		// Level 1: Base theme
		const BaseCls = contract()
			.tokens([
				"color.base.bg",
				"color.base.text",
			])
			.slots([
				"root",
			])
			.variant("theme", [
				"light",
				"dark",
			])
			.def()
			.token({
				"color.base.bg": {
					class: [
						"bg-white",
					],
				},
				"color.base.text": {
					class: [
						"text-gray-900",
					],
				},
			})
			.root({
				root: {
					token: [
						"color.base.bg",
						"color.base.text",
					],
				},
			})
			.defaults({
				theme: "light",
			})
			.cls();

		// Level 2: First extension (e.g., Interactive component)
		const InteractiveCls = contract(BaseCls.contract)
			.tokens([
				"color.interactive.border",
				"color.interactive.shadow",
			])
			.slots([
				"content",
			])
			.variant("state", [
				"default",
				"hover",
				"focus",
			])
			.def()
			.token({
				"color.interactive.border": {
					class: [
						"border-blue-300",
					],
				},
				"color.interactive.shadow": {
					class: [
						"shadow-blue-100",
					],
				},
			})
			.root({
				content: {
					token: [
						"color.interactive.border",
					],
				},
			})
			.defaults({
				state: "default",
				theme: "dark",
			})
			.cls();

		// Level 3: Second extension (e.g., Button component)
		const ButtonCls = contract(InteractiveCls.contract)
			.tokens([
				"size.button.padding",
				"size.button.text",
			])
			.slots([
				"icon",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("disabled", [
				"bool",
			])
			.def()
			.token({
				"size.button.padding": {
					class: [
						"px-4",
						"py-2",
					],
				},
				"size.button.text": {
					class: [
						"text-sm",
					],
				},
			})
			.rule(
				{
					size: "sm",
				},
				{
					icon: {
						class: [
							"w-4",
							"h-4",
						],
					},
				},
			)
			.rule(
				{
					size: "lg",
				},
				{
					icon: {
						class: [
							"w-6",
							"h-6",
						],
					},
				},
			)
			.defaults({
				size: "md", // New variant
				disabled: false, // New variant
				state: "focus",
				theme: "dark",
			})
			.cls();

		// Verify Level 1 (Base)
		expect(BaseCls).toBeDefined();
		expect(BaseCls.contract.tokens).toEqual([
			"color.base.bg",
			"color.base.text",
		]);
		expect(BaseCls.contract.slot).toEqual([
			"root",
		]);
		expect(BaseCls.contract.variant).toEqual({
			theme: [
				"light",
				"dark",
			],
		});
		expect((BaseCls.contract as any)["~use"]).toBeUndefined(); // No inheritance

		// Verify Level 2 (Interactive)
		expect(InteractiveCls).toBeDefined();
		expect(InteractiveCls.contract.tokens).toEqual([
			"color.interactive.border",
			"color.interactive.shadow",
		]);
		expect(InteractiveCls.contract.slot).toEqual([
			"content",
		]);
		expect(InteractiveCls.contract.variant).toEqual({
			state: [
				"default",
				"hover",
				"focus",
			],
		});
		expect((InteractiveCls.contract as any)["~use"]).toBe(BaseCls.contract); // Inherits from base

		// Verify Level 3 (Button)
		expect(ButtonCls).toBeDefined();
		expect(ButtonCls.contract.tokens).toEqual([
			"size.button.padding",
			"size.button.text",
		]);
		expect(ButtonCls.contract.slot).toEqual([
			"icon",
			"label",
		]);
		expect(ButtonCls.contract.variant).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
			disabled: [
				"bool",
			],
		});
		expect((ButtonCls.contract as any)["~use"]).toBe(
			InteractiveCls.contract,
		); // Inherits from interactive

		// Test functionality across all levels
		const baseInstance = BaseCls.create();
		expect(baseInstance.root()).toContain("bg-white");
		expect(baseInstance.root()).toContain("text-gray-900");

		const interactiveInstance = InteractiveCls.create();
		expect(interactiveInstance.content()).toContain("border-blue-300");

		const buttonInstance = ButtonCls.create();
		expect(buttonInstance.icon()).toBe(""); // Default size md -> no specific rule
		expect(buttonInstance.label).toBeDefined();

		// Test size variants on button
		const smallButtonInstance = ButtonCls.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(smallButtonInstance.icon()).toContain("w-4 h-4");

		const largeButtonInstance = ButtonCls.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(largeButtonInstance.icon()).toContain("w-6 h-6");

		// Verify inheritance chain integrity
		expect((ButtonCls.contract as any)["~use"]).toBe(
			InteractiveCls.contract,
		);
		expect(((ButtonCls.contract as any)["~use"] as any)["~use"]).toBe(
			BaseCls.contract,
		);
	});
});
