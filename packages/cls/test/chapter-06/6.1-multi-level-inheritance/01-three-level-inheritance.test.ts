import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.secondary": [
						"bg-gray-500",
					],
					"size.padding.small": [
						"p-2",
					],
					"size.padding.medium": [
						"p-4",
					],
				}),
				rules: [
					def.rule?.(
						{
							color: "primary",
							size: "small",
						},
						{
							root: what.token?.([
								"color.bg.primary",
								"size.padding.small",
							]),
						},
					),
					def.rule?.(
						{
							color: "primary",
							size: "medium",
						},
						{
							root: what.token?.([
								"color.bg.primary",
								"size.padding.medium",
							]),
						},
					),
					def.rule?.(
						{
							color: "secondary",
							size: "small",
						},
						{
							root: what.token?.([
								"color.bg.secondary",
								"size.padding.small",
							]),
						},
					),
					def.rule?.(
						{
							color: "secondary",
							size: "medium",
						},
						{
							root: what.token?.([
								"color.bg.secondary",
								"size.padding.medium",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "primary",
					size: "small",
				}),
			}),
		);

		// Extended component that adds new variants
		const ExtendedComponent = BaseComponent.extend?.(
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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.secondary": [
						"bg-gray-500",
					],
					"color.bg.accent": [
						"bg-purple-500",
					],
					"size.padding.small": [
						"p-2",
					],
					"size.padding.medium": [
						"p-4",
					],
					"size.padding.large": [
						"p-6",
					],
					"state.interactive.enabled": [
						"cursor-pointer",
					],
					"state.interactive.disabled": [
						"cursor-not-allowed",
						"opacity-50",
					],
				}),
				rules: [
					def.rule?.(
						{
							color: "accent",
							size: "large",
							state: "enabled",
						},
						{
							root: what.token?.([
								"color.bg.accent",
								"size.padding.large",
								"state.interactive.enabled",
							]),
						},
					),
					def.rule?.(
						{
							color: "accent",
							size: "large",
							state: "disabled",
						},
						{
							root: what.token?.([
								"color.bg.accent",
								"size.padding.large",
								"state.interactive.disabled",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "accent",
					size: "large",
					state: "enabled",
				}),
			}),
		);

		// Final extended component with additional features
		const FinalComponent = ExtendedComponent.extend?.(
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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.secondary": [
						"bg-gray-500",
					],
					"color.bg.accent": [
						"bg-purple-500",
					],
					"color.bg.success": [
						"bg-green-500",
					],
					"size.padding.small": [
						"p-2",
					],
					"size.padding.medium": [
						"p-4",
					],
					"size.padding.large": [
						"p-6",
					],
					"size.padding.xl": [
						"p-8",
					],
					"state.interactive.enabled": [
						"cursor-pointer",
					],
					"state.interactive.disabled": [
						"cursor-not-allowed",
						"opacity-50",
					],
					"state.interactive.loading": [
						"cursor-wait",
						"animate-pulse",
					],
					"theme.mode.light": [
						"text-gray-900",
					],
					"theme.mode.dark": [
						"text-white",
					],
				}),
				rules: [
					def.rule?.(
						{
							color: "success",
							size: "xl",
							state: "loading",
							theme: "dark",
						},
						{
							root: what.token?.([
								"color.bg.success",
								"size.padding.xl",
								"state.interactive.loading",
								"theme.mode.dark",
							]),
						},
					),
					def.rule?.(
						{
							color: "success",
							size: "xl",
							state: "loading",
							theme: "light",
						},
						{
							root: what.token?.([
								"color.bg.success",
								"size.padding.xl",
								"state.interactive.loading",
								"theme.mode.light",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					color: "success",
					size: "xl",
					state: "loading",
					theme: "dark",
				}),
			}),
		);

		// Test BaseComponent default behavior
		const baseDefault = BaseComponent.create?.();
		expect(baseDefault.root?.()).toBe("bg-blue-500 p-2");

		// Test BaseComponent with explicit variants
		const baseExplicit = BaseComponent.create?.(() => ({
			variant: {
				color: "secondary",
				size: "medium",
			},
		}));
		expect(baseExplicit.root?.()).toBe("bg-gray-500 p-4");

		// Test ExtendedComponent default behavior (should use ExtendedComponent defaults)
		const extendedDefault = ExtendedComponent.create?.();
		expect(extendedDefault.root?.()).toBe("bg-purple-500 p-6 cursor-pointer");

		// Test ExtendedComponent with inherited variants
		const extendedInherited = ExtendedComponent.create?.(() => ({
			variant: {
				color: "primary",
				size: "small",
			},
		}));
		expect(extendedInherited.root?.()).toBe("bg-blue-500 p-2");

		// Test ExtendedComponent with new variants
		const extendedNew = ExtendedComponent.create?.(() => ({
			variant: {
				color: "accent",
				size: "large",
				state: "disabled",
			},
		}));
		expect(extendedNew.root?.()).toBe(
			"bg-purple-500 p-6 cursor-not-allowed opacity-50",
		);

		// Test FinalComponent default behavior
		const finalDefault = FinalComponent.create?.();
		expect(finalDefault.root?.()).toBe(
			"bg-green-500 p-8 cursor-wait animate-pulse text-white",
		);

		// Test FinalComponent with inherited variants from BaseComponent
		const finalInherited = FinalComponent.create?.(() => ({
			variant: {
				color: "secondary",
				size: "medium",
			},
		}));
		expect(finalInherited.root?.()).toBe("bg-gray-500 p-4");

		// Test FinalComponent with new variants
		const finalNew = FinalComponent.create?.(() => ({
			variant: {
				color: "success",
				size: "xl",
				state: "loading",
				theme: "light",
			},
		}));
		expect(finalNew.root?.()).toBe(
			"bg-green-500 p-8 cursor-wait animate-pulse text-gray-900",
		);
	});
});
