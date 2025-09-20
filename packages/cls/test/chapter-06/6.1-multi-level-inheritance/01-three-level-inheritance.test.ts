import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";

describe("6.1 Multi-level Inheritance - Three Level Inheritance", () => {
	it("should handle three-level inheritance with proper token and variant inheritance", () => {
		// Base component with basic tokens and variants
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"size.padding.small",
					"size.padding.medium",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
					size: [
						"small",
						"medium",
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
					"size.padding.small": {
						class: [
							"p-2",
						],
					},
					"size.padding.medium": {
						class: [
							"p-4",
						],
					},
				},
				rules: [
					{
						match: {
							color: "primary",
							size: "small",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"size.padding.small",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "medium",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"size.padding.medium",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
							size: "small",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"size.padding.small",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
							size: "medium",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"size.padding.medium",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "small",
				},
			},
		);

		// Extended component that adds new variants
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"size.padding.small",
					"size.padding.medium",
					"size.padding.large",
					"state.interactive.enabled",
					"state.interactive.disabled",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"accent",
					],
					size: [
						"small",
						"medium",
						"large",
					],
					state: [
						"enabled",
						"disabled",
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
					"color.bg.accent": {
						class: [
							"bg-purple-500",
						],
					},
					"size.padding.small": {
						class: [
							"p-2",
						],
					},
					"size.padding.medium": {
						class: [
							"p-4",
						],
					},
					"size.padding.large": {
						class: [
							"p-6",
						],
					},
					"state.interactive.enabled": {
						class: [
							"cursor-pointer",
						],
					},
					"state.interactive.disabled": {
						class: [
							"cursor-not-allowed",
							"opacity-50",
						],
					},
				},
				rules: [
					{
						match: {
							color: "accent",
							size: "large",
							state: "enabled",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"size.padding.large",
									"state.interactive.enabled",
								],
							},
						},
					},
					{
						match: {
							color: "accent",
							size: "large",
							state: "disabled",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"size.padding.large",
									"state.interactive.disabled",
								],
							},
						},
					},
				],
				defaults: {
					color: "accent",
					size: "large",
					state: "enabled",
				},
			},
		);

		// Final extended component with additional features
		const FinalComponent = ExtendedComponent.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.bg.success",
					"size.padding.small",
					"size.padding.medium",
					"size.padding.large",
					"size.padding.xl",
					"state.interactive.enabled",
					"state.interactive.disabled",
					"state.interactive.loading",
					"theme.mode.light",
					"theme.mode.dark",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"accent",
						"success",
					],
					size: [
						"small",
						"medium",
						"large",
						"xl",
					],
					state: [
						"enabled",
						"disabled",
						"loading",
					],
					theme: [
						"light",
						"dark",
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
					"color.bg.accent": {
						class: [
							"bg-purple-500",
						],
					},
					"color.bg.success": {
						class: [
							"bg-green-500",
						],
					},
					"size.padding.small": {
						class: [
							"p-2",
						],
					},
					"size.padding.medium": {
						class: [
							"p-4",
						],
					},
					"size.padding.large": {
						class: [
							"p-6",
						],
					},
					"size.padding.xl": {
						class: [
							"p-8",
						],
					},
					"state.interactive.enabled": {
						class: [
							"cursor-pointer",
						],
					},
					"state.interactive.disabled": {
						class: [
							"cursor-not-allowed",
							"opacity-50",
						],
					},
					"state.interactive.loading": {
						class: [
							"cursor-wait",
							"animate-pulse",
						],
					},
					"theme.mode.light": {
						class: [
							"text-gray-900",
						],
					},
					"theme.mode.dark": {
						class: [
							"text-white",
						],
					},
				},
				rules: [
					{
						match: {
							color: "success",
							size: "xl",
							state: "loading",
							theme: "dark",
						},
						slot: {
							root: {
								token: [
									"color.bg.success",
									"size.padding.xl",
									"state.interactive.loading",
									"theme.mode.dark",
								],
							},
						},
					},
					{
						match: {
							color: "success",
							size: "xl",
							state: "loading",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.success",
									"size.padding.xl",
									"state.interactive.loading",
									"theme.mode.light",
								],
							},
						},
					},
				],
				defaults: {
					color: "success",
					size: "xl",
					state: "loading",
					theme: "dark",
				},
			},
		);

		const _foo: Cls.VariantOf<typeof FinalComponent, "state"> = "enabled";

		// Test BaseComponent default behavior
		const { slots: baseDefault } = BaseComponent.create();
		expect(baseDefault.root()).toBe("bg-blue-500 p-2");

		// Test BaseComponent with explicit variants
		const { slots: baseExplicit } = BaseComponent.create({
			variant: {
				color: "secondary",
				size: "medium",
			},
		});
		expect(baseExplicit.root()).toBe("bg-gray-500 p-4");

		// Test ExtendedComponent default behavior (should use ExtendedComponent defaults)
		const { slots: extendedDefault } = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe("bg-purple-500 p-6 cursor-pointer");

		// Test ExtendedComponent with inherited variants
		const { slots: extendedInherited } = ExtendedComponent.create({
			variant: {
				color: "primary",
				size: "small",
			},
		});
		expect(extendedInherited.root()).toBe("bg-blue-500 p-2");

		// Test ExtendedComponent with new variants
		const { slots: extendedNew } = ExtendedComponent.create({
			variant: {
				color: "accent",
				size: "large",
				state: "disabled",
			},
		});
		expect(extendedNew.root()).toBe(
			"bg-purple-500 p-6 cursor-not-allowed opacity-50",
		);

		// Test FinalComponent default behavior
		const { slots: finalDefault } = FinalComponent.create();
		expect(finalDefault.root()).toBe(
			"bg-green-500 p-8 cursor-wait animate-pulse text-white",
		);

		// Test FinalComponent with inherited variants from BaseComponent
		const { slots: finalInherited } = FinalComponent.create({
			variant: {
				color: "secondary",
				size: "medium",
			},
		});
		expect(finalInherited.root()).toBe("bg-gray-500 p-4");

		// Test FinalComponent with new variants
		const { slots: finalNew } = FinalComponent.create({
			variant: {
				color: "success",
				size: "xl",
				state: "loading",
				theme: "light",
			},
		});
		expect(finalNew.root()).toBe(
			"bg-green-500 p-8 cursor-wait animate-pulse text-gray-900",
		);
	});
});
