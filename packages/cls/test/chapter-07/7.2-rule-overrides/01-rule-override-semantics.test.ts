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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-500",
					]),
					"color.bg.danger": what.css([
						"bg-red-500",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-white",
					]),
					"color.text.danger": what.css([
						"text-white",
					]),
					"size.sm": what.css([
						"px-2",
						"py-1",
						"text-sm",
					]),
					"size.md": what.css([
						"px-4",
						"py-2",
						"text-base",
					]),
					"size.lg": what.css([
						"px-6",
						"py-3",
						"text-lg",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.secondary",
							"color.text.secondary",
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
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.lg",
							]),
						},
					),
					def.rule(
						{
							color: "primary",
							size: "lg",
						},
						{
							root: what.css([
								"shadow-lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "secondary",
					size: "md",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.bg.danger": what.css([
						"bg-red-600",
					]),
					"color.bg.success": what.css([
						"bg-green-500",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-white",
					]),
					"color.text.danger": what.css([
						"text-white",
					]),
					"color.text.success": what.css([
						"text-white",
					]),
					"size.sm": what.css([
						"px-2",
						"py-1",
						"text-sm",
					]),
					"size.md": what.css([
						"px-4",
						"py-2",
						"text-base",
					]),
					"size.lg": what.css([
						"px-8",
						"py-4",
						"text-xl",
					]),
					"size.xl": what.css([
						"px-10",
						"py-5",
						"text-2xl",
					]),
				}),
				rules: [
					// Override the root to prevent inheritance of base tokens
					def.root({
						root: what.token([
							"color.bg.secondary",
							"color.text.secondary",
						]),
					}),
					// Override the primary color rule with enhanced styling
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
					// Override the large size rule with different spacing
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.token([
								"size.lg",
							]),
						},
					),
					// Override the combined variant rule
					def.rule(
						what.variant({
							color: "primary",
							size: "lg",
						}),
						{
							root: what.css([
								"shadow-xl",
								"rounded-lg",
							]),
						},
					),
					// Add new rule for danger color
					def.rule(
						what.variant({
							color: "danger",
						}),
						{
							root: what.token([
								"color.bg.danger",
								"color.text.danger",
							]),
						},
					),
					// Add new rule for success color
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
					// Add new rule for xl size
					def.rule(
						what.variant({
							size: "xl",
						}),
						{
							root: what.token([
								"size.xl",
							]),
						},
					),
					// Add new combined variant rule
					def.rule(
						what.variant({
							color: "success",
							size: "xl",
						}),
						{
							root: what.css([
								"shadow-2xl",
								"rounded-xl",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "secondary",
					size: "md",
				}),
			}),
		);

		// Test base component behavior
		const basePrimary = BaseComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
			}),
		}));
		expect(basePrimary.root()).toBe("bg-blue-500 text-white");

		const baseLarge = BaseComponent.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(baseLarge.root()).toBe(
			"bg-gray-500 text-white px-6 py-3 text-lg",
		);

		const basePrimaryLarge = BaseComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				size: "lg",
			}),
		}));
		expect(basePrimaryLarge.root()).toBe(
			"bg-blue-500 text-white px-6 py-3 text-lg shadow-lg",
		);

		// Test extended component behavior - rules should be overridden
		const extendedPrimary = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
			}),
		}));
		expect(extendedPrimary.root()).toBe("bg-blue-600 text-white");

		const extendedLarge = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(extendedLarge.root()).toBe(
			"bg-gray-600 text-white px-8 py-4 text-xl",
		);

		const extendedPrimaryLarge = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				size: "lg",
			}),
		}));
		expect(extendedPrimaryLarge.root()).toBe(
			"bg-blue-600 text-white px-8 py-4 text-xl shadow-xl rounded-lg",
		);

		// Test new variants that don't exist in base
		const extendedSuccess = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "success",
			}),
		}));
		expect(extendedSuccess.root()).toBe("bg-green-500 text-white");

		const extendedXl = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "xl",
			}),
		}));
		expect(extendedXl.root()).toBe(
			"bg-gray-600 text-white px-10 py-5 text-2xl",
		);

		const extendedSuccessXl = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "success",
				size: "xl",
			}),
		}));
		expect(extendedSuccessXl.root()).toBe(
			"bg-green-500 text-white px-10 py-5 text-2xl shadow-2xl rounded-xl",
		);

		// Test that non-overridden variants still work as expected
		const extendedSecondary = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "secondary",
			}),
		}));
		expect(extendedSecondary.root()).toBe("bg-gray-600 text-white");

		const extendedDanger = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				color: "danger",
			}),
		}));
		expect(extendedDanger.root()).toBe("bg-red-600 text-white");

		const extendedSm = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(extendedSm.root()).toBe("bg-gray-600 text-white");
	});
});
