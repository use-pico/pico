import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.6 Bool Helper - Multiple Bool Variants", () => {
	it("should handle multiple boolean variants using the bool helper method", () => {
		// Create contract with multiple bool variants
		const ButtonCls = contract()
			.slots([
				"root",
				"icon",
			])
			.bool("disabled")
			.bool("loading")
			.bool("outlined")
			.def()
			.root({
				root: {
					class: [
						"btn-base",
						"px-4",
						"py-2",
					],
				},
			})
			.rule(
				{
					disabled: true,
				},
				{
					root: {
						class: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				},
			)
			.rule(
				{
					loading: true,
				},
				{
					root: {
						class: [
							"animate-pulse",
						],
					},
					icon: {
						class: [
							"animate-spin",
						],
					},
				},
			)
			.rule(
				{
					outlined: true,
				},
				{
					root: {
						class: [
							"border-2",
							"bg-transparent",
						],
					},
				},
			)
			.rule(
				{
					outlined: false,
				},
				{
					root: {
						class: [
							"bg-blue-500",
							"text-white",
						],
					},
				},
			)
			.defaults({
				disabled: false,
				loading: false,
				outlined: false,
			})
			.cls();

		// Test default state (all false)
		const { slots: defaultSlots } = ButtonCls.create();
		expect(defaultSlots.root()).toBe(
			"btn-base px-4 py-2 bg-blue-500 text-white",
		);

		// Test single bool variant
		const { slots: disabledSlots } = ButtonCls.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots.root()).toBe(
			"btn-base px-4 py-2 opacity-50 cursor-not-allowed bg-blue-500 text-white",
		);

		// Test multiple bool variants
		const { slots: loadingOutlinedSlots } = ButtonCls.create({
			variant: {
				loading: true,
				outlined: true,
			},
		});
		expect(loadingOutlinedSlots.root()).toBe(
			"btn-base px-4 py-2 animate-pulse border-2 bg-transparent",
		);
		expect(loadingOutlinedSlots.icon()).toBe("animate-spin");

		// Test all bool variants true
		const { slots: allTrueSlots } = ButtonCls.create({
			variant: {
				disabled: true,
				loading: true,
				outlined: true,
			},
		});
		expect(allTrueSlots.root()).toBe(
			"btn-base px-4 py-2 opacity-50 cursor-not-allowed animate-pulse border-2 bg-transparent",
		);
		expect(allTrueSlots.icon()).toBe("animate-spin");

		// Verify contract structure
		expect(ButtonCls.contract.variant).toEqual({
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
			outlined: [
				"bool",
			],
		});
	});
});
