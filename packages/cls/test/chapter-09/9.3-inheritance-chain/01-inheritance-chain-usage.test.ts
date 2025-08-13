import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("9.3 Inheritance Chain", () => {
	it("should handle use method with multi-level inheritance chains", () => {
		// Level 1: Base component
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
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.primary": [
						"text-white",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
							"color.text.default",
						]),
					}),
					def.rule?.(
						{
							color: "primary",
						},
						{
							root: what.token?.([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "default",
				}),
			}),
		);

		// Level 2: Extended button with size variants
		const SizedButton = BaseButton.extend?.(
			{
				tokens: [
					"color.bg.success",
					"color.text.success",
					"size.padding.sm",
					"size.padding.md",
					"size.padding.lg",
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
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.success": [
						"bg-green-500",
					],
					"color.text.success": [
						"text-white",
					],
					"size.padding.sm": [
						"px-2",
						"py-1",
					],
					"size.padding.md": [
						"px-4",
						"py-2",
					],
					"size.padding.lg": [
						"px-6",
						"py-3",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
							"color.text.default",
							"size.padding.md",
						]),
					}),
					def.rule?.(
						{
							color: "primary",
						},
						{
							root: what.token?.([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule?.(
						{
							color: "success",
						},
						{
							root: what.token?.([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					def.rule?.(
						{
							size: "sm",
						},
						{
							root: what.token?.([
								"size.padding.sm",
							]),
						},
					),
					def.rule?.(
						{
							size: "lg",
						},
						{
							root: what.token?.([
								"size.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "default",
					size: "md",
				}),
			}),
		);

		// Level 3: Extended button with state variants
		const StatefulButton = SizedButton.extend?.(
			{
				tokens: [
					"color.bg.danger",
					"color.text.danger",
					"size.padding.sm",
					"size.padding.md",
					"size.padding.lg",
					"state.disabled.enabled",
					"state.disabled.disabled",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
						"success",
						"danger",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
					state: [
						"enabled",
						"disabled",
					],
				},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.danger": [
						"bg-red-500",
					],
					"color.text.danger": [
						"text-white",
					],
					"size.padding.sm": [
						"px-2",
						"py-1",
					],
					"size.padding.md": [
						"px-4",
						"py-2",
					],
					"size.padding.lg": [
						"px-6",
						"py-3",
					],
					"state.disabled.enabled": [],
					"state.disabled.disabled": [
						"opacity-50",
						"cursor-not-allowed",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
							"color.text.default",
							"size.padding.md",
						]),
					}),
					def.rule?.(
						{
							color: "primary",
						},
						{
							root: what.token?.([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule?.(
						{
							color: "success",
						},
						{
							root: what.token?.([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					def.rule?.(
						{
							color: "danger",
						},
						{
							root: what.token?.([
								"color.bg.danger",
								"color.text.danger",
							]),
						},
					),
					def.rule?.(
						{
							size: "sm",
						},
						{
							root: what.token?.([
								"size.padding.sm",
							]),
						},
					),
					def.rule?.(
						{
							size: "lg",
						},
						{
							root: what.token?.([
								"size.padding.lg",
							]),
						},
					),
					def.rule?.(
						{
							state: "disabled",
						},
						{
							root: what.token?.([
								"state.disabled.disabled",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "default",
					size: "md",
					state: "enabled",
				}),
			}),
		);

		// Test use method with different levels of inheritance

		// Level 1 can use Level 2
		const ButtonGroup1 = BaseButton.use?.(SizedButton);
		expect(typeof ButtonGroup1.create).toBe("function");

		// Test that Level 1 can access Level 2 functionality at runtime
		const sizedInstance = ButtonGroup1 as any;
		const smallButton = sizedInstance.create?.(() => ({
			variant: {
				size: "sm",
			},
		}));
		expect(smallButton.root?.()).toBe(
			"bg-gray-100 text-gray-900 px-2 py-1",
		);

		// Level 1 can use Level 3
		const ButtonGroup2 = BaseButton.use?.(StatefulButton);
		expect(typeof ButtonGroup2.create).toBe("function");

		// Test that Level 1 can access Level 3 functionality at runtime
		const statefulInstance = ButtonGroup2 as any;
		const dangerButton = statefulInstance.create?.(() => ({
			variant: {
				color: "danger",
			},
		}));
		expect(dangerButton.root?.()).toBe("px-4 py-2 bg-red-500 text-white");

		const disabledButton = statefulInstance.create?.(() => ({
			variant: {
				state: "disabled",
			},
		}));
		expect(disabledButton.root?.()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 opacity-50 cursor-not-allowed",
		);

		// Level 2 can use Level 3
		const ButtonGroup3 = SizedButton.use?.(StatefulButton);
		expect(typeof ButtonGroup3.create).toBe("function");

		// Test that Level 2 can access Level 3 functionality at runtime
		const level3Instance = ButtonGroup3 as any;
		const largeDangerButton = level3Instance.create?.(() => ({
			variant: {
				color: "danger",
				size: "lg",
			},
		}));
		expect(largeDangerButton.root?.()).toBe(
			"bg-red-500 text-white px-6 py-3",
		);

		// Test that the inheritance chain preserves all levels
		// ButtonGroup3 should have access to all variants from all levels
		expect(ButtonGroup3.contract.variant?.color).toContain("default");
		expect(ButtonGroup3.contract.variant?.color).toContain("primary");
		expect(ButtonGroup3.contract.variant?.color).toContain("success");
		expect(ButtonGroup3.contract.variant?.size).toContain("sm");
		expect(ButtonGroup3.contract.variant?.size).toContain("md");
		expect(ButtonGroup3.contract.variant?.size).toContain("lg");

		// Test that we can create instances with complex combinations
		const complexButton = level3Instance.create?.(() => ({
			variant: {
				color: "success",
				size: "sm",
				state: "disabled",
			},
		}));
		expect(complexButton.root?.()).toBe(
			"bg-green-500 text-white px-2 py-1 opacity-50 cursor-not-allowed",
		);
	});
});
