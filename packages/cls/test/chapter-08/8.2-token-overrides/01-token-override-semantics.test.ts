import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("8.2 Token Overrides", () => {
	it("should allow overriding specific tokens while preserving others", () => {
		// Base component with comprehensive token system
		const TokenOverrideComponent = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
					"color.text": [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
					"color.border": [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
					"size.spacing": [
						"sm",
						"md",
						"lg",
					],
					"size.typography": [
						"sm",
						"md",
						"lg",
					],
					"size.border": [
						"none",
						"thin",
						"thick",
					],
					"state.interactive": [
						"idle",
						"hover",
						"focus",
						"active",
						"disabled",
					],
				},
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
						"focus",
						"active",
						"disabled",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-500",
						],
						success: [
							"bg-green-500",
						],
						warning: [
							"bg-yellow-500",
						],
						danger: [
							"bg-red-500",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
						success: [
							"text-white",
						],
						warning: [
							"text-gray-900",
						],
						danger: [
							"text-white",
						],
					},
					"color.border": {
						default: [
							"border-gray-200",
						],
						primary: [
							"border-blue-300",
						],
						success: [
							"border-green-300",
						],
						warning: [
							"border-yellow-300",
						],
						danger: [
							"border-red-300",
						],
					},
					"size.spacing": {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
					"size.typography": {
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
					},
					"size.border": {
						none: [],
						thin: [
							"border",
						],
						thick: [
							"border-2",
						],
					},
					"state.interactive": {
						idle: [],
						hover: [
							"hover:bg-opacity-90",
						],
						focus: [
							"focus:ring-2",
							"focus:ring-blue-300",
						],
						active: [
							"active:scale-95",
						],
						disabled: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"size.spacing.md",
							"size.typography.md",
							"size.border.thin",
							"color.border.default",
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
					}),
					// Color variant rules
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
								"color.border.primary",
							]),
						},
					),
					def.rule(
						{
							color: "success",
						},
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
								"color.border.success",
							]),
						},
					),
					def.rule(
						{
							color: "warning",
						},
						{
							root: what.token([
								"color.bg.warning",
								"color.text.warning",
								"color.border.warning",
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
								"color.border.danger",
							]),
						},
					),
					// Size variant rules
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.spacing.sm",
								"size.typography.sm",
							]),
							actions: what.css([
								"gap-1",
								"mt-2",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.spacing.lg",
								"size.typography.lg",
							]),
							actions: what.css([
								"gap-3",
								"mt-6",
							]),
						},
					),
					// State variant rules
					def.rule(
						{
							state: "hover",
						},
						{
							root: what.token([
								"state.interactive.hover",
							]),
						},
					),
					def.rule(
						{
							state: "focus",
						},
						{
							root: what.token([
								"state.interactive.focus",
							]),
						},
					),
					def.rule(
						{
							state: "active",
						},
						{
							root: what.token([
								"state.interactive.active",
							]),
						},
					),
					def.rule(
						{
							state: "disabled",
						},
						{
							root: what.token([
								"state.interactive.disabled",
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

		// Test default state
		const defaultInstance = TokenOverrideComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base border border-gray-200",
		);
		expect(defaultInstance.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(defaultInstance.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test token override - override color tokens while preserving size and state
		const colorTokenOverride = TokenOverrideComponent.create(
			({ what }) => ({
				variant: what.variant({
					size: "lg",
					state: "hover",
				}),
				override: {
					root: what.token([
						"color.bg.success",
						"color.text.success",
						"color.border.success",
					]),
				},
			}),
		);
		expect(colorTokenOverride.root()).toBe(
			"bg-green-500 text-white border-green-300",
		);
		expect(colorTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(colorTokenOverride.actions()).toBe(
			"flex justify-end gap-3 mt-6",
		);

		// Test token override - override size tokens while preserving color
		const sizeTokenOverride = TokenOverrideComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				state: "focus",
			}),
			override: {
				root: what.token([
					"size.spacing.sm",
					"size.typography.sm",
					"size.border.thick",
				]),
			},
		}));
		expect(sizeTokenOverride.root()).toBe("p-2 text-sm border-2");
		expect(sizeTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(sizeTokenOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test token override - override state tokens while preserving color and size
		const stateTokenOverride = TokenOverrideComponent.create(
			({ what }) => ({
				variant: what.variant({
					color: "warning",
					size: "lg",
				}),
				override: {
					root: what.token([
						"state.interactive.active",
						"state.interactive.disabled",
					]),
				},
			}),
		);
		expect(stateTokenOverride.root()).toBe(
			"active:scale-95 opacity-50 cursor-not-allowed",
		);
		expect(stateTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(stateTokenOverride.actions()).toBe(
			"flex justify-end gap-3 mt-6",
		);

		// Test token override - override multiple token categories
		const multiTokenOverride = TokenOverrideComponent.create(
			({ what }) => ({
				variant: what.variant({
					color: "danger",
				}),
				override: {
					root: what.token([
						"size.spacing.sm",
						"size.typography.lg",
						"state.interactive.hover",
						"state.interactive.focus",
					]),
				},
			}),
		);
		expect(multiTokenOverride.root()).toBe(
			"p-2 text-lg hover:bg-opacity-90 focus:ring-2 focus:ring-blue-300",
		);
		expect(multiTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(multiTokenOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test token override with mixed CSS and tokens
		const mixedTokenOverride = TokenOverrideComponent.create(
			({ what }) => ({
				variant: what.variant({
					size: "sm",
					state: "active",
				}),
				override: {
					root: what.css([
						"bg-gradient-to-r",
						"from-purple-500",
						"to-pink-500",
						"text-white",
						"shadow-lg",
					]),
				},
			}),
		);
		expect(mixedTokenOverride.root()).toBe(
			"bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg",
		);
		expect(mixedTokenOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(mixedTokenOverride.actions()).toBe(
			"flex justify-end gap-1 mt-2",
		);

		// Test that non-overridden slots still inherit variant styles
		const variantPreservation = TokenOverrideComponent.create(
			({ what }) => ({
				variant: what.variant({
					color: "success",
					size: "lg",
					state: "hover",
				}),
				override: {
					// Only override root with custom tokens, leave others to inherit
					root: what.token([
						"color.bg.warning",
						"color.text.warning",
						"size.spacing.md",
					]),
				},
			}),
		);
		expect(variantPreservation.root()).toBe(
			"bg-yellow-500 text-gray-900 p-4",
		);
		expect(variantPreservation.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(variantPreservation.actions()).toBe(
			"flex justify-end gap-3 mt-6",
		);
	});
});
