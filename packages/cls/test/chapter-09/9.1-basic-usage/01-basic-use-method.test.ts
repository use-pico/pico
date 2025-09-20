import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("9.1 Basic Usage", () => {
	it("should handle basic use method functionality with inherited instances", () => {
		// Base button component
		const BaseButton = cls(
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

		// Extended button component that inherits from BaseButton
		const ExtendedButton = BaseButton.extend(
			{
				tokens: [
					"color.bg.success",
					"color.bg.danger",
					"color.text.success",
					"color.text.danger",
					"size.padding.sm",
					"size.padding.md",
					"size.padding.lg",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"default", // Include base variants
						"primary", // Include base variants
						"success",
						"danger",
					],
					size: [
						"sm",
						"md",
						"lg",
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
					"color.bg.danger": {
						class: [
							"bg-red-500",
						],
					},
					"color.text.success": {
						class: [
							"text-white",
						],
					},
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
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
									"color.bg.default",
									"color.text.default",
									"size.padding.md", // Add default size
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
					{
						match: {
							color: "danger",
						},
						slot: {
							root: {
								token: [
									"color.bg.danger",
									"color.text.danger",
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
									"size.padding.sm",
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
									"size.padding.lg",
								],
							},
						},
					},
				],
				defaults: {
					color: "default", // Inherits from BaseButton
					size: "md",
				},
			},
		);

		// Test use method with compatible instances
		// BaseButton can use ExtendedButton (ExtendedButton is derived from BaseButton)
		const ButtonGroup = BaseButton.use(ExtendedButton);

		// Test that ButtonGroup preserves the ExtendedButton functionality
		expect(typeof ButtonGroup.create).toBe("function");
		expect(typeof ButtonGroup.extend).toBe("function");
		expect(typeof ButtonGroup.use).toBe("function");
		expect(typeof ButtonGroup.contract).toBe("object");
		expect(typeof ButtonGroup.definition).toBe("object");

		// Test that we can create instances with the base variants
		const { slots: defaultButton } = ButtonGroup.create();
		expect(defaultButton.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2",
		);

		const { slots: primaryButton } = ButtonGroup.create({
			variant: {
				color: "primary",
			},
		});

		expect(primaryButton.root()).toBe("px-4 py-2 bg-blue-500 text-white");

		// Test that the use method successfully assigned ExtendedButton to ButtonGroup
		// by verifying that the contract has the extended capabilities
		// Note: ButtonGroup is typed as Cls<BaseButtonContract> but runtime instance is ExtendedButton
		expect(ButtonGroup.contract.variant?.color).toContain("success");
		expect(ButtonGroup.contract.variant?.color).toContain("danger");
		// Note: TypeScript sees the base contract, but runtime has extended variants
		expect((ButtonGroup as any).contract.variant?.size).toContain("sm");
		expect((ButtonGroup as any).contract.variant?.size).toContain("lg");

		// Test that we can access the extended functionality through the runtime instance
		// even though TypeScript sees it as the base type
		const extendedInstance = ButtonGroup as any;
		const { slots: successButton } = extendedInstance.create({
			variant: {
				color: "success",
			},
		});
		expect(successButton.root()).toBe("px-4 py-2 bg-green-500 text-white");

		const { slots: largeButton } = extendedInstance.create({
			variant: {
				size: "lg",
			},
		});
		expect(largeButton.root()).toBe("bg-gray-100 text-gray-900 px-6 py-3");
	});
});
