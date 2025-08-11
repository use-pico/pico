import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.4 Slot Caching Behavior - Slot Caching Semantics", () => {
	it("should cache slot calls without parameters and compute new results for calls with parameters", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"secondary",
					],
					"color.text": [
						"default",
						"primary",
						"secondary",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
				},
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
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
						secondary: [
							"bg-gray-600",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
						secondary: [
							"text-white",
						],
					},
					"spacing.padding": {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"inline-flex",
								"items-center",
								"rounded-md",
								"font-medium",
							],
							[
								"color.bg.default",
								"color.text.default",
								"spacing.padding.md",
							],
						),
						label: what.css([
							"font-medium",
						]),
						icon: what.css([
							"ml-2",
							"w-4",
							"h-4",
						]),
					}),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.token([
								"spacing.padding.lg",
							]),
						},
					),
					def.rule(
						what.variant({
							variant: "primary",
						}),
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule(
						what.variant({
							variant: "secondary",
						}),
						{
							root: what.token([
								"color.bg.secondary",
								"color.text.secondary",
							]),
						},
					),
					def.rule(
						what.variant({
							disabled: true,
						}),
						{
							root: what.css([
								"opacity-50",
								"cursor-not-allowed",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
					variant: "default",
					disabled: false,
				}),
			}),
		);

		// Step 1: .create() creates a cached result
		const button = Button.create();

		// Step 2: First call to root() returns computed value and gets cached
		const firstCallResult = button.root();
		expect(firstCallResult).toContain("inline-flex");
		expect(firstCallResult).toContain("items-center");
		expect(firstCallResult).toContain("rounded-md");
		expect(firstCallResult).toContain("font-medium");
		expect(firstCallResult).toContain("bg-gray-100");
		expect(firstCallResult).toContain("text-gray-900");
		expect(firstCallResult).toContain("px-4");
		expect(firstCallResult).toContain("py-2");

		// Step 3: Second call to root() returns cached result (same reference)
		const secondCallResult = button.root();
		expect(secondCallResult).toBe(firstCallResult);
		expect(secondCallResult).toContain("inline-flex");
		expect(secondCallResult).toContain("items-center");
		expect(secondCallResult).toContain("rounded-md");
		expect(secondCallResult).toContain("font-medium");
		expect(secondCallResult).toContain("bg-gray-100");
		expect(secondCallResult).toContain("text-gray-900");
		expect(secondCallResult).toContain("px-4");
		expect(secondCallResult).toContain("py-2");

		// Step 4: Call to root(() => ({ ...variant... })) computes a new result
		const dynamicCallResult = button.root(({ what }) => ({
			variant: what.variant({
				variant: "primary",
				size: "lg",
			}),
		}));
		expect(dynamicCallResult).toContain("inline-flex");
		expect(dynamicCallResult).toContain("items-center");
		expect(dynamicCallResult).toContain("rounded-md");
		expect(dynamicCallResult).toContain("font-medium");
		expect(dynamicCallResult).toContain("bg-blue-600");
		expect(dynamicCallResult).toContain("text-white");
		expect(dynamicCallResult).toContain("px-6");
		expect(dynamicCallResult).toContain("py-3");

		// Verify that the dynamic call result is different from the cached result
		expect(dynamicCallResult).not.toBe(firstCallResult);

		// Step 5: Another call with the same parameters should return cached result
		const secondDynamicCallResult = button.root(({ what }) => ({
			variant: what.variant({
				variant: "primary",
				size: "lg",
			}),
		}));
		expect(secondDynamicCallResult).toBe(dynamicCallResult);

		// Step 6: Call with different parameters should compute new result
		const differentDynamicCallResult = button.root(({ what }) => ({
			variant: what.variant({
				variant: "secondary",
				size: "sm",
			}),
		}));
		expect(differentDynamicCallResult).toContain("inline-flex");
		expect(differentDynamicCallResult).toContain("items-center");
		expect(differentDynamicCallResult).toContain("rounded-md");
		expect(differentDynamicCallResult).toContain("font-medium");
		expect(differentDynamicCallResult).toContain("bg-gray-600");
		expect(differentDynamicCallResult).toContain("text-white");
		expect(differentDynamicCallResult).toContain("px-2");
		expect(differentDynamicCallResult).toContain("py-1");

		// Verify this is different from both cached results
		expect(differentDynamicCallResult).not.toBe(firstCallResult);
		expect(differentDynamicCallResult).not.toBe(dynamicCallResult);

		// Step 7: Multiple calls with same parameters should all return cached results
		const cachedResults = [];
		for (let i = 0; i < 5; i++) {
			cachedResults.push(button.root());
		}

		// All cached calls should return the same result
		cachedResults.forEach((result) => {
			expect(result).toBe(firstCallResult);
		});

		// Step 8: Test that other slots also follow the same caching behavior
		const labelFirstCall = button.label();
		const labelSecondCall = button.label();
		expect(labelSecondCall).toBe(labelFirstCall);

		const labelDynamicCall = button.label(({ what }) => ({
			variant: what.variant({
				variant: "primary",
			}),
		}));
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
		const button2 = Button.create();
		// Slot functions are created per instance, so they should be different
		expect(button.root).not.toBe(button2.root);
		expect(button.label).not.toBe(button2.label);
		expect(button.icon).not.toBe(button2.icon);

		// But they should have the same computed results (same contract/definition)
		const button2Result = button2.root();
		expect(button2Result).toBe(firstCallResult); // Same default result
		expect(button2Result).toBe(button.root()); // Same computed value

		// Step 11: Test that variant-specific instances have separate slot functions but same base behavior
		const primaryButton = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "primary",
			}),
		}));

		// Slot functions are created per instance, so they should be different
		expect(button.root).not.toBe(primaryButton.root);
		expect(button.label).not.toBe(primaryButton.label);
		expect(button.icon).not.toBe(primaryButton.icon);

		// But they should have different default results
		const primaryButtonResult = primaryButton.root();
		expect(primaryButtonResult).toContain("inline-flex");
		expect(primaryButtonResult).toContain("items-center");
		expect(primaryButtonResult).toContain("rounded-md");
		expect(primaryButtonResult).toContain("font-medium");
		expect(primaryButtonResult).toContain("bg-blue-600");
		expect(primaryButtonResult).toContain("text-white");
		expect(primaryButtonResult).toContain("px-4");
		expect(primaryButtonResult).toContain("py-2");
		expect(primaryButtonResult).not.toBe(firstCallResult);

		// Step 12: Test that the same variant instance has separate slot functions but same results
		const primaryButton2 = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "primary",
			}),
		}));

		// Same variant should have separate slot functions (per instance)
		expect(primaryButton.root).not.toBe(primaryButton2.root);
		expect(primaryButton.label).not.toBe(primaryButton2.label);
		expect(primaryButton.icon).not.toBe(primaryButton2.icon);

		// And they should have the same results
		expect(primaryButton.root()).toBe(primaryButton2.root());
	});
});
