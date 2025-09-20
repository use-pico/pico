import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.4 Slot Caching Behavior - Slot Caching Semantics", () => {
	it("should cache slot calls without parameters and compute new results for calls with parameters", () => {
		const Button = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.default",
					"color.text.primary",
					"color.text.secondary",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					variant: [
						"default",
						"primary",
						"secondary",
					],
					disabled: [
						"bool",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.text.default": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-white",
						],
					},
					"spacing.padding.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"spacing.padding.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"spacing.padding.lg": {
						class: [
							"px-6",
							"py-3",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
									"rounded-md",
									"font-medium",
								],
								token: [
									"color.bg.default",
									"color.text.default",
									"spacing.padding.md",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
							icon: {
								class: [
									"ml-2",
									"w-4",
									"h-4",
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
								token: [
									"spacing.padding.sm",
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
								token: [
									"spacing.padding.lg",
								],
							},
						},
					},
					{
						match: {
							variant: "primary",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
								],
							},
						},
					},
					{
						match: {
							variant: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
						},
					},
					{
						match: {
							disabled: true,
						},
						slot: {
							root: {
								class: [
									"opacity-50",
									"cursor-not-allowed",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
					variant: "default",
					disabled: false,
				},
			},
		);

		// Step 1: .create() creates a cached result
		const { slots: button } = Button.create();

		// Step 2: First call to root() returns computed value and gets cached
		const firstCallResult = button.root();
		expect(firstCallResult).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 inline-flex items-center rounded-md font-medium",
		);

		// Step 3: Second call to root() returns cached result (same reference)
		const secondCallResult = button.root();
		expect(secondCallResult).toBe(firstCallResult);
		expect(secondCallResult).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 inline-flex items-center rounded-md font-medium",
		);

		// Step 4: Call to root() with variant parameters computes a new result
		const dynamicCallResult = button.root({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(dynamicCallResult).toBe(
			"inline-flex items-center rounded-md font-medium px-6 py-3 bg-blue-600 text-white",
		);

		// Verify that the dynamic call result is different from the cached result
		expect(dynamicCallResult).not.toBe(firstCallResult);

		// Step 5: Another call with the same parameters should return cached result
		const secondDynamicCallResult = button.root({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(secondDynamicCallResult).toBe(dynamicCallResult);

		// Step 6: Call with different parameters should compute new result
		const differentDynamicCallResult = button.root({
			variant: {
				variant: "secondary",
				size: "sm",
			},
		});
		expect(differentDynamicCallResult).toBe(
			"inline-flex items-center rounded-md font-medium px-2 py-1 bg-gray-600 text-white",
		);

		// Verify this is different from both cached results
		expect(differentDynamicCallResult).not.toBe(firstCallResult);
		expect(differentDynamicCallResult).not.toBe(dynamicCallResult);

		// Step 7: Multiple calls with same parameters should all return cached results
		const cachedResults = [];
		for (let i = 0; i < 5; i++) {
			cachedResults.push?.(button.root());
		}

		// All cached calls should return the same result
		cachedResults.forEach?.((result) => {
			expect(result).toBe(firstCallResult);
		});

		// Step 8: Test that other slots also follow the same caching behavior
		const labelFirstCall = button.label();
		const labelSecondCall = button.label();
		expect(labelSecondCall).toBe(labelFirstCall);

		const labelDynamicCall = button.label({
			variant: {
				variant: "primary",
			},
		});
		expect(labelDynamicCall).toBe("font-medium");

		// Step 9: Test that the slot functions maintain their identity
		const rootSlotFunction = button.root;
		const labelSlotFunction = button.label;
		const iconSlotFunction = button.icon;

		// Slot functions should be stable references
		expect(button.root).toBe(rootSlotFunction);
		expect(button.label).toBe(labelSlotFunction);
		expect(button.icon).toBe(iconSlotFunction);

		// Step 10: Test that different instances have separate slot functions but same results
		const { slots: button2 } = Button.create();
		// Slot functions are created per instance, so they should be different
		expect(button.root).not.toBe(button2.root);
		expect(button.label).not.toBe(button2.label);
		expect(button.icon).not.toBe(button2.icon);

		// But they should have the same computed results (same contract/definition)
		const button2Result = button2.root();
		expect(button2Result).toBe(firstCallResult); // Same default result
		expect(button2Result).toBe(button.root()); // Same computed value

		// Step 11: Test that variant-specific instances have separate slot functions but same base behavior
		const { slots: primaryButton } = Button.create({
			variant: {
				variant: "primary",
			},
		});

		// Slot functions are created per instance, so they should be different
		expect(button.root).not.toBe(primaryButton.root);
		expect(button.label).not.toBe(primaryButton.label);
		expect(button.icon).not.toBe(primaryButton.icon);

		// But they should have different default results
		const primaryButtonResult = primaryButton.root();
		expect(primaryButtonResult).toBe(
			"px-4 py-2 inline-flex items-center rounded-md font-medium bg-blue-600 text-white",
		);
		expect(primaryButtonResult).not.toBe(firstCallResult);

		// Step 12: Test that the same variant instance has separate slot functions but same results
		const { slots: primaryButton2 } = Button.create({
			variant: {
				variant: "primary",
			},
		});

		// Same variant should have separate slot functions (per instance)
		expect(primaryButton.root).not.toBe(primaryButton2.root);
		expect(primaryButton.label).not.toBe(primaryButton2.label);
		expect(primaryButton.icon).not.toBe(primaryButton2.icon);

		// And they should have the same results
		expect(primaryButton.root()).toBe(primaryButton2.root());
	});
});
