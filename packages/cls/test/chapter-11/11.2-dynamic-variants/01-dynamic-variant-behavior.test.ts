import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("11.2 Dynamic Variants - Dynamic Variant Behavior", () => {
	it("should handle dynamic variant computation and application with runtime variant resolution", () => {
		// Component with dynamic variant computation
		const DynamicComponent = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.bg.warning",
					"color.bg.error",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"color.text.warning",
					"color.text.error",
					"spacing.padding.xs",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.padding.xl",
					"spacing.margin.xs",
					"spacing.margin.sm",
					"spacing.margin.md",
					"spacing.margin.lg",
					"spacing.margin.xl",
					"border.width.none",
					"border.width.thin",
					"border.width.medium",
					"border.width.thick",
					"border.radius.none",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
					"border.radius.xl",
					"border.radius.full",
					"shadow.depth.none",
					"shadow.depth.sm",
					"shadow.depth.md",
					"shadow.depth.lg",
					"shadow.depth.xl",
				],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"accent",
						"warning",
						"error",
					],
					size: [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					state: [
						"normal",
						"hover",
						"active",
						"disabled",
						"loading",
					],
					theme: [
						"light",
						"dark",
						"auto",
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
					"color.bg.warning": {
						class: [
							"bg-yellow-500",
						],
					},
					"color.bg.error": {
						class: [
							"bg-red-500",
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-900",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.accent": {
						class: [
							"text-purple-900",
						],
					},
					"color.text.warning": {
						class: [
							"text-yellow-900",
						],
					},
					"color.text.error": {
						class: [
							"text-red-900",
						],
					},
					"spacing.padding.xs": {
						class: [
							"p-1",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
						],
					},
					"spacing.padding.xl": {
						class: [
							"p-8",
						],
					},
					"spacing.margin.xs": {
						class: [
							"m-1",
						],
					},
					"spacing.margin.sm": {
						class: [
							"m-2",
						],
					},
					"spacing.margin.md": {
						class: [
							"m-4",
						],
					},
					"spacing.margin.lg": {
						class: [
							"m-6",
						],
					},
					"spacing.margin.xl": {
						class: [
							"m-8",
						],
					},
					"border.width.none": {
						class: [
							"border-0",
						],
					},
					"border.width.thin": {
						class: [
							"border",
						],
					},
					"border.width.medium": {
						class: [
							"border-2",
						],
					},
					"border.width.thick": {
						class: [
							"border-4",
						],
					},
					"border.radius.none": {
						class: [
							"rounded-none",
						],
					},
					"border.radius.sm": {
						class: [
							"rounded-sm",
						],
					},
					"border.radius.md": {
						class: [
							"rounded-md",
						],
					},
					"border.radius.lg": {
						class: [
							"rounded-lg",
						],
					},
					"border.radius.xl": {
						class: [
							"rounded-xl",
						],
					},
					"border.radius.full": {
						class: [
							"rounded-full",
						],
					},
					"shadow.depth.none": {
						class: [
							"shadow-none",
						],
					},
					"shadow.depth.sm": {
						class: [
							"shadow-sm",
						],
					},
					"shadow.depth.md": {
						class: [
							"shadow-md",
						],
					},
					"shadow.depth.lg": {
						class: [
							"shadow-lg",
						],
					},
					"shadow.depth.xl": {
						class: [
							"shadow-xl",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.width.thin",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.primary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "md",
							state: "normal",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.width.thin",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.primary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "warning",
							size: "lg",
							state: "hover",
							theme: "dark",
						},
						slot: {
							root: {
								token: [
									"color.bg.warning",
									"color.text.warning",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.width.medium",
									"border.radius.lg",
									"shadow.depth.lg",
								],
							},
							icon: {
								token: [
									"color.text.warning",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
							label: {
								token: [
									"color.text.warning",
									"spacing.padding.md",
									"spacing.margin.md",
								],
							},
						},
					},
					{
						match: {
							color: "error",
							size: "xl",
							state: "disabled",
							theme: "auto",
						},
						slot: {
							root: {
								token: [
									"color.bg.error",
									"color.text.error",
									"spacing.padding.xl",
									"spacing.margin.xl",
									"border.width.thick",
									"border.radius.xl",
									"shadow.depth.xl",
								],
							},
							icon: {
								token: [
									"color.text.error",
									"spacing.padding.md",
									"spacing.margin.md",
								],
							},
							label: {
								token: [
									"color.text.error",
									"spacing.padding.lg",
									"spacing.margin.lg",
								],
							},
						},
					},

					// Additional rules for test cases
					{
						match: {
							color: "secondary",
							size: "sm",
							state: "normal",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.width.thin",
									"border.radius.sm",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.secondary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.secondary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
							size: "xs",
							state: "normal",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
									"spacing.padding.xs",
									"spacing.margin.xs",
									"border.width.thin",
									"border.radius.sm",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.secondary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.secondary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "sm",
							state: "normal",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.width.thin",
									"border.radius.sm",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.primary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "accent",
							size: "lg",
							state: "normal",
							theme: "auto",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.width.thin",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.accent",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.accent",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							size: "sm",
							state: "disabled",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.width.thin",
									"border.radius.sm",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.primary",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
					{
						match: {
							color: "accent",
							size: "lg",
							state: "loading",
							theme: "dark",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.width.thin",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							icon: {
								token: [
									"color.text.accent",
									"spacing.padding.xs",
									"spacing.margin.xs",
								],
							},
							label: {
								token: [
									"color.text.accent",
									"spacing.padding.sm",
									"spacing.margin.sm",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "md",
					state: "normal",
					theme: "light",
				},
			},
		);

		// Dynamic variant computation functions
		const computeColor = (
			priority: "low" | "medium" | "high",
		): "primary" | "secondary" | "accent" | "warning" | "error" => {
			switch (priority) {
				case "low":
					return "secondary";
				case "medium":
					return "primary";
				case "high":
					return "accent";
				default:
					return "primary";
			}
		};

		const computeSize = (
			count: number,
		): "xs" | "sm" | "md" | "lg" | "xl" => {
			if (count <= 1) return "xs";
			if (count <= 3) return "sm";
			if (count <= 5) return "md";
			if (count <= 10) return "lg";
			return "xl";
		};

		const computeState = (
			isEnabled: boolean,
			isLoading: boolean,
		): "normal" | "hover" | "active" | "disabled" | "loading" => {
			if (!isEnabled) return "disabled";
			if (isLoading) return "loading";
			return "normal";
		};

		const computeTheme = (
			userPreference: "light" | "dark" | "system",
		): "light" | "dark" | "auto" => {
			if (userPreference === "system") return "auto";
			return userPreference;
		};

		// Test dynamic variant computation with different scenarios
		const { slots: dynamicLowPriority } = DynamicComponent.create({
			variant: {
				color: computeColor("low"),
				size: computeSize(2),
				state: computeState(true, false),
				theme: computeTheme("light"),
			},
		});
		expect(dynamicLowPriority.root()).toBe(
			"bg-gray-500 text-gray-900 p-2 m-2 border rounded-sm shadow-sm",
		);

		const { slots: dynamicMediumPriority } = DynamicComponent.create({
			variant: {
				color: computeColor("medium"),
				size: computeSize(4),
				state: computeState(true, false),
				theme: computeTheme("dark"),
			},
		});
		expect(dynamicMediumPriority.root()).toBe(
			"bg-blue-500 text-blue-900 p-4 m-4 border rounded-md shadow-sm",
		);

		const { slots: dynamicHighPriority } = DynamicComponent.create({
			variant: {
				color: computeColor("high"),
				size: computeSize(7),
				state: computeState(true, false),
				theme: computeTheme("system"),
			},
		});
		expect(dynamicHighPriority.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border rounded-md shadow-sm",
		);

		// Test dynamic state computation
		const { slots: dynamicDisabled } = DynamicComponent.create({
			variant: {
				color: computeColor("medium"),
				size: computeSize(3),
				state: computeState(false, false),
				theme: computeTheme("light"),
			},
		});
		expect(dynamicDisabled.root()).toBe(
			"bg-blue-500 text-blue-900 p-2 m-2 border rounded-sm shadow-sm",
		);

		const { slots: dynamicLoading } = DynamicComponent.create({
			variant: {
				color: computeColor("high"),
				size: computeSize(8),
				state: computeState(true, true),
				theme: computeTheme("dark"),
			},
		});
		expect(dynamicLoading.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border rounded-md shadow-sm",
		);

		// Test dynamic size computation with different counts
		const { slots: dynamicSizeXS } = DynamicComponent.create({
			variant: {
				color: computeColor("low"),
				size: computeSize(1),
				state: computeState(true, false),
				theme: computeTheme("light"),
			},
		});
		expect(dynamicSizeXS.root()).toBe(
			"bg-gray-500 text-gray-900 p-1 m-1 border rounded-sm shadow-sm",
		);

		const { slots: dynamicSizeXL } = DynamicComponent.create({
			variant: {
				color: "error",
				size: computeSize(15),
				state: computeState(false, false),
				theme: computeTheme("system"),
			},
		});
		expect(dynamicSizeXL.root()).toBe(
			"bg-red-500 text-red-900 p-8 m-8 border-4 rounded-xl shadow-xl",
		);
	});
});
