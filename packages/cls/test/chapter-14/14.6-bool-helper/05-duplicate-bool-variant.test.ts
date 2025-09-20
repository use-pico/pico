import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.6 Bool Helper - Duplicate Bool Variant", () => {
	it("should handle duplicate bool variant calls by deduplicating entries", () => {
		// Create contract with duplicate bool variant calls
		const ButtonCls = contract()
			.slots([
				"root",
			])
			.bool("disabled")
			.bool("disabled") // Duplicate call - should not create duplicate entry
			.bool("disabled") // Another duplicate call
			.bool("loading")
			.bool("loading") // Duplicate of loading
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
				},
			)
			.defaults({
				disabled: false,
				loading: false,
			})
			.cls();

		// Test that functionality works normally despite duplicate calls
		const { slots: defaultSlots } = ButtonCls.create();
		expect(defaultSlots.root()).toBe("btn-base px-4 py-2");

		const { slots: disabledSlots } = ButtonCls.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots.root()).toBe(
			"btn-base px-4 py-2 opacity-50 cursor-not-allowed",
		);

		const { slots: loadingSlots } = ButtonCls.create({
			variant: {
				loading: true,
			},
		});
		expect(loadingSlots.root()).toBe("btn-base px-4 py-2 animate-pulse");

		const { slots: bothSlots } = ButtonCls.create({
			variant: {
				disabled: true,
				loading: true,
			},
		});
		expect(bothSlots.root()).toBe(
			"btn-base px-4 py-2 opacity-50 cursor-not-allowed animate-pulse",
		);

		// Verify contract structure - duplicate .bool() calls are deduplicated
		// Only one "bool" entry should exist per variant name
		expect(ButtonCls.contract.variant).toEqual({
			disabled: [
				"bool",
			],
			loading: [
				"bool",
			],
		});

		// Verify that the variant object has the expected keys
		const variantKeys = Object.keys(ButtonCls.contract.variant);
		expect(variantKeys).toEqual([
			"disabled",
			"loading",
		]);
		expect(variantKeys.length).toBe(2);

		// Verify each variant has exactly one "bool" entry (deduplicated)
		expect(ButtonCls.contract.variant.disabled).toEqual([
			"bool",
		]);
		expect(ButtonCls.contract.variant.loading).toEqual([
			"bool",
		]);
		expect(ButtonCls.contract.variant.disabled.length).toBe(1);
		expect(ButtonCls.contract.variant.loading.length).toBe(1);

		// Functionality works correctly with deduplicated contract structure
	});
});
