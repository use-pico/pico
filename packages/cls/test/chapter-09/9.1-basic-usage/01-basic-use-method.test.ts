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
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-gray-100",
					]),
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.text.default": what.css([
						"text-gray-900",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.success": what.css([
						"bg-green-500",
					]),
					"color.bg.danger": what.css([
						"bg-red-500",
					]),
					"color.text.success": what.css([
						"text-white",
					]),
					"color.text.danger": what.css([
						"text-white",
					]),
					"size.padding.sm": what.css([
						"px-2",
						"py-1",
					]),
					"size.padding.md": what.css([
						"px-4",
						"py-2",
					]),
					"size.padding.lg": what.css([
						"px-6",
						"py-3",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"size.padding.md", // Add default size
						]),
					}),
					def.rule(
						what.variant({
							color: "primary",
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
							color: "success",
						}),
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					def.rule(
						{
							color: "danger",
						},
						{
							root: what.token([
								"color.bg.danger",
								"color.text.danger",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.token([
								"size.padding.sm",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.token([
								"size.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default", // Inherits from BaseButton
					size: "md",
				}),
			}),
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
		const defaultButton = ButtonGroup.create();
		expect(defaultButton.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2",
		);

		const primaryButton = ButtonGroup.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
			}),
		}));

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
		const successButton = extendedInstance.create(() => ({
			variant: {
				color: "success",
			},
		}));
		expect(successButton.root()).toBe("px-4 py-2 bg-green-500 text-white");

		const largeButton = extendedInstance.create(() => ({
			variant: {
				size: "lg",
			},
		}));
		expect(largeButton.root()).toBe("bg-gray-100 text-gray-900 px-6 py-3");
	});
});
