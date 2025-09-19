import { describe, expect, it } from "vitest";
import { type Cls, cls, contract } from "../../../src";

describe("14.2 CLS Integration - Type Safety Integration", () => {
	it("should provide full type safety with builder-generated contracts", () => {
		// Build contract with specific types
		const result = contract()
			.tokens([
				"bg.primary",
				"text.primary",
			])
			.slots([
				"root",
				"content",
			])
			.variant("size", [
				"small",
				"medium",
			])
			.variant("size", [
				"large",
			]) // Merge with existing size
			.variant("disabled", [
				"bool",
			])
			.build();

		// Create CLS instance
		const Component = cls(result, ({ what, def }) => ({
			token: def.token({
				"bg.primary": what.css([
					"bg-blue-600",
				]),
				"text.primary": what.css([
					"text-white",
				]),
			}),
			rules: [
				def.root({
					root: what.token([
						"bg.primary",
						"text.primary",
					]),
					content: what.css([
						"p-4",
					]),
				}),
				def.rule(
					what.variant({
						disabled: true,
					}),
					{
						root: what.css([
							"opacity-50",
						]),
					},
				),
			],
			defaults: def.defaults({
				size: "medium",
				disabled: false,
			}),
		}));

		// Type safety verification - these should all compile without errors
		const _sizeType: Cls.VariantOf<typeof Component, "size"> = "large"; // From merged values
		const _disabledType: Cls.VariantOf<typeof Component, "disabled"> = true;
		const _slotsType: Cls.SlotsOf<typeof Component> = Component.create();

		// Test functionality with type safety
		const instance = Component.create();
		expect(instance.root()).toBe("bg-blue-600 text-white");
		expect(instance.content()).toBe("p-4");

		// Test merged variant values
		const largeInstance = Component.create(({ what }) => ({
			variant: what.variant({
				size: "large", // This value came from merging
			}),
		}));
		expect(largeInstance.root()).toBe("bg-blue-600 text-white");

		// Test boolean variant
		const disabledInstance = Component.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"bg-blue-600 text-white opacity-50",
		);

		// Verify contract structure
		expect(Component.contract).toBe(result);
		expect(Component.contract.variant.size).toEqual([
			"small",
			"medium",
			"large",
		]); // Merged values
	});
});
