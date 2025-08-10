import { cls } from "./src/cls.js";

// Base component with basic tokens
const BaseComponent = cls(
	{
		tokens: {
			"color.bg": [
				"default",
				"primary",
			],
			"color.text": [
				"default",
				"primary",
			],
			"spacing.padding": [
				"sm",
				"md",
				"lg",
			],
		},
		slot: [
			"root",
		],
		variant: {
			color: [
				"default",
				"primary",
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
			"color.bg": {
				default: [
					"bg-gray-100",
				],
				primary: [
					"bg-blue-500",
				],
			},
			"color.text": {
				default: [
					"text-gray-900",
				],
				primary: [
					"text-white",
				],
			},
			"spacing.padding": {
				sm: [
					"px-2",
					"py-1",
				],
				md: [
					"px-4",
					"py-2",
				],
				lg: [
					"px-6",
					"py-3",
				],
			},
		}),
		rules: [
			def.root({
				root: what.token([
					"color.bg.default",
					"color.text.default",
					"spacing.padding.md",
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
					size: "sm",
				},
				{
					root: what.token([
						"spacing.padding.sm",
					]),
				},
			),
			def.rule(
				{
					size: "lg",
				},
				{
					root: what.token([
						"spacing.padding.lg",
					]),
				},
			),
		],
		defaults: def.defaults({
			color: "default",
			size: "md",
		}),
	}),
);

// Extended component that overrides some tokens
const ExtendedComponent = BaseComponent.extend(
	{
		tokens: {
			"color.bg": [
				"default",
				"primary",
				"success",
			],
			"color.text": [
				"default",
				"primary",
				"success",
			],
			"spacing.padding": [
				"sm",
				"md",
				"lg",
				"xl",
			],
			"border.radius": [
				"none",
				"sm",
				"md",
				"lg",
			],
		},
		slot: [
			"root",
		],
		variant: {
			color: [
				"default",
				"primary",
				"success",
			],
			size: [
				"sm",
				"md",
				"lg",
				"xl",
			],
			radius: [
				"none",
				"sm",
				"md",
				"lg",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			"color.bg": {
				default: [
					"bg-gray-50",
				], // Override base default
				primary: [
					"bg-blue-600",
				], // Override base primary
				success: [
					"bg-green-500",
				], // New token
			},
			"color.text": {
				default: [
					"text-gray-800",
				], // Override base default
				primary: [
					"text-blue-50",
				], // Override base primary
				success: [
					"text-white",
				], // New token
			},
			"spacing.padding": {
				sm: [
					"px-1",
					"py-0.5",
				], // Override base small
				md: [
					"px-4",
					"py-2",
				], // Keep base medium
				lg: [
					"px-6",
					"py-3",
				], // Keep base large
				xl: [
					"px-8",
					"py-4",
				], // New size
			},
			"border.radius": {
				none: [
					"rounded-none",
				],
				sm: [
					"rounded-sm",
				],
				md: [
					"rounded-md",
				],
				lg: [
					"rounded-lg",
				],
			},
		}),
		rules: [
			def.root({
				root: what.token([
					"color.bg.default",
					"color.text.default",
					"spacing.padding.md",
					"border.radius.md",
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
					size: "sm",
				},
				{
					root: what.token([
						"spacing.padding.sm",
					]),
				},
			),
			def.rule(
				{
					size: "lg",
				},
				{
					root: what.token([
						"spacing.padding.lg",
					]),
				},
			),
			def.rule(
				{
					size: "xl",
				},
				{
					root: what.token([
						"spacing.padding.xl",
					]),
				},
			),
			def.rule(
				{
					radius: "none",
				},
				{
					root: what.token([
						"border.radius.none",
					]),
				},
			),
			def.rule(
				{
					radius: "lg",
				},
				{
					root: what.token([
						"border.radius.lg",
					]),
				},
			),
		],
		defaults: def.defaults({
			color: "default",
			size: "md",
			radius: "md",
		}),
	}),
);

// Test extended component behavior - should use overridden tokens
const extendedDefault = ExtendedComponent.create();
console.log("Extended Default:", JSON.stringify(extendedDefault.root()));
console.log("Expected: px-4 py-2 rounded-md bg-gray-50 text-gray-800");
console.log("Actual:  ", extendedDefault.root());
