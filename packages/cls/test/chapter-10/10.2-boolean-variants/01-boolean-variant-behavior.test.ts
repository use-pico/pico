import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";

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
					"state.disabled.enabled": {
						class: [],
					},
					"state.disabled.disabled": {
						class: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
					"state.loading.idle": {
						class: [],
					},
					"state.loading.loading": {
						class: [
							"animate-pulse",
							"cursor-wait",
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
					{
						match: {
							disabled: true,
						},
						slot: {
							root: {
								token: [
									"state.disabled.disabled",
								],
							},
						},
					},
					{
						match: {
							loading: true,
						},
						slot: {
							root: {
								token: [
									"state.loading.loading",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					disabled: false,
					loading: false,
				},
			},
		);

		const _foo: Cls.VariantOf<typeof BooleanComponent, "disabled"> = true;
		const _foo2: Cls.VariantOf<typeof BooleanComponent, "color"> =
			"default";

		// Test basic boolean variant behavior
		const { slots: defaultInstance } = BooleanComponent.create();
		expect(defaultInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test boolean variant: disabled = true
		const { slots: disabledInstance } = BooleanComponent.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 text-gray-900 opacity-50 cursor-not-allowed",
		);

		// Test boolean variant: loading = true
		const { slots: loadingInstance } = BooleanComponent.create({
			variant: {
				loading: true,
			},
		});
		expect(loadingInstance.root()).toBe(
			"bg-gray-100 text-gray-900 animate-pulse cursor-wait",
		);

		// Test boolean variant: disabled = false (explicit)
		const { slots: enabledInstance } = BooleanComponent.create({
			variant: {
				disabled: false,
			},
		});
		expect(enabledInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test boolean variant: loading = false (explicit)
		const { slots: idleInstance } = BooleanComponent.create({
			variant: {
				loading: false,
			},
		});
		expect(idleInstance.root()).toBe("bg-gray-100 text-gray-900");

		// Test multiple boolean variants together
		const { slots: disabledLoadingInstance } = BooleanComponent.create({
			variant: {
				disabled: true,
				loading: true,
			},
		});
		expect(disabledLoadingInstance.root()).toBe(
			"bg-gray-100 text-gray-900 opacity-50 animate-pulse cursor-wait",
		);

		// Test boolean variants with other variants
		const { slots: primaryDisabledInstance } = BooleanComponent.create({
			variant: {
				color: "primary",
				disabled: true,
			},
		});
		expect(primaryDisabledInstance.root()).toBe(
			"bg-blue-500 text-white opacity-50 cursor-not-allowed",
		);

		const { slots: primaryLoadingInstance } = BooleanComponent.create({
			variant: {
				color: "primary",
				loading: true,
			},
		});
		expect(primaryLoadingInstance.root()).toBe(
			"bg-blue-500 text-white animate-pulse cursor-wait",
		);

		// Test all variants together
		const { slots: complexInstance } = BooleanComponent.create({
			variant: {
				color: "primary",
				disabled: true,
				loading: true,
			},
		});
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
							disabled: true,
						},
						slot: {
							root: {
								token: [
									"state.disabled.disabled",
								],
							},
						},
					},
					{
						match: {
							loading: true,
						},
						slot: {
							root: {
								token: [
									"state.loading.loading",
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
					disabled: false,
					loading: false,
					size: "md",
				},
			},
		);

		// Test that extended component preserves boolean variant behavior
		const { slots: extendedDefaultInstance } =
			ExtendedBooleanComponent.create();
		expect(extendedDefaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2",
		);

		const { slots: extendedDisabledInstance } =
			ExtendedBooleanComponent.create({
				variant: {
					disabled: true,
				},
			});
		expect(extendedDisabledInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 opacity-50 cursor-not-allowed",
		);

		const { slots: extendedComplexInstance } =
			ExtendedBooleanComponent.create({
				variant: {
					color: "success",
					disabled: true,
					loading: true,
					size: "lg",
				},
			});
		expect(extendedComplexInstance.root()).toBe(
			"bg-green-500 text-white opacity-50 animate-pulse cursor-wait px-6 py-3",
		);

		// Test that boolean variants work with use method
		const BooleanGroup = BooleanComponent.use(ExtendedBooleanComponent);
		expect(typeof BooleanGroup.create).toBe("function");

		// Test runtime access to extended boolean variants
		const groupInstance = BooleanGroup as any;
		const { slots: groupComplexInstance } = groupInstance.create({
			variant: {
				color: "success",
				disabled: true,
				loading: true,
				size: "lg",
			},
		});
		expect(groupComplexInstance.root()).toBe(
			"bg-green-500 text-white opacity-50 animate-pulse cursor-wait px-6 py-3",
		);
	});
});
