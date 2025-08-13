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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.secondary": [
						"bg-gray-500",
					],
					"color.text.primary": [
						"text-blue-900",
					],
					"color.text.secondary": [
						"text-gray-900",
					],
					"spacing.padding.sm": [
						"p-2",
					],
					"spacing.padding.md": [
						"p-4",
					],
					"spacing.padding.lg": [
						"p-6",
					],
					"spacing.margin.sm": [
						"m-2",
					],
					"spacing.margin.md": [
						"m-4",
					],
					"spacing.margin.lg": [
						"m-6",
					],
					"border.style.solid": [
						"border-solid",
					],
					"border.style.dashed": [
						"border-dashed",
					],
					"border.radius.sm": [
						"rounded-sm",
					],
					"border.radius.md": [
						"rounded-md",
					],
					"border.radius.lg": [
						"rounded-lg",
					],
				}),
				rules: [
					def.rule(
						{
							color: "primary",
							size: "medium",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.style.solid",
								"border.radius.md",
							]),
							header: what.token([
								"color.bg.primary",
								"color.text.primary",
								"spacing.padding.sm",
								"spacing.margin.sm",
								"border.style.solid",
								"border.radius.sm",
							]),
							content: what.token([
								"color.bg.primary",
								"color.text.primary",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.style.solid",
								"border.radius.md",
							]),
							footer: what.token([
								"color.bg.primary",
								"color.text.primary",
								"spacing.padding.sm",
								"spacing.margin.sm",
								"border.style.solid",
								"border.radius.sm",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": [
						"bg-blue-600", // Override base primary
					],
					"color.bg.secondary": [
						"bg-gray-600", // Override base secondary
					],
					"color.bg.accent": [
						"bg-purple-500", // New token
					],
					"color.text.primary": [
						"text-blue-800", // Override base primary
					],
					"color.text.secondary": [
						"text-gray-800", // Override base secondary
					],
					"color.text.accent": [
						"text-purple-900", // New token
					],
					"spacing.padding.sm": [
						"p-2",
					],
					"spacing.padding.md": [
						"p-4",
					],
					"spacing.padding.lg": [
						"p-6",
					],
					"spacing.padding.xl": [
						"p-8", // New token
					],
					"spacing.margin.sm": [
						"m-2",
					],
					"spacing.margin.md": [
						"m-4",
					],
					"spacing.margin.lg": [
						"m-6",
					],
					"spacing.margin.xl": [
						"m-8", // New token
					],
					"border.style.solid": [
						"border-solid",
					],
					"border.style.dashed": [
						"border-dashed",
					],
					"border.style.dotted": [
						"border-dotted", // New token
					],
					"border.radius.sm": [
						"rounded-sm",
					],
					"border.radius.md": [
						"rounded-md",
					],
					"border.radius.lg": [
						"rounded-lg",
					],
					"border.radius.xl": [
						"rounded-xl", // New token
					],
					"border.radius.full": [
						"rounded-full", // New token
					],
					"shadow.depth.none": [
						"shadow-none",
					],
					"shadow.depth.sm": [
						"shadow-sm",
					],
					"shadow.depth.md": [
						"shadow-md",
					],
					"shadow.depth.lg": [
						"shadow-lg",
					],
				}),
				rules: [
					def.rule(
						{
							color: "accent",
							size: "large",
						},
						{
							root: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.lg",
								"spacing.margin.lg",
								"border.style.dotted",
								"border.radius.lg",
								"shadow.depth.md",
							]),
							header: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.style.dotted",
								"border.radius.md",
								"shadow.depth.sm",
							]),
							content: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.lg",
								"spacing.margin.lg",
								"border.style.dotted",
								"border.radius.lg",
								"shadow.depth.md",
							]),
							footer: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.style.dotted",
								"border.radius.md",
								"shadow.depth.sm",
							]),
							sidebar: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.style.dotted",
								"border.radius.md",
								"shadow.depth.sm",
							]),
							navigation: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.sm",
								"spacing.margin.sm",
								"border.style.dotted",
								"border.radius.sm",
								"shadow.depth.sm",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "accent",
					size: "large",
				}),
			}),
		);

		// Test BaseComponent default behavior with all slots
		const baseDefault = BaseComponent.create();
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
		const extendedDefault = ExtendedComponent.create();
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
		const extendedInherited = ExtendedComponent.create(() => ({
			variant: {
				color: "primary",
				size: "medium",
			},
		}));
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
