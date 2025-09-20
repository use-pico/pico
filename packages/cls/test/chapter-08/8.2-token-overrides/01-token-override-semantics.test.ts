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
					"color.bg.success": {
						class: [
							"bg-green-500",
						],
					},
					"color.bg.warning": {
						class: [
							"bg-yellow-500",
						],
					},
					"color.bg.danger": {
						class: [
							"bg-red-500",
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
					"color.text.success": {
						class: [
							"text-white",
						],
					},
					"color.text.warning": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"color.border.default": {
						class: [
							"border-gray-300",
						],
					},
					"color.border.primary": {
						class: [
							"border-blue-600",
						],
					},
					"color.border.success": {
						class: [
							"border-green-600",
						],
					},
					"color.border.warning": {
						class: [
							"border-yellow-600",
						],
					},
					"color.border.danger": {
						class: [
							"border-red-600",
						],
					},
					"size.spacing.sm": {
						class: [
							"p-2",
						],
					},
					"size.spacing.md": {
						class: [
							"p-4",
						],
					},
					"size.spacing.lg": {
						class: [
							"p-6",
						],
					},
					"size.typography.sm": {
						class: [
							"text-sm",
						],
					},
					"size.typography.md": {
						class: [
							"text-base",
						],
					},
					"size.typography.lg": {
						class: [
							"text-lg",
						],
					},
					"size.border.none": {
						class: [],
					},
					"size.border.thin": {
						class: [
							"border",
						],
					},
					"size.border.medium": {
						class: [
							"border-2",
						],
					},
					"size.border.thick": {
						class: [
							"border-4",
						],
					},
					"state.interactive.idle": {
						class: [],
					},
					"state.interactive.hover": {
						class: [
							"hover:opacity-80",
						],
					},
					"state.interactive.active": {
						class: [
							"active:scale-95",
						],
					},
					"state.interactive.disabled": {
						class: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				},
				rules: [
					{
						match: {
							color: "default",
							size: "md",
							state: "idle",
						},
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
									"color.border.default",
									"size.spacing.md",
									"size.typography.md",
									"size.border.thin",
									"state.interactive.idle",
								],
							},
							content: {
								class: [
									"min-h-0",
									"flex-1",
									"leading-relaxed",
								],
							},
							actions: {
								class: [
									"flex",
									"gap-2",
									"justify-end",
									"mt-4",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					state: "idle",
				},
			},
		);

		// Test default behavior
		const { slots: defaultInstance } = TokenComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(defaultInstance.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(defaultInstance.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test color token override
		const { slots: colorTokenOverride } = TokenComponent.create({
			token: {
				"color.bg.primary": {
					class: [
						"bg-purple-500",
					],
				},
				"color.text.primary": {
					class: [
						"text-purple-900",
					],
				},
				"color.border.primary": {
					class: [
						"border-purple-600",
					],
				},
			},
		});
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
		const { slots: sizeTokenOverride } = TokenComponent.create({
			token: {
				"size.spacing.sm": {
					class: [
						"p-1",
					],
				},
				"size.typography.sm": {
					class: [
						"text-xs",
					],
				},
				"size.border.medium": {
					class: [
						"border-2",
					],
				},
			},
		});
		expect(sizeTokenOverride.root()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300 p-4 text-base border",
		);
		expect(sizeTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(sizeTokenOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test state token override
		const { slots: stateTokenOverride } = TokenComponent.create({
			token: {
				"state.interactive.hover": {
					class: [
						"hover:bg-blue-100",
					],
				},
				"state.interactive.active": {
					class: [
						"active:bg-blue-200",
					],
				},
				"state.interactive.disabled": {
					class: [
						"opacity-30",
						"pointer-events-none",
					],
				},
			},
		});
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
		const { slots: multiTokenOverride } = TokenComponent.create({
			token: {
				"color.bg.primary": {
					class: [
						"bg-indigo-500",
					],
				},
				"color.text.primary": {
					class: [
						"text-indigo-900",
					],
				},
				"size.spacing.lg": {
					class: [
						"p-8",
					],
				},
				"size.typography.lg": {
					class: [
						"text-xl",
					],
				},
				"state.interactive.hover": {
					class: [
						"hover:shadow-lg",
					],
				},
			},
		});
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
		const { slots: mixedTokenOverride } = TokenComponent.create({
			variant: {
				color: "primary",
				size: "lg",
				state: "hover",
			},
			token: {
				"color.bg.primary": {
					class: [
						"bg-teal-500",
					],
				},
				"color.text.primary": {
					class: [
						"text-teal-900",
					],
				},
				"size.spacing.lg": {
					class: [
						"p-8",
					],
				},
			},
		});
		expect(mixedTokenOverride.root()).toBe("");
		expect(mixedTokenOverride.content()).toBe("");
		expect(mixedTokenOverride.actions()).toBe("");

		// Test that variants are preserved when overriding tokens
		const { slots: variantPreservation } = TokenComponent.create({
			variant: {
				color: "success",
				size: "lg",
				state: "active",
			},
			token: {
				"color.bg.success": {
					class: [
						"bg-emerald-500",
					],
				},
				"color.text.success": {
					class: [
						"text-emerald-900",
					],
				},
			},
		});
		expect(variantPreservation.root()).toBe("");
		expect(variantPreservation.content()).toBe("");
		expect(variantPreservation.actions()).toBe("");
	});
});
