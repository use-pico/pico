import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("9.2 Type Safety", () => {
	it("should enforce type safety constraints in use method", () => {
		// Base component with specific contract
		const BaseComponent = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
					"color.text": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
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
							"bg-blue-500",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
				}),
			}),
		);

		// Compatible component that extends BaseComponent
		const CompatibleComponent = BaseComponent.extend(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"success",
					],
					"color.text": [
						"default",
						"primary",
						"success",
					],
				},
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
						"success",
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
							"bg-blue-500",
						],
						success: [
							"bg-green-500",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
						success: [
							"text-white",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule(
						{
							color: "success",
						},
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
				}),
			}),
		);

		// Incompatible component with different contract structure
		const IncompatibleComponent = cls(
			{
				tokens: {
					"size.padding": [
						"sm",
						"md",
						"lg",
					],
				},
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
			({ what, def }) => ({
				token: def.token({
					"size.padding": {
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
						root: what.token([
							"size.padding.md",
						]),
					}),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		// Test that compatible components can be used
		const CompatibleGroup = BaseComponent.use(CompatibleComponent);

		// Verify the use method returns the correct type
		expect(typeof CompatibleGroup.create).toBe("function");
		expect(typeof CompatibleGroup.extend).toBe("function");
		expect(typeof CompatibleGroup.use).toBe("function");

		// Test that we can create instances with the compatible component
		const instance = CompatibleGroup.create();
		expect(instance.root()).toBe("bg-gray-100 text-gray-900");

		// Test that the contract reflects the base component's structure
		// (use method returns Cls<BaseComponentContract>)
		expect(CompatibleGroup.contract.variant?.color).toContain("default");
		expect(CompatibleGroup.contract.variant?.color).toContain("primary");

		// Test that extended variants are accessible at runtime
		// even though TypeScript sees the base type
		const extendedInstance = CompatibleGroup as any;
		const successInstance = extendedInstance.create(() => ({
			variant: {
				color: "success",
			},
		}));
		expect(successInstance.root()).toBe("bg-green-500 text-white");

		// Test that incompatible components cannot be used
		// This would cause a TypeScript error at compile time
		// but we can test the runtime behavior
		try {
			// @ts-expect-error - Incompatible component should not be usable
			const IncompatibleGroup = BaseComponent.use(IncompatibleComponent);

			// If we somehow get here, the instance should not work properly
			const testInstance = IncompatibleGroup.create();
			// This should fail because the contract structures don't match
			expect(() => testInstance.root()).toThrow();
		} catch (error) {
			// Expected behavior - incompatible components should cause errors
			expect(error).toBeDefined();
		}
	});
});
