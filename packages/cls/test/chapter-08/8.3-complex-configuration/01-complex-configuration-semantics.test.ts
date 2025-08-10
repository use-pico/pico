import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("8.3 Complex Configuration", () => {
	it("should handle complex configuration scenarios with multiple overrides and variants", () => {
		// Base component with comprehensive styling system
		const ComplexComponent = cls(
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
					"color.shadow": [
						"none",
						"soft",
						"medium",
						"strong",
					],
					"size.spacing": [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					"size.typography": [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					"size.border": [
						"none",
						"thin",
						"thick",
						"extra",
					],
					"layout.direction": [
						"horizontal",
						"vertical",
					],
					"layout.alignment": [
						"start",
						"center",
						"end",
						"stretch",
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
					"header",
					"content",
					"footer",
					"sidebar",
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
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					layout: [
						"horizontal",
						"vertical",
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
					"color.shadow": {
						none: [],
						soft: [
							"shadow-sm",
						],
						medium: [
							"shadow",
						],
						strong: [
							"shadow-lg",
						],
					},
					"size.spacing": {
						xs: [
							"p-1",
						],
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
						xl: [
							"p-8",
						],
					},
					"size.typography": {
						xs: [
							"text-xs",
						],
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
						xl: [
							"text-xl",
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
						extra: [
							"border-4",
						],
					},
					"layout.direction": {
						horizontal: [
							"flex-row",
						],
						vertical: [
							"flex-col",
						],
					},
					"layout.alignment": {
						start: [
							"justify-start",
							"items-start",
						],
						center: [
							"justify-center",
							"items-center",
						],
						end: [
							"justify-end",
							"items-end",
						],
						stretch: [
							"justify-stretch",
							"items-stretch",
						],
					},
					"state.interactive": {
						idle: [],
						hover: [
							"hover:bg-opacity-90",
							"hover:shadow-md",
						],
						focus: [
							"focus:ring-2",
							"focus:ring-blue-300",
							"focus:outline-none",
						],
						active: [
							"active:scale-95",
							"active:shadow-inner",
						],
						disabled: [
							"opacity-50",
							"cursor-not-allowed",
							"pointer-events-none",
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
							"color.shadow.soft",
							"layout.direction.horizontal",
							"layout.alignment.start",
						]),
						header: what.css([
							"border-b",
							"border-gray-200",
							"pb-2",
							"mb-2",
							"font-semibold",
						]),
						content: what.css([
							"min-h-0",
							"flex-1",
							"leading-relaxed",
						]),
						footer: what.css([
							"border-t",
							"border-gray-200",
							"pt-2",
							"mt-2",
							"text-sm",
							"text-gray-600",
						]),
						sidebar: what.css([
							"w-64",
							"bg-gray-50",
							"border-r",
							"border-gray-200",
							"p-4",
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
							header: what.css([
								"border-blue-200",
							]),
							footer: what.css([
								"border-blue-200",
								"text-blue-600",
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
							header: what.css([
								"border-green-200",
							]),
							footer: what.css([
								"border-green-200",
								"text-green-600",
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
							header: what.css([
								"border-yellow-200",
							]),
							footer: what.css([
								"border-yellow-200",
								"text-yellow-600",
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
							header: what.css([
								"border-red-200",
							]),
							footer: what.css([
								"border-red-200",
								"text-red-600",
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
							header: what.css([
								"text-sm",
								"pb-1",
								"mb-1",
							]),
							content: what.css([
								"text-sm",
							]),
							footer: what.css([
								"text-xs",
								"pt-1",
								"mt-1",
							]),
							sidebar: what.css([
								"w-48",
								"p-2",
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
							header: what.css([
								"text-lg",
								"pb-3",
								"mb-3",
							]),
							content: what.css([
								"text-lg",
							]),
							footer: what.css([
								"text-base",
								"pt-3",
								"mt-3",
							]),
							sidebar: what.css([
								"w-80",
								"p-6",
							]),
							actions: what.css([
								"gap-3",
								"mt-6",
							]),
						},
					),
					// Layout variant rules
					def.rule(
						{
							layout: "vertical",
						},
						{
							root: what.token([
								"layout.direction.vertical",
								"layout.alignment.stretch",
							]),
							sidebar: what.css([
								"w-full",
								"border-r-0",
								"border-b",
								"p-4",
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
					layout: "horizontal",
					state: "idle",
				}),
			}),
		);

		// Test complex configuration - multiple variants with selective overrides
		const complexConfig1 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				color: "success",
				size: "lg",
				state: "hover",
			}),
			override: {
				header: what.css([
					"bg-green-50",
					"text-green-900",
					"border-b-2",
					"border-green-300",
					"pb-4",
					"mb-4",
					"font-bold",
					"text-xl",
				]),
				sidebar: what.token([
					"size.spacing.xl",
					"color.bg.warning",
				]),
			},
		}));
		expect(complexConfig1.root()).toBe(
			"border shadow-sm flex-row justify-start items-start bg-green-500 text-white border-green-300 p-6 text-lg hover:bg-opacity-90 hover:shadow-md",
		);
		expect(complexConfig1.header()).toBe(
			"bg-green-50 text-green-900 border-b-2 border-green-300 pb-4 mb-4 font-bold text-xl",
		);
		expect(complexConfig1.content()).toBe("min-h-0 flex-1 text-lg");
		expect(complexConfig1.footer()).toBe(
			"border-t border-green-200 text-green-600 text-base pt-3 mt-3",
		);
		expect(complexConfig1.sidebar()).toBe("p-8 bg-yellow-500");
		expect(complexConfig1.actions()).toBe("flex justify-end gap-3 mt-6");

		// Test complex configuration - layout change with mixed overrides
		const complexConfig2 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				layout: "vertical",
				color: "primary",
				state: "focus",
			}),
			override: {
				root: what.token([
					"size.spacing.xs",
					"size.typography.xl",
					"color.shadow.strong",
				]),
				actions: what.css([
					"bg-blue-100",
					"text-blue-800",
					"border",
					"border-blue-200",
					"rounded-lg",
					"p-3",
				]),
			},
		}));
		expect(complexConfig2.root()).toBe("p-1 text-xl shadow-lg");
		expect(complexConfig2.header()).toBe(
			"border-b pb-2 mb-2 font-semibold border-blue-200",
		);
		expect(complexConfig2.content()).toBe("min-h-0 flex-1 leading-relaxed");
		expect(complexConfig2.footer()).toBe(
			"border-t pt-2 mt-2 text-sm border-blue-200 text-blue-600",
		);
		expect(complexConfig2.sidebar()).toBe(
			"bg-gray-50 border-gray-200 w-full border-r-0 border-b p-4",
		);
		expect(complexConfig2.actions()).toBe(
			"bg-blue-100 text-blue-800 border border-blue-200 rounded-lg p-3",
		);

		// Test complex configuration - extreme size with state combinations
		const complexConfig3 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				size: "xl",
				color: "danger",
				state: "active",
			}),
			override: {
				content: what.token([
					"color.bg.warning",
					"color.text.warning",
					"size.border.extra",
				]),
				footer: what.css([
					"bg-red-50",
					"text-red-900",
					"border-red-300",
					"rounded-b-lg",
				]),
			},
		}));
		expect(complexConfig3.root()).toBe(
			"p-4 text-base border shadow-sm flex-row justify-start items-start bg-red-500 text-white border-red-300 active:scale-95 active:shadow-inner",
		);
		expect(complexConfig3.header()).toBe(
			"border-b pb-2 mb-2 font-semibold border-red-200",
		);
		expect(complexConfig3.content()).toBe(
			"bg-yellow-500 text-gray-900 border-4",
		);
		expect(complexConfig3.footer()).toBe(
			"bg-red-50 text-red-900 border-red-300 rounded-b-lg",
		);
		expect(complexConfig3.sidebar()).toBe(
			"w-64 bg-gray-50 border-r border-gray-200 p-4",
		);
		expect(complexConfig3.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test complex configuration - minimal overrides with maximum variants
		const complexConfig4 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				color: "warning",
				size: "sm",
				layout: "vertical",
				state: "disabled",
			}),
			override: {
				// Only override the root with a custom shadow
				root: what.token([
					"color.shadow.medium",
				]),
			},
		}));
		expect(complexConfig4.root()).toBe("shadow");
		expect(complexConfig4.header()).toBe(
			"border-b font-semibold border-yellow-200 text-sm pb-1 mb-1",
		);
		expect(complexConfig4.content()).toBe("min-h-0 flex-1 text-sm");
		expect(complexConfig4.footer()).toBe(
			"border-t border-yellow-200 text-yellow-600 text-xs pt-1 mt-1",
		);
		expect(complexConfig4.sidebar()).toBe(
			"bg-gray-50 border-gray-200 w-full border-r-0 border-b p-4",
		);
		expect(complexConfig4.actions()).toBe("flex justify-end gap-1 mt-2");

		// Test complex configuration - CSS-only overrides with token variants
		const complexConfig5 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				size: "md",
				state: "focus",
			}),
			override: {
				root: what.css([
					"bg-gradient-to-br",
					"from-blue-600",
					"to-blue-800",
					"text-white",
					"shadow-xl",
					"rounded-xl",
					"border-0",
				]),
				header: what.css([
					"bg-white",
					"bg-opacity-20",
					"text-white",
					"border-white",
					"border-opacity-30",
					"rounded-t-xl",
				]),
				footer: what.css([
					"bg-white",
					"bg-opacity-10",
					"text-blue-100",
					"border-white",
					"border-opacity-20",
					"rounded-b-xl",
				]),
			},
		}));
		expect(complexConfig5.root()).toBe(
			"bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl rounded-xl border-0",
		);
		expect(complexConfig5.header()).toBe(
			"bg-opacity-20 text-white border-opacity-30 rounded-t-xl",
		);
		expect(complexConfig5.content()).toBe("min-h-0 flex-1 leading-relaxed");
		expect(complexConfig5.footer()).toBe(
			"bg-opacity-10 text-blue-100 border-opacity-20 rounded-b-xl",
		);
		expect(complexConfig5.sidebar()).toBe(
			"w-64 bg-gray-50 border-r border-gray-200 p-4",
		);
		expect(complexConfig5.actions()).toBe("flex gap-2 justify-end mt-4");
	});
});
