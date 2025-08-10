import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation", () => {
	describe("Basic cls instance creation with minimal contract", () => {
		it("should create a basic button with minimal contract", () => {
			const Button = cls(
				{
					tokens: {
						"color.bg": [
							"default",
						],
					},
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
					token: def.token({
						"color.bg": {
							default: [
								"bg-gray-100",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.bg.default",
							]),
						}),
					],
					defaults: def.defaults({
						size: "md",
					}),
				}),
			);

			expect(Button).toBeDefined();
			expect(Button.contract).toBeDefined();
			expect(Button.contract.tokens).toEqual({
				"color.bg": [
					"default",
				],
			});
			expect(Button.contract.slot).toEqual([
				"root",
			]);
			expect(Button.contract.variant).toEqual({
				size: [
					"sm",
					"md",
				],
			});
		});

		it("should create a component with only required properties", () => {
			const Minimal = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"base-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Minimal).toBeDefined();
			expect(Minimal.contract.tokens).toEqual({});
			expect(Minimal.contract.slot).toEqual([
				"root",
			]);
			expect(Minimal.contract.variant).toEqual({});
		});
	});

	describe("Simple token definitions", () => {
		it("should handle single token group with multiple variants", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
							"secondary",
						],
					},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: def.token({
						"color.text": {
							default: [
								"text-gray-900",
							],
							primary: [
								"text-blue-600",
							],
							secondary: [
								"text-green-600",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Component.contract.tokens["color.text"]).toEqual([
				"default",
				"primary",
				"secondary",
			]);
		});

		it("should handle multiple token groups", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
						"color.bg": [
							"default",
							"primary",
						],
						spacing: [
							"sm",
							"md",
							"lg",
						],
					},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: def.token({
						"color.text": {
							default: [
								"text-gray-900",
							],
							primary: [
								"text-blue-600",
							],
						},
						"color.bg": {
							default: [
								"bg-gray-100",
							],
							primary: [
								"bg-blue-100",
							],
						},
						spacing: {
							sm: [
								"p-2",
							],
							md: [
								"p-4",
							],
							lg: [
								"p-6",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
								"color.bg.default",
								"spacing.md",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Object.keys(Component.contract.tokens)).toHaveLength(3);
			expect(Component.contract.tokens["color.text"]).toEqual([
				"default",
				"primary",
			]);
			expect(Component.contract.tokens["color.bg"]).toEqual([
				"default",
				"primary",
			]);
			expect(Component.contract.tokens.spacing).toEqual([
				"sm",
				"md",
				"lg",
			]);
		});
	});

	describe("Basic slot definitions", () => {
		it("should handle single slot component", () => {
			const SingleSlot = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"single-slot-class",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(SingleSlot.contract.slot).toEqual([
				"root",
			]);
		});

		it("should handle multiple slots", () => {
			const MultiSlot = cls(
				{
					tokens: {},
					slot: [
						"root",
						"header",
						"body",
						"footer",
					],
					variant: {},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"bg-white",
								"rounded-lg",
								"shadow",
							]),
							header: what.css([
								"px-4",
								"py-3",
								"border-b",
							]),
							body: what.css([
								"px-4",
								"py-4",
							]),
							footer: what.css([
								"px-4",
								"py-3",
								"border-t",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(MultiSlot.contract.slot).toEqual([
				"root",
				"header",
				"body",
				"footer",
			]);
		});
	});

	describe("Default variant values", () => {
		it("should set default variant values", () => {
			const Component = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {
						size: [
							"sm",
							"md",
							"lg",
						],
						variant: [
							"default",
							"primary",
						],
					},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"base-class",
							]),
						}),
					],
					defaults: def.defaults({
						size: "md",
						variant: "default",
					}),
				}),
			);

			expect(Component.definition.defaults).toEqual({
				size: "md",
				variant: "default",
			});
		});

		it("should handle boolean variants with defaults", () => {
			const Component = cls(
				{
					tokens: {},
					slot: [
						"root",
					],
					variant: {
						disabled: [
							"bool",
						],
						loading: [
							"bool",
						],
					},
				},
				({ what, def }) => ({
					token: {},
					rules: [
						def.root({
							root: what.css([
								"base-class",
							]),
						}),
					],
					defaults: def.defaults({
						disabled: false,
						loading: false,
					}),
				}),
			);

			expect(Component.definition.defaults).toEqual({
				disabled: false,
				loading: false,
			});
		});
	});

	describe("Basic create() method usage", () => {
		it("should create slot functions with create()", () => {
			const Button = cls(
				{
					tokens: {
						"color.bg": [
							"default",
							"primary",
						],
					},
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
					token: def.token({
						"color.bg": {
							default: [
								"bg-gray-100",
							],
							primary: [
								"bg-blue-600",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.bg.default",
							]),
						}),
					],
					defaults: def.defaults({
						size: "md",
					}),
				}),
			);

			const slots = Button.create();
			expect(slots.root).toBeDefined();
			expect(typeof slots.root).toBe("function");
		});

		it("should generate CSS classes from create()", () => {
			const Button = cls(
				{
					tokens: {
						"color.bg": [
							"default",
						],
					},
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
					token: def.token({
						"color.bg": {
							default: [
								"bg-gray-100",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.bg.default",
							]),
						}),
					],
					defaults: def.defaults({
						size: "md",
					}),
				}),
			);

			const slots = Button.create();
			const rootClasses = slots.root();

			// The root slot should return CSS classes based on the default variant
			expect(rootClasses).toContain("bg-gray-100");
		});

		it("should allow variant overrides in create()", () => {
			const Button = cls(
				{
					tokens: {
						"color.bg": [
							"default",
							"primary",
						],
					},
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
					token: def.token({
						"color.bg": {
							default: [
								"bg-gray-100",
							],
							primary: [
								"bg-blue-600",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.bg.primary",
							]),
						}),
					],
					defaults: def.defaults({
						size: "md",
					}),
				}),
			);

			const slots = Button.create();
			const rootClasses = slots.root();

			// Should use the primary color token
			expect(rootClasses).toContain("bg-blue-600");
		});
	});
});
