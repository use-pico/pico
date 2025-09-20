import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("6.3 Slot Inheritance - Slot Inheritance Semantics", () => {
	it("should handle slot inheritance with proper slot definition and styling inheritance", () => {
		// Base component with multiple slots
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.margin.sm",
					"spacing.margin.md",
					"spacing.margin.lg",
					"border.style.solid",
					"border.style.dashed",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
					size: [
						"small",
						"medium",
						"large",
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
					"border.style.solid": {
						class: [
							"border-solid",
						],
					},
					"border.style.dashed": {
						class: [
							"border-dashed",
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
				},
				rules: [
					{
						match: {
							color: "primary",
							size: "medium",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.style.solid",
									"border.radius.md",
								],
							},
							header: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.style.solid",
									"border.radius.sm",
								],
							},
							content: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.style.solid",
									"border.radius.md",
								],
							},
							footer: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.style.solid",
									"border.radius.sm",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "medium",
				},
			},
		);

		// Extended component that adds new slots and overrides existing ones
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.padding.xl",
					"spacing.margin.sm",
					"spacing.margin.md",
					"spacing.margin.lg",
					"spacing.margin.xl",
					"border.style.solid",
					"border.style.dashed",
					"border.style.dotted",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
					"border.radius.xl",
					"border.radius.full",
					"shadow.depth.none",
					"shadow.depth.sm",
					"shadow.depth.md",
					"shadow.depth.lg",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
					"sidebar",
					"navigation",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"accent",
					],
					size: [
						"small",
						"medium",
						"large",
						"xl",
					],
				},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600", // Override base primary
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600", // Override base secondary
						],
					},
					"color.bg.accent": {
						class: [
							"bg-purple-500", // New token
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-800", // Override base primary
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-800", // Override base secondary
						],
					},
					"color.text.accent": {
						class: [
							"text-purple-900", // New token
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
							"p-8", // New token
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
							"m-8", // New token
						],
					},
					"border.style.solid": {
						class: [
							"border-solid",
						],
					},
					"border.style.dashed": {
						class: [
							"border-dashed",
						],
					},
					"border.style.dotted": {
						class: [
							"border-dotted", // New token
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
							"rounded-xl", // New token
						],
					},
					"border.radius.full": {
						class: [
							"rounded-full", // New token
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
				},
				rules: [
					{
						match: {
							color: "accent",
							size: "large",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.style.dotted",
									"border.radius.lg",
									"shadow.depth.md",
								],
							},
							header: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.style.dotted",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							content: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.style.dotted",
									"border.radius.lg",
									"shadow.depth.md",
								],
							},
							footer: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.style.dotted",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							sidebar: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.style.dotted",
									"border.radius.md",
									"shadow.depth.sm",
								],
							},
							navigation: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.sm",
									"spacing.margin.sm",
									"border.style.dotted",
									"border.radius.sm",
									"shadow.depth.sm",
								],
							},
						},
					},
				],
				defaults: {
					color: "accent",
					size: "large",
				},
			},
		);

		// Test BaseComponent default behavior with all slots
		const { slots: baseDefault } = BaseComponent.create();
		expect(baseDefault.root()).toBe(
			"bg-blue-500 text-blue-900 p-4 m-4 border-solid rounded-md",
		);
		expect(baseDefault.header()).toBe(
			"bg-blue-500 text-blue-900 p-2 m-2 border-solid rounded-sm",
		);
		expect(baseDefault.content()).toBe(
			"bg-blue-500 text-blue-900 p-4 m-4 border-solid rounded-md",
		);
		expect(baseDefault.footer()).toBe(
			"bg-blue-500 text-blue-900 p-2 m-2 border-solid rounded-sm",
		);

		// Test ExtendedComponent default behavior with all slots
		const { slots: extendedDefault } = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-dotted rounded-lg shadow-md",
		);
		expect(extendedDefault.header()).toBe(
			"bg-purple-500 text-purple-900 p-4 m-4 border-dotted rounded-md shadow-sm",
		);
		expect(extendedDefault.content()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-dotted rounded-lg shadow-md",
		);
		expect(extendedDefault.footer()).toBe(
			"bg-purple-500 text-purple-900 p-4 m-4 border-dotted rounded-md shadow-sm",
		);
		expect(extendedDefault.sidebar()).toBe(
			"bg-purple-500 text-purple-900 p-4 m-4 border-dotted rounded-md shadow-sm",
		);
		expect(extendedDefault.navigation?.()).toBe(
			"bg-purple-500 text-purple-900 p-2 m-2 border-dotted rounded-sm shadow-sm",
		);

		// Test that inherited variants still work with overridden tokens
		const { slots: extendedInherited } = ExtendedComponent.create({
			variant: {
				color: "primary",
				size: "medium",
			},
		});
		expect(extendedInherited.root()).toBe(
			"bg-blue-600 text-blue-800 p-4 m-4 border-solid rounded-md",
		);
		expect(extendedInherited.header()).toBe(
			"bg-blue-600 text-blue-800 p-2 m-2 border-solid rounded-sm",
		);
		expect(extendedInherited.content()).toBe(
			"bg-blue-600 text-blue-800 p-4 m-4 border-solid rounded-md",
		);
		expect(extendedInherited.footer()).toBe(
			"bg-blue-600 text-blue-800 p-2 m-2 border-solid rounded-sm",
		);
	});
});
