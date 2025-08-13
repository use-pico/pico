import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("8.3 Complex Configuration", () => {
	it("should handle complex configuration scenarios with multiple overrides", () => {
		// Base component with comprehensive token system
		const ComplexComponent = cls(
			{
				tokens: [
					"color.bg.light",
					"color.bg.dark",
					"color.text.light",
					"color.text.dark",
					"color.border.light",
					"color.border.dark",
					"color.shadow.none",
					"color.shadow.light",
					"color.shadow.dark",
					"size.spacing.xs",
					"size.spacing.sm",
					"size.spacing.md",
					"size.spacing.lg",
					"size.spacing.xl",
					"size.typography.xs",
					"size.typography.sm",
					"size.typography.md",
					"size.typography.lg",
					"size.typography.xl",
					"size.border.none",
					"size.border.thin",
					"size.border.medium",
					"size.border.thick",
					"layout.direction.horizontal",
					"layout.direction.vertical",
					"layout.alignment.start",
					"layout.alignment.center",
					"layout.alignment.end",
					"state.interactive.idle",
					"state.interactive.hover",
					"state.interactive.active",
					"state.interactive.disabled",
				],
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
						"light",
						"dark",
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
					alignment: [
						"start",
						"center",
						"end",
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
					"color.bg.light": what.css([
						"bg-white",
					]),
					"color.bg.dark": what.css([
						"bg-gray-900",
					]),
					"color.text.light": what.css([
						"text-gray-900",
					]),
					"color.text.dark": what.css([
						"text-white",
					]),
					"color.border.light": what.css([
						"border-gray-200",
					]),
					"color.border.dark": what.css([
						"border-gray-700",
					]),
					"color.shadow.none": what.css([]),
					"color.shadow.light": what.css([
						"shadow-sm",
					]),
					"color.shadow.dark": what.css([
						"shadow-lg",
					]),
					"size.spacing.xs": what.css([
						"p-1",
					]),
					"size.spacing.sm": what.css([
						"p-2",
					]),
					"size.spacing.md": what.css([
						"p-4",
					]),
					"size.spacing.lg": what.css([
						"p-6",
					]),
					"size.spacing.xl": what.css([
						"p-8",
					]),
					"size.typography.xs": what.css([
						"text-xs",
					]),
					"size.typography.sm": what.css([
						"text-sm",
					]),
					"size.typography.md": what.css([
						"text-base",
					]),
					"size.typography.lg": what.css([
						"text-lg",
					]),
					"size.typography.xl": what.css([
						"text-xl",
					]),
					"size.border.none": what.css([]),
					"size.border.thin": what.css([
						"border",
					]),
					"size.border.medium": what.css([
						"border-2",
					]),
					"size.border.thick": what.css([
						"border-4",
					]),
					"layout.direction.horizontal": what.css([
						"flex-row",
					]),
					"layout.direction.vertical": what.css([
						"flex-col",
					]),
					"layout.alignment.start": what.css([
						"justify-start",
					]),
					"layout.alignment.center": what.css([
						"justify-center",
					]),
					"layout.alignment.end": what.css([
						"justify-end",
					]),
					"state.interactive.idle": what.css([]),
					"state.interactive.hover": what.css([
						"hover:opacity-80",
					]),
					"state.interactive.active": what.css([
						"active:scale-95",
					]),
					"state.interactive.disabled": what.css([
						"opacity-50",
						"cursor-not-allowed",
					]),
				}),
				rules: [
					def.rule(
						{
							color: "light",
							size: "md",
							layout: "horizontal",
							alignment: "start",
							state: "idle",
						},
						{
							root: what.token([
								"color.bg.light",
								"color.text.light",
								"color.border.light",
								"size.spacing.md",
								"size.typography.md",
								"size.border.thin",
								"layout.direction.horizontal",
								"layout.alignment.start",
								"state.interactive.idle",
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
								"p-4",
								"border-r",
								"border-gray-200",
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
					color: "light",
					size: "md",
					layout: "horizontal",
					alignment: "start",
					state: "idle",
				}),
			}),
		);

		// Test complex configuration 1: Multiple variant overrides
		const complexConfig1 = ComplexComponent.create(({ what }) => ({
			variant: {
				color: "dark",
				size: "lg",
				state: "hover",
			},
			slot: {
				sidebar: what.css([
					"p-8",
					"bg-yellow-500",
				]),
			},
		}));
		expect(complexConfig1.root()).toBe("");
		expect(complexConfig1.header()).toBe("");
		expect(complexConfig1.content()).toBe("");
		expect(complexConfig1.footer()).toBe("");
		expect(complexConfig1.sidebar()).toBe("p-8 bg-yellow-500");
		expect(complexConfig1.actions()).toBe("");

		// Test complex configuration 2: Token overrides with variants
		const complexConfig2 = ComplexComponent.create(
			({ what, override }) => ({
				variant: what.variant({
					size: "sm",
					state: "active",
				}),
				token: override.token({
					"size.spacing.sm": what.css([
						"p-1",
					]),
					"size.typography.sm": what.css([
						"text-xl",
					]),
					"color.shadow.light": what.css([
						"shadow-lg",
					]),
				}),
			}),
		);
		expect(complexConfig2.root()).toBe("");
		expect(complexConfig2.header()).toBe("");
		expect(complexConfig2.content()).toBe("");
		expect(complexConfig2.footer()).toBe("");
		expect(complexConfig2.sidebar()).toBe("");
		expect(complexConfig2.actions()).toBe("");

		// Test complex configuration 3: Mixed slot and token overrides
		const complexConfig3 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				color: "dark",
				layout: "vertical",
				alignment: "center",
			}),
			slot: what.slot({
				root: what.token([
					"color.bg.dark",
					"color.text.dark",
					"color.shadow.dark",
				]),
				header: what.css([
					"bg-blue-500",
					"text-white",
					"p-4",
					"rounded-t-lg",
				]),
				content: what.css([
					"bg-gray-800",
					"p-6",
					"text-center",
				]),
				footer: what.css([
					"bg-red-500",
					"text-white",
					"p-4",
					"rounded-b-lg",
				]),
			}),
		}));
		expect(complexConfig3.root()).toBe("bg-gray-900 text-white shadow-lg");
		expect(complexConfig3.header()).toBe(
			"bg-blue-500 text-white p-4 rounded-t-lg",
		);
		expect(complexConfig3.content()).toBe("bg-gray-800 p-6 text-center");
		expect(complexConfig3.footer()).toBe(
			"bg-red-500 text-white p-4 rounded-b-lg",
		);
		expect(complexConfig3.sidebar()).toBe("");
		expect(complexConfig3.actions()).toBe("");

		// Test complex configuration 4: Minimal overrides
		const complexConfig4 = ComplexComponent.create(
			({ what, override }) => ({
				token: override.token({
					"color.shadow.light": what.css([
						"shadow",
					]),
				}),
			}),
		);
		expect(complexConfig4.root()).toBe(
			"bg-white text-gray-900 border-gray-200 p-4 text-base border flex-row justify-start",
		);
		expect(complexConfig4.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 font-semibold",
		);
		expect(complexConfig4.content()).toBe("min-h-0 flex-1 leading-relaxed");
		expect(complexConfig4.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(complexConfig4.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(complexConfig4.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test complex configuration 5: All overrides
		const complexConfig5 = ComplexComponent.create(({ what }) => ({
			variant: what.variant({
				color: "dark",
				size: "xl",
				layout: "vertical",
				alignment: "center",
				state: "disabled",
			}),
			slot: what.slot({
				root: what.css([
					"bg-gradient-to-b",
					"from-purple-500",
					"to-pink-500",
					"text-white",
					"shadow-2xl",
				]),
				header: what.css([
					"bg-black",
					"bg-opacity-20",
					"p-6",
					"text-2xl",
					"font-bold",
				]),
				content: what.css([
					"min-h-0",
					"flex-1",
					"leading-relaxed",
				]),
			}),
		}));
		expect(complexConfig5.root()).toBe(
			"bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-2xl",
		);
		expect(complexConfig5.header()).toBe(
			"bg-opacity-20 p-6 text-2xl font-bold",
		);
		expect(complexConfig5.content()).toBe("min-h-0 flex-1 leading-relaxed");
		expect(complexConfig5.footer()).toBe("");
		expect(complexConfig5.sidebar()).toBe("");
		expect(complexConfig5.actions()).toBe("");
	});
});
