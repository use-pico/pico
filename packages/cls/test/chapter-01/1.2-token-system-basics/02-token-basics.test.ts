import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics", () => {
	describe("Single token definitions", () => {
		it("should create component with single token group", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
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

			expect(Component.contract.tokens).toEqual({
				"color.text": [
					"default",
				],
			});
			expect(Component.definition.token["color.text"]).toEqual({
				default: [
					"text-gray-900",
				],
			});
		});

		it("should handle single token with multiple variants", () => {
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
			expect(Component.definition.token["color.text"].primary).toEqual([
				"text-blue-600",
			]);
		});
	});

	describe("Multiple token variants", () => {
		it("should handle multiple token groups with variants", () => {
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
			expect(Component.contract.tokens["spacing"]).toEqual([
				"sm",
				"md",
				"lg",
			]);
		});

		it("should handle nested token structures", () => {
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
						border: [
							"default",
							"primary",
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
						border: {
							default: [
								"border-gray-300",
							],
							primary: [
								"border-blue-300",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
								"color.bg.default",
								"border.default",
							]),
						}),
					],
					defaults: {},
				}),
			);

			expect(Component.definition.token["color.text"].default).toEqual([
				"text-gray-900",
			]);
			expect(Component.definition.token["color.bg"].primary).toEqual([
				"bg-blue-100",
			]);
			expect(Component.definition.token["border"].default).toEqual([
				"border-gray-300",
			]);
		});
	});

	describe("Token resolution to CSS classes", () => {
		it("should resolve tokens to CSS classes in create()", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
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

			const slots = Component.create();
			const rootClasses = slots.root();

			expect(rootClasses).toContain("text-gray-900");
		});

		it("should resolve multiple tokens to combined CSS classes", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
						],
						"color.bg": [
							"default",
						],
						spacing: [
							"md",
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
						},
						"color.bg": {
							default: [
								"bg-gray-100",
							],
						},
						spacing: {
							md: [
								"p-4",
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

			const slots = Component.create();
			const rootClasses = slots.root();

			expect(rootClasses).toContain("text-gray-900");
			expect(rootClasses).toContain("bg-gray-100");
			expect(rootClasses).toContain("p-4");
		});

		it("should handle token resolution with variant overrides", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
					},
					slot: [
						"root",
					],
					variant: {
						variant: [
							"default",
							"primary",
						],
					},
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
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
							]),
						}),
						def.rule(
							what.variant({
								variant: "primary",
							}),
							{
								root: what.token([
									"color.text.primary",
								]),
							},
							true, // override parameter
						),
					],
					defaults: def.defaults({
						variant: "default",
					}),
				}),
			);

			const slots = Component.create();
			const defaultClasses = slots.root();
			const primaryClasses = slots.root(() => ({
				variant: {
					variant: "primary",
				},
			}));

			// Debug: log what we're getting
			console.log("Default classes:", defaultClasses);
			console.log("Primary classes:", primaryClasses);

			expect(defaultClasses).toContain("text-gray-900");
			expect(primaryClasses).toContain("text-blue-600");
		});

		it("should handle simple variant override with CSS classes", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
					},
					slot: [
						"root",
					],
					variant: {
						variant: [
							"default",
							"primary",
						],
					},
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
					}),
					rules: [
						def.root({
							root: what.css([
								"text-gray-900",
								"bg-gray-100",
							]),
						}),
						def.rule(
							what.variant({
								variant: "primary",
							}),
							{
								root: what.css([
									"text-blue-600",
									"bg-blue-100",
								]),
							},
							true, // override parameter
						),
					],
					defaults: def.defaults({
						variant: "default",
					}),
				}),
			);

			const slots = Component.create();
			const defaultClasses = slots.root();
			const primaryClasses = slots.root(({ what }) => ({
				variant: what.variant({
					variant: "primary",
				}),
			}));

			// Debug: log what we're getting
			console.log("Simple test - Default classes:", defaultClasses);
			console.log("Simple test - Primary classes:", primaryClasses);

			expect(defaultClasses).toContain("text-gray-900");
			expect(defaultClasses).toContain("bg-gray-100");
			expect(primaryClasses).toContain("text-blue-600");
			expect(primaryClasses).toContain("bg-blue-100");
		});

		it("should debug variant matching issue", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
					},
					slot: [
						"root",
					],
					variant: {
						variant: [
							"default",
							"primary",
						],
					},
				},
				({ what, def }) => ({
					token: def.token({
						"color.text": {
							default: [
								"default-style",
							],
							primary: [
								"primary-style",
							],
						},
					}),
					rules: [
						def.root({
							root: what.css([
								"default-style",
							]),
						}),
						def.rule(
							what.variant({
								variant: "primary",
							}),
							{
								root: what.css([
									"primary-style",
								]),
							},
							true, // override parameter
						),
					],
					defaults: def.defaults({
						variant: "default",
					}),
				}),
			);

			const slots = Component.create();

			// Test 1: No variant specified (should use default)
			const defaultClasses = slots.root();
			console.log("Debug - Default (no variant):", defaultClasses);

			// Test 2: Explicitly specify default variant
			const explicitDefaultClasses = slots.root(({ what }) => ({
				variant: {
					variant: "default",
				},
			}));
			console.log(
				"Debug - Explicit default variant:",
				explicitDefaultClasses,
			);

			// Test 3: Specify primary variant
			const primaryClasses = slots.root(({ what }) => ({
				variant: {
					variant: "primary",
				},
			}));
			console.log("Debug - Primary variant:", primaryClasses);

			// Test 4: Check what what.variant returns (inside component definition)
			const variantObj = Component.create().root(({ what }) => {
				const test = what.variant({
					variant: "primary",
				});
				console.log(
					"Debug - what.variant({ variant: 'primary' }) returns:",
					test,
				);
				return {};
			});

			expect(defaultClasses).toContain("default-style");
			expect(primaryClasses).toContain("primary-style");
		});

		it("should test minimal variant override", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
					},
					slot: [
						"root",
					],
					variant: {
						variant: [
							"default",
							"primary",
						],
					},
				},
				({ what, def }) => ({
					token: def.token({
						"color.text": {
							default: [
								"base-style",
							],
							primary: [
								"primary-style",
							],
						},
					}),
					rules: [
						def.root({
							root: what.css([
								"base-style",
							]),
						}),
						def.rule(
							what.variant({
								variant: "primary",
							}),
							{
								root: what.css([
									"primary-style",
								]),
							},
							true, // override parameter
						),
					],
					defaults: def.defaults({
						variant: "default",
					}),
				}),
			);

			const slots = Component.create();

			// Test with no variant (should use default)
			const baseClasses = slots.root();
			console.log("Minimal test - Base classes:", baseClasses);

			// Test with primary variant
			const primaryClasses = slots.root(({ what }) => ({
				variant: {
					variant: "primary",
				},
			}));
			console.log("Minimal test - Primary classes:", primaryClasses);

			expect(baseClasses).toContain("base-style");
			expect(primaryClasses).toContain("primary-style");
		});

		it("should test simple override without variants", () => {
			const Component = cls(
				{
					tokens: {
						"color.text": [
							"default",
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
								"base-style",
							],
						},
					}),
					rules: [
						def.root({
							root: what.css([
								"base-style",
							]),
						}),
						def.root(
							{
								root: what.css([
									"override-style",
								]),
							},
							true,
						), // override parameter
					],
					defaults: {},
				}),
			);

			const slots = Component.create();
			const classes = slots.root();
			console.log("Simple override test - Classes:", classes);

			expect(classes).toContain("override-style");
			expect(classes).not.toContain("base-style");
		});
	});

	describe("Token inheritance basics", () => {
		it("should set up inheritance chain with extend()", () => {
			const Base = cls(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
						"color.bg": [
							"default",
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

			const Extended = Base.extend(
				{
					tokens: {
						"color.text": [
							"default",
							"primary",
						],
						// "color.bg": [
						// 	"default",
						// ],
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
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.bg.default",
							]),
						}),
					],
					defaults: {},
				}),
			);

			// The extended component should have its own contract
			expect(Extended.contract.tokens["color.bg"]).toEqual([
				"default",
			]);
			// The extended component should also have the color.text tokens from its contract
			expect(Extended.contract.tokens["color.text"]).toEqual([
				"default",
				"primary",
			]);
		});

		it("should inherit token definitions through inheritance chain", () => {
			const Base = cls(
				{
					tokens: {
						"color.text": [
							"default",
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

			const Extended = Base.extend(
				{
					tokens: {
						"color.text": [
							"default",
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

			expect(Extended.contract.tokens["color.text"]).toEqual([
				"default",
			]);
			expect(Extended.definition.token["color.text"].default).toEqual([
				"text-gray-900",
			]);
		});
	});

	describe("Token override functionality", () => {
		it("should allow token overrides in extended components", () => {
			const Base = cls(
				{
					tokens: {
						"color.text": [
							"default",
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

			const Extended = Base.extend(
				{
					tokens: {
						"color.text": [
							"default",
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
								"text-blue-600",
							], // Override the base color
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

			const slots = Extended.create();
			const rootClasses = slots.root();

			expect(rootClasses).toContain("text-blue-600");
			expect(rootClasses).not.toContain("text-gray-900");
		});

		it("should preserve base token definitions in inheritance chain", () => {
			const Base = cls(
				{
					tokens: {
						"color.text": [
							"default",
						],
						spacing: [
							"md",
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
						},
						spacing: {
							md: [
								"p-4",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
								"spacing.md",
							]),
						}),
					],
					defaults: {},
				}),
			);

			const Extended = Base.extend(
				{
					tokens: {
						"color.text": [
							"default",
						],
						spacing: [
							"md",
						],
						"color.bg": [
							"default",
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
						},
						spacing: {
							md: [
								"p-4",
							],
						},
						"color.bg": {
							default: [
								"bg-gray-100",
							],
						},
					}),
					rules: [
						def.root({
							root: what.token([
								"color.text.default",
								"spacing.md",
								"color.bg.default",
							]),
						}),
					],
					defaults: {},
				}),
			);

			// The extended component has its own contract with inherited tokens
			expect(Extended.contract.tokens["color.text"]).toEqual([
				"default",
			]);
			expect(Extended.contract.tokens["spacing"]).toEqual([
				"md",
			]);
			expect(Extended.contract.tokens["color.bg"]).toEqual([
				"default",
			]);

			const slots = Extended.create();
			const rootClasses = slots.root();

			// The inheritance chain should still work for token resolution
			expect(rootClasses).toContain("text-gray-900");
			expect(rootClasses).toContain("p-4");
			expect(rootClasses).toContain("bg-gray-100");
		});
	});
});
