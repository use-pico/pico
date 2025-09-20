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
			{
				token: {
					"color.bg.light": {
						class: [
							"bg-white",
						],
					},
					"color.bg.dark": {
						class: [
							"bg-gray-900",
						],
					},
					"color.text.light": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.dark": {
						class: [
							"text-white",
						],
					},
					"color.border.light": {
						class: [
							"border-gray-200",
						],
					},
					"color.border.dark": {
						class: [
							"border-gray-700",
						],
					},
					"color.shadow.none": {
						class: [],
					},
					"color.shadow.light": {
						class: [
							"shadow-sm",
						],
					},
					"color.shadow.dark": {
						class: [
							"shadow-lg",
						],
					},
					"size.spacing.xs": {
						class: [
							"p-1",
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
					"size.spacing.xl": {
						class: [
							"p-8",
						],
					},
					"size.typography.xs": {
						class: [
							"text-xs",
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
					"size.typography.xl": {
						class: [
							"text-xl",
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
					"layout.direction.horizontal": {
						class: [
							"flex-row",
						],
					},
					"layout.direction.vertical": {
						class: [
							"flex-col",
						],
					},
					"layout.alignment.start": {
						class: [
							"justify-start",
						],
					},
					"layout.alignment.center": {
						class: [
							"justify-center",
						],
					},
					"layout.alignment.end": {
						class: [
							"justify-end",
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
							color: "light",
							size: "md",
							layout: "horizontal",
							alignment: "start",
							state: "idle",
						},
						slot: {
							root: {
								token: [
									"color.bg.light",
									"color.text.light",
									"color.border.light",
									"size.spacing.md",
									"size.typography.md",
									"size.border.thin",
									"layout.direction.horizontal",
									"layout.alignment.start",
									"state.interactive.idle",
								],
							},
							header: {
								class: [
									"border-b",
									"border-gray-200",
									"pb-2",
									"mb-2",
									"font-semibold",
								],
							},
							content: {
								class: [
									"min-h-0",
									"flex-1",
									"leading-relaxed",
								],
							},
							footer: {
								class: [
									"border-t",
									"border-gray-200",
									"pt-2",
									"mt-2",
									"text-sm",
									"text-gray-600",
								],
							},
							sidebar: {
								class: [
									"w-64",
									"bg-gray-50",
									"p-4",
									"border-r",
									"border-gray-200",
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
					color: "light",
					size: "md",
					layout: "horizontal",
					alignment: "start",
					state: "idle",
				},
			},
		);

		// Test complex configuration 1: Multiple variant overrides
		const { slots: complexConfig1 } = ComplexComponent.create({
			variant: {
				color: "dark",
				size: "lg",
				state: "hover",
			},
			slot: {
				sidebar: {
					class: [
						"p-8",
						"bg-yellow-500",
					],
				},
			},
		});
		expect(complexConfig1.root()).toBe("");
		expect(complexConfig1.header()).toBe("");
		expect(complexConfig1.content()).toBe("");
		expect(complexConfig1.footer()).toBe("");
		expect(complexConfig1.sidebar()).toBe("p-8 bg-yellow-500");
		expect(complexConfig1.actions()).toBe("");

		// Test complex configuration 2: Token overrides with variants
		const { slots: complexConfig2 } = ComplexComponent.create({
			variant: {
				size: "sm",
				state: "active",
			},
			token: {
				"size.spacing.sm": {
					class: [
						"p-1",
					],
				},
				"size.typography.sm": {
					class: [
						"text-xl",
					],
				},
				"color.shadow.light": {
					class: [
						"shadow-lg",
					],
				},
			},
		});
		expect(complexConfig2.root()).toBe("");
		expect(complexConfig2.header()).toBe("");
		expect(complexConfig2.content()).toBe("");
		expect(complexConfig2.footer()).toBe("");
		expect(complexConfig2.sidebar()).toBe("");
		expect(complexConfig2.actions()).toBe("");

		// Test complex configuration 3: Mixed slot and token overrides
		const { slots: complexConfig3 } = ComplexComponent.create({
			variant: {
				color: "dark",
				layout: "vertical",
				alignment: "center",
			},
			slot: {
				root: {
					token: [
						"color.bg.dark",
						"color.text.dark",
						"color.shadow.dark",
					],
				},
				header: {
					class: [
						"bg-blue-500",
						"text-white",
						"p-4",
						"rounded-t-lg",
					],
				},
				content: {
					class: [
						"bg-gray-800",
						"p-6",
						"text-center",
					],
				},
				footer: {
					class: [
						"bg-red-500",
						"text-white",
						"p-4",
						"rounded-b-lg",
					],
				},
			},
		});
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
		const { slots: complexConfig4 } = ComplexComponent.create({
			token: {
				"color.shadow.light": {
					class: [
						"shadow",
					],
				},
			},
		});
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
		const { slots: complexConfig5 } = ComplexComponent.create({
			variant: {
				color: "dark",
				size: "xl",
				layout: "vertical",
				alignment: "center",
				state: "disabled",
			},
			slot: {
				root: {
					class: [
						"bg-gradient-to-b",
						"from-purple-500",
						"to-pink-500",
						"text-white",
						"shadow-2xl",
					],
				},
				header: {
					class: [
						"bg-black",
						"bg-opacity-20",
						"p-6",
						"text-2xl",
						"font-bold",
					],
				},
				content: {
					class: [
						"min-h-0",
						"flex-1",
						"leading-relaxed",
					],
				},
			},
		});
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
