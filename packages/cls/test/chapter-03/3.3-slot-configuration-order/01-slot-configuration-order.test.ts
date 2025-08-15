import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Slot Configurations Should Append to Rules", () => {
	it("should append slot configurations to rules instead of overriding them", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
					"title",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"bg-gray-100",
							"rounded",
							"p-4",
						]),
						title: what.css([
							"text-lg",
							"font-bold",
						]),
					}),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"p-6",
							]),
							title: what.css([
								"text-xl",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const instance = Component.create();

		// Test that slot configurations append to rules, not override them
		const result = instance.root(({ what }) => ({
			slot: what.slot({
				root: what.css([
					"text-blue-500",
					"border",
				]),
			}),
		}));

		// Should contain both base classes from rules AND slot configuration classes
		expect(result).toBe("bg-gray-100 rounded p-4 text-blue-500 border");
	});

	it("should handle multiple slot configurations in correct order", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"base-class",
							"component-class",
						]),
					}),
					def.rule(
						{
							theme: "dark",
						},
						{
							root: what.css([
								"dark-theme",
							]),
						},
					),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
		);

		const instance = Component.create();

		// Test with both variant and slot configuration
		const result = instance.root(({ what }) => ({
			variant: what.variant({
				theme: "dark",
			}),
			slot: what.slot({
				root: what.css([
					"user-added-class",
					"custom-styling",
				]),
			}),
		}));

		// Should contain: base classes + dark theme classes + user slot classes
		expect(result).toBe(
			"base-class component-class dark-theme user-added-class custom-styling",
		);
	});

	it("should handle slot configurations with user config and slot function calls", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"component-base",
						]),
					}),
					def.rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"size-md",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const instance = Component.create();

		// Test the complete flow: rules -> slot function -> user config
		const result = instance.root(({ what }) => ({
			slot: what.slot({
				root: what.css([
					"user-config-class",
				]),
			}),
		}));

		// Order should be: component-base + user-config-class (slot function is applied first, then user config)
		expect(result).toBe("component-base user-config-class");
	});

	it("should handle overrides correctly (clear and replace)", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"component-base",
							"base-styling",
						]),
					}),
					def.rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"size-md",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const instance = Component.create();

		// Test override behavior
		const result = instance.root(({ what }) => ({
			variant: what.variant({
				size: "md",
			}),
			override: {
				root: what.css([
					"override-class",
					"replacement-styling",
				]),
			},
		}));

		// Override should clear all previous classes and only apply override classes
		expect(result).toBe("override-class replacement-styling");
	});

	it("should handle complex inheritance with slot configurations", () => {
		const BaseComponent = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"base-component",
						]),
					}),
					def.rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"base-size-md",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"extended-component",
						]),
					}),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"extended-size-lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const instance = ExtendedComponent.create();

		// Test inheritance with slot configuration
		const result = instance.root(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
			slot: what.slot({
				root: what.css([
					"user-slot-class",
				]),
			}),
		}));

		// Should contain: base classes + extended classes + user slot classes
		// Note: base-size-md is not applied because the extended component overrides the default size
		expect(result).toBe(
			"base-component extended-component extended-size-lg user-slot-class",
		);
	});
});
