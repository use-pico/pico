import { describe, expect, it } from "vitest";
import { cls, type VariantOf } from "../../../src";

describe("10.2 Boolean Variants", () => {
	it("should handle boolean variant values and their interactions", () => {
		// Component with boolean variants
		const BooleanComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
					"state.disabled.enabled",
					"state.disabled.disabled",
					"state.loading.idle",
					"state.loading.loading",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
					],
					disabled: [
						"bool",
					],
					loading: [
						"bool",
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
					"state.disabled.enabled": what.css([]),
					"state.disabled.disabled": what.css([
						"opacity-50",
						"cursor-not-allowed",
					]),
					"state.loading.idle": what.css([]),
					"state.loading.loading": what.css([
						"animate-pulse",
						"cursor-wait",
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
					def.rule(
						{
							disabled: true,
						},
						{
							root: what.token([
								"state.disabled.disabled",
							]),
						},
					),
					def.rule(
						{
							loading: true,
						},
						{
							root: what.token([
								"state.loading.loading",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					disabled: false,
					loading: false,
				}),
			}),
		);

		const _foo: VariantOf<typeof BooleanComponent, "disabled"> = true;
		const _foo2: VariantOf<typeof BooleanComponent, "color"> = "default";

		// Test basic boolean variant behavior
		const defaultInstance = BooleanComponent.create();
		expect(defaultInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test boolean variant: disabled = true
		const disabledInstance = BooleanComponent.create(() => ({
			variant: {
				disabled: true,
			},
		}));
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 text-gray-900 opacity-50 cursor-not-allowed",
		);

		// Test boolean variant: loading = true
		const loadingInstance = BooleanComponent.create(() => ({
			variant: {
				loading: true,
			},
		}));
		expect(loadingInstance.root()).toBe(
			"bg-gray-100 text-gray-900 animate-pulse cursor-wait",
		);

		// Test boolean variant: disabled = false (explicit)
		const enabledInstance = BooleanComponent.create(() => ({
			variant: {
				disabled: false,
			},
		}));
		expect(enabledInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test boolean variant: loading = false (explicit)
		const idleInstance = BooleanComponent.create(() => ({
			variant: {
				loading: false,
			},
		}));
		expect(idleInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test multiple boolean variants together
		const disabledLoadingInstance = BooleanComponent.create(() => ({
			variant: {
				disabled: true,
				loading: true,
			},
		}));
		expect(disabledLoadingInstance.root()).toBe(
			"bg-gray-100 text-gray-900 opacity-50 animate-pulse cursor-wait",
		);

		// Test boolean variants with other variants
		const primaryDisabledInstance = BooleanComponent.create(() => ({
			variant: {
				color: "primary",
				disabled: true,
			},
		}));
		expect(primaryDisabledInstance.root()).toBe(
			"bg-blue-500 text-white opacity-50 cursor-not-allowed",
		);

		const primaryLoadingInstance = BooleanComponent.create(() => ({
			variant: {
				color: "primary",
				loading: true,
			},
		}));
		expect(primaryLoadingInstance.root()).toBe(
			"bg-blue-500 text-white animate-pulse cursor-wait",
		);

		// Test all variants together
		const complexInstance = BooleanComponent.create(() => ({
			variant: {
				color: "primary",
				disabled: true,
				loading: true,
			},
		}));
		expect(complexInstance.root()).toBe(
			"bg-blue-500 text-white opacity-50 animate-pulse cursor-wait",
		);

		// Test that boolean variants work with extend method
		const ExtendedBooleanComponent = BooleanComponent.extend(
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
					disabled: [
						"bool",
					],
					loading: [
						"bool",
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
					"color.text.success": what.css([
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
							"size.padding.md",
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
							color: "success",
						},
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					def.rule(
						{
							disabled: true,
						},
						{
							root: what.token([
								"state.disabled.disabled",
							]),
						},
					),
					def.rule(
						{
							loading: true,
						},
						{
							root: what.token([
								"state.loading.loading",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					disabled: false,
					loading: false,
					size: "md",
				}),
			}),
		);

		// Test that extended component preserves boolean variant behavior
		const extendedDefaultInstance = ExtendedBooleanComponent.create();
		expect(extendedDefaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2",
		);

		const extendedDisabledInstance = ExtendedBooleanComponent.create(
			() => ({
				variant: {
					disabled: true,
				},
			}),
		);
		expect(extendedDisabledInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 opacity-50 cursor-not-allowed",
		);

		const extendedComplexInstance = ExtendedBooleanComponent.create(() => ({
			variant: {
				color: "success",
				disabled: true,
				loading: true,
				size: "lg",
			},
		}));
		expect(extendedComplexInstance.root()).toBe(
			"bg-green-500 text-white opacity-50 animate-pulse cursor-wait px-6 py-3",
		);

		// Test that boolean variants work with use method
		const BooleanGroup = BooleanComponent.use(ExtendedBooleanComponent);
		expect(typeof BooleanGroup.create).toBe("function");

		// Test runtime access to extended boolean variants
		const groupInstance = BooleanGroup as any;
		const groupComplexInstance = groupInstance.create(() => ({
			variant: {
				color: "success",
				disabled: true,
				loading: true,
				size: "lg",
			},
		}));
		expect(groupComplexInstance.root()).toBe(
			"bg-green-500 text-white opacity-50 animate-pulse cursor-wait px-6 py-3",
		);
	});
});
