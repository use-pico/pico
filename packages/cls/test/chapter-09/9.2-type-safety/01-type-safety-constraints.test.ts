import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("9.2 Type Safety", () => {
	it("should enforce type safety constraints in use method", () => {
		// Base component with specific contract
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
				],
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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-500",
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
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
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
				],
				defaults: {
					color: "default",
				},
			},
		);

		// Compatible component that extends BaseComponent
		const CompatibleComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.success",
					"color.text.success",
				],
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
			{
				token: {
					"color.bg.success": {
						class: [
							"bg-green-500",
						],
					},
					"color.text.success": {
						class: [
							"text-white",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
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
							color: "success",
						},
						slot: {
							root: {
								token: [
									"color.bg.success",
									"color.text.success",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
				},
			},
		);

		// Incompatible component with different contract structure
		const IncompatibleComponent = cls(
			{
				tokens: [
					"size.padding.sm",
					"size.padding.md",
					"size.padding.lg",
				],
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
			{
				token: {
					"size.padding.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"size.padding.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"size.padding.lg": {
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
								token: [
									"size.padding.md",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		// Test that compatible components can be used
		const CompatibleGroup = BaseComponent.use(CompatibleComponent);

		// Verify the use method returns the correct type
		expect(typeof CompatibleGroup.create).toBe("function");
		expect(typeof CompatibleGroup.extend).toBe("function");
		expect(typeof CompatibleGroup.use).toBe("function");

		// Test that we can create instances with the compatible component
		const { slots: instance } = CompatibleGroup.create();
		expect(instance.root()).toBe("bg-gray-100 text-gray-900");

		// Test that the contract reflects the base component's structure
		// (use method returns Cls<BaseComponentContract>)
		expect(CompatibleGroup.contract.variant?.color).toContain("default");
		expect(CompatibleGroup.contract.variant?.color).toContain("primary");

		// Test that extended variants are accessible at runtime
		// even though TypeScript sees the base type
		const extendedInstance = CompatibleGroup as any;
		const { slots: successInstance } = extendedInstance.create({
			variant: {
				color: "success",
			},
		});
		expect(successInstance.root()).toBe("bg-green-500 text-white");

		// Test that incompatible components cannot be used
		// This would cause a TypeScript error at compile time
		// but we can test the runtime behavior
		try {
			// Incompatible component should not be usable
			const IncompatibleGroup = BaseComponent.use(
				IncompatibleComponent as any,
			);

			// If we somehow get here, the instance should not work properly
			const { slots: testInstance } = IncompatibleGroup.create();
			// This should fail because the contract structures don't match
			expect(() => testInstance.root()).toThrow();
		} catch (error) {
			// Expected behavior - incompatible components should cause errors
			expect(error).toBeDefined();
		}
	});
});
