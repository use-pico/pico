import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("Rule Override Semantics", () => {
	it("should properly override and extend rules in inheritance", () => {
		// Base component with basic rules - no default tokens to inherit
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.danger",
					"color.text.primary",
					"color.text.secondary",
					"color.text.danger",
					"size.sm",
					"size.md",
					"size.lg",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
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
					"color.bg.primary": {
						class: [
							"bg-blue-500",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-500",
						],
					},
					"color.bg.danger": {
						class: [
							"bg-red-500",
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
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"size.sm": {
						class: [
							"px-2",
							"py-1",
							"text-sm",
						],
					},
					"size.md": {
						class: [
							"px-4",
							"py-2",
							"text-base",
						],
					},
					"size.lg": {
						class: [
							"px-6",
							"py-3",
							"text-lg",
						],
					},
				},
				rules: [
					{
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
							size: "lg",
						},
						slot: {
							root: {
								token: [
									"size.lg",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"shadow-lg",
								],
							},
						},
					},
				],
				defaults: {
					color: "secondary",
					size: "md",
				},
			},
		);

		// Extended component that overrides some rules
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.danger",
					"color.bg.success",
					"color.text.primary",
					"color.text.secondary",
					"color.text.danger",
					"color.text.success",
					"size.sm",
					"size.md",
					"size.lg",
					"size.xl",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"danger",
						"success",
					],
					size: [
						"sm",
						"md",
						"lg",
						"xl",
					],
				},
			},
			{
				token: {
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
					"color.bg.danger": {
						class: [
							"bg-red-600",
						],
					},
					"color.bg.success": {
						class: [
							"bg-green-500",
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
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"color.text.success": {
						class: [
							"text-white",
						],
					},
					"size.sm": {
						class: [
							"px-2",
							"py-1",
							"text-sm",
						],
					},
					"size.md": {
						class: [
							"px-4",
							"py-2",
							"text-base",
						],
					},
					"size.lg": {
						class: [
							"px-8",
							"py-4",
							"text-xl",
						],
					},
					"size.xl": {
						class: [
							"px-10",
							"py-5",
							"text-2xl",
						],
					},
				},
				rules: [
					{
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
							size: "lg",
						},
						slot: {
							root: {
								token: [
									"size.lg",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"shadow-xl",
									"rounded-lg",
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
							size: "xl",
						},
						slot: {
							root: {
								token: [
									"size.xl",
								],
							},
						},
					},
					{
						match: {
							color: "success",
							size: "xl",
						},
						slot: {
							root: {
								class: [
									"shadow-2xl",
									"rounded-xl",
								],
							},
						},
					},
				],
				defaults: {
					color: "secondary",
					size: "md",
				},
			},
		);

		// Test base component behavior
		const { slots: basePrimary } = BaseComponent.create({
			variant: {
				color: "primary",
			},
		});
		expect(basePrimary.root()).toBe("bg-blue-500 text-white");

		const { slots: baseLarge } = BaseComponent.create({
			variant: {
				size: "lg",
			},
		});
		expect(baseLarge.root()).toBe(
			"bg-gray-500 text-white px-6 py-3 text-lg",
		);

		const { slots: basePrimaryLarge } = BaseComponent.create({
			variant: {
				color: "primary",
				size: "lg",
			},
		});
		expect(basePrimaryLarge.root()).toBe(
			"bg-blue-500 text-white px-6 py-3 text-lg shadow-lg",
		);

		// Test extended component behavior - rules should be overridden
		const { slots: extendedPrimary } = ExtendedComponent.create({
			variant: {
				color: "primary",
			},
		});
		expect(extendedPrimary.root()).toBe("bg-blue-600 text-white");

		const { slots: extendedLarge } = ExtendedComponent.create({
			variant: {
				size: "lg",
			},
		});
		expect(extendedLarge.root()).toBe(
			"bg-gray-600 text-white px-8 py-4 text-xl",
		);

		const { slots: extendedPrimaryLarge } = ExtendedComponent.create({
			variant: {
				color: "primary",
				size: "lg",
			},
		});
		expect(extendedPrimaryLarge.root()).toBe(
			"bg-blue-600 text-white px-8 py-4 text-xl shadow-xl rounded-lg",
		);

		// Test new variants that don't exist in base
		const { slots: extendedSuccess } = ExtendedComponent.create({
			variant: {
				color: "success",
			},
		});
		expect(extendedSuccess.root()).toBe("bg-green-500 text-white");

		const { slots: extendedXl } = ExtendedComponent.create({
			variant: {
				size: "xl",
			},
		});
		expect(extendedXl.root()).toBe(
			"bg-gray-600 text-white px-10 py-5 text-2xl",
		);

		const { slots: extendedSuccessXl } = ExtendedComponent.create({
			variant: {
				color: "success",
				size: "xl",
			},
		});
		expect(extendedSuccessXl.root()).toBe(
			"bg-green-500 text-white px-10 py-5 text-2xl shadow-2xl rounded-xl",
		);

		// Test that non-overridden variants still work as expected
		const { slots: extendedSecondary } = ExtendedComponent.create({
			variant: {
				color: "secondary",
			},
		});
		expect(extendedSecondary.root()).toBe("bg-gray-600 text-white");

		const { slots: extendedDanger } = ExtendedComponent.create({
			variant: {
				color: "danger",
			},
		});
		expect(extendedDanger.root()).toBe("bg-red-600 text-white");

		const { slots: extendedSm } = ExtendedComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(extendedSm.root()).toBe("bg-gray-600 text-white");
	});
});
