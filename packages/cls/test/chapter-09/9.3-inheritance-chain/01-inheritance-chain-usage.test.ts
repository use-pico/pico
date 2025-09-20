import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";

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

		// Level 2: Extended button with size variants
		const SizedButton = BaseButton.extend(
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
									"size.padding.md",
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
					color: "default",
					size: "md",
				},
			},
		);

		// Level 3: Extended button with state variants
		const StatefulButton = SizedButton.extend(
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
			{
				token: {
					"color.bg.danger": {
						class: [
							"bg-red-500",
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
					"state.disabled.enabled": {
						class: [],
					},
					"state.disabled.disabled": {
						class: [
							"opacity-50",
							"cursor-not-allowed",
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
									"size.padding.md",
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
					{
						match: {
							state: "disabled",
						},
						slot: {
							root: {
								token: [
									"state.disabled.disabled",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					state: "enabled",
				},
			},
		);

		// Test use method with different levels of inheritance

		// Level 1 can use Level 2
		const ButtonGroup1 = BaseButton.use(SizedButton);
		expect(typeof ButtonGroup1.create).toBe("function");

		// Test that Level 1 can access Level 2 functionality at runtime
		const sizedInstance = ButtonGroup1 as any;
		const { slots: smallButton } = sizedInstance.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallButton.root()).toBe("bg-gray-100 text-gray-900 px-2 py-1");

		// Level 1 can use Level 3
		const ButtonGroup2 = BaseButton.use(StatefulButton);
		expect(typeof ButtonGroup2.create).toBe("function");

		// Test that Level 1 can access Level 3 functionality at runtime
		const statefulInstance = ButtonGroup2 as any;
		const { slots: dangerButton } = statefulInstance.create({
			variant: {
				color: "danger",
			},
		});
		expect(dangerButton.root()).toBe("px-4 py-2 bg-red-500 text-white");

		const { slots: disabledButton } = statefulInstance.create({
			variant: {
				state: "disabled",
			},
		});
		expect(disabledButton.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 opacity-50 cursor-not-allowed",
		);

		// Level 2 can use Level 3
		const ButtonGroup3 = SizedButton.use(StatefulButton);
		expect(typeof ButtonGroup3.create).toBe("function");

		// Test that Level 2 can access Level 3 functionality at runtime
		const level3Instance = ButtonGroup3 as any;
		const { slots: largeDangerButton } = level3Instance.create({
			variant: {
				color: "danger",
				size: "lg",
			},
		});
		expect(largeDangerButton.root()).toBe(
			"bg-red-500 text-white px-6 py-3",
		);

		const _variants: Cls.VariantsOf<typeof StatefulButton> = {
			size: "md",
			state: "enabled",
			color: "primary",
		};

		// Test that the inheritance chain preserves all levels
		// ButtonGroup3 should have access to all variants from all levels
		expect(ButtonGroup3.contract.variant?.color).toContain("default");
		expect(ButtonGroup3.contract.variant?.color).toContain("primary");
		expect(ButtonGroup3.contract.variant?.color).toContain("success");
		expect(ButtonGroup3.contract.variant?.size).toContain("sm");
		expect(ButtonGroup3.contract.variant?.size).toContain("md");
		expect(ButtonGroup3.contract.variant?.size).toContain("lg");

		// Test that we can create instances with complex combinations
		const { slots: complexButton } = level3Instance.create({
			variant: {
				color: "success",
				size: "sm",
				state: "disabled",
			},
		});
		expect(complexButton.root()).toBe(
			"bg-green-500 text-white px-2 py-1 opacity-50 cursor-not-allowed",
		);
	});
});
