import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("8.2 Token Overrides", () => {
	it("should allow overriding specific tokens while preserving others", () => {
		// Base component with comprehensive token system
		const TokenComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.success",
					"color.bg.warning",
					"color.bg.danger",
					"color.text.default",
					"color.text.primary",
					"color.text.success",
					"color.text.warning",
					"color.text.danger",
					"color.border.default",
					"color.border.primary",
					"color.border.success",
					"color.border.warning",
					"color.border.danger",
					"size.spacing.sm",
					"size.spacing.md",
					"size.spacing.lg",
					"size.typography.sm",
					"size.typography.md",
					"size.typography.lg",
					"size.border.none",
					"size.border.thin",
					"size.border.medium",
					"size.border.thick",
					"state.interactive.idle",
					"state.interactive.hover",
					"state.interactive.active",
					"state.interactive.disabled",
				],
				slot: [
					"root",
					"content",
					"actions",
				],
				variant: {
					color: [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
					state: [
						"idle",
						"hover",
						"active",
						"disabled",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.success": [
						"bg-green-500",
					],
					"color.bg.warning": [
						"bg-yellow-500",
					],
					"color.bg.danger": [
						"bg-red-500",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.success": [
						"text-white",
					],
					"color.text.warning": [
						"text-gray-900",
					],
					"color.text.danger": [
						"text-white",
					],
					"color.border.default": [
						"border-gray-300",
					],
					"color.border.primary": [
						"border-blue-600",
					],
					"color.border.success": [
						"border-green-600",
					],
					"color.border.warning": [
						"border-yellow-600",
					],
					"color.border.danger": [
						"border-red-600",
					],
					"size.spacing.sm": [
						"p-2",
					],
					"size.spacing.md": [
						"p-4",
					],
					"size.spacing.lg": [
						"p-6",
					],
					"size.typography.sm": [
						"text-sm",
					],
					"size.typography.md": [
						"text-base",
					],
					"size.typography.lg": [
						"text-lg",
					],
					"size.border.none": [],
					"size.border.thin": [
						"border",
					],
					"size.border.medium": [
						"border-2",
					],
					"size.border.thick": [
						"border-4",
					],
					"state.interactive.idle": [],
					"state.interactive.hover": [
						"hover:opacity-80",
					],
					"state.interactive.active": [
						"active:scale-95",
					],
					"state.interactive.disabled": [
						"opacity-50",
						"cursor-not-allowed",
					],
				}),
				rules: [
					def.rule(
						{
							color: "default",
							size: "md",
							state: "idle",
						},
						{
							root: what.token([
								"color.bg.default",
								"color.text.default",
								"color.border.default",
								"size.spacing.md",
								"size.typography.md",
								"size.border.thin",
								"state.interactive.idle",
							]),
							content: what.css([
								"min-h-0",
								"flex-1",
								"leading-relaxed",
							]),
							actions: what.css([
								"flex",
								"gap-2",
								"justify-end",
								"mt-4",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
					state: "idle",
				}),
			}),
		);

		// Test default behavior
		const defaultInstance = TokenComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(defaultInstance.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(defaultInstance.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test color token override
		const colorTokenOverride = TokenComponent.create(() => ({
			token: {
				"color.bg.primary": [
					"bg-purple-500",
				],
				"color.text.primary": [
					"text-purple-900",
				],
				"color.border.primary": [
					"border-purple-600",
				],
			},
		}));
		expect(colorTokenOverride.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(colorTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(colorTokenOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test size token override
		const sizeTokenOverride = TokenComponent.create(() => ({
			token: {
				"size.spacing.sm": [
					"p-1",
				],
				"size.typography.sm": [
					"text-xs",
				],
				"size.border.medium": [
					"border-2",
				],
			},
		}));
		expect(sizeTokenOverride.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(sizeTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(sizeTokenOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test state token override
		const stateTokenOverride = TokenComponent.create(() => ({
			token: {
				"state.interactive.hover": [
					"hover:bg-blue-100",
				],
				"state.interactive.active": [
					"active:bg-blue-200",
				],
				"state.interactive.disabled": [
					"opacity-30",
					"pointer-events-none",
				],
			},
		}));
		expect(stateTokenOverride.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(stateTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(stateTokenOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test multiple token overrides
		const multiTokenOverride = TokenComponent.create(() => ({
			token: {
				"color.bg.primary": [
					"bg-indigo-500",
				],
				"color.text.primary": [
					"text-indigo-900",
				],
				"size.spacing.lg": [
					"p-8",
				],
				"size.typography.lg": [
					"text-xl",
				],
				"state.interactive.hover": [
					"hover:shadow-lg",
				],
			},
		}));
		expect(multiTokenOverride.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(multiTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(multiTokenOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test mixed token override (some tokens, some variants)
		const mixedTokenOverride = TokenComponent.create(() => ({
			variant: {
				color: "primary",
				size: "lg",
				state: "hover",
			},
			token: {
				"color.bg.primary": [
					"bg-teal-500",
				],
				"color.text.primary": [
					"text-teal-900",
				],
				"size.spacing.lg": [
					"p-8",
				],
			},
		}));
		expect(mixedTokenOverride.root()).toBe("");
		expect(mixedTokenOverride.content()).toBe("");
		expect(mixedTokenOverride.actions()).toBe("");

		// Test that variants are preserved when overriding tokens
		const variantPreservation = TokenComponent.create(() => ({
			variant: {
				color: "success",
				size: "lg",
				state: "active",
			},
			token: {
				"color.bg.success": [
					"bg-emerald-500",
				],
				"color.text.success": [
					"text-emerald-900",
				],
			},
		}));
		expect(variantPreservation.root()).toBe("");
		expect(variantPreservation.content()).toBe("");
		expect(variantPreservation.actions()).toBe("");
	});
});
