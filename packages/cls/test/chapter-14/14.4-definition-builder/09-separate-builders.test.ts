import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";
import { definition } from "../../../src/builder/definition";

describe("14.4 Definition Builder - Separate Builders", () => {
	it("should allow using a contract from one builder as input to definition creation", () => {
		// Build a contract using the contract builder
		const myContract = contract()
			.tokens([
				"color.bg.primary",
				"color.text.primary",
			])
			.slots([
				"root",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();

		// Use the built contract as input to create a CLS instance
		// This tests that contracts are reusable across different definition builders
		expect(() => {
			const Component = cls(myContract, ({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.css([
								"px-2",
								"py-1",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.css([
								"px-6",
								"py-3",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
					tone: "light",
				}),
			}));

			expect(Component).toBeDefined();
			expect(Component.contract).toBe(myContract);

			// Test that the CLS instance works correctly
			const instance = Component.create();
			expect(instance.root()).toContain("bg-blue-600");
			expect(instance.root()).toContain("text-white");

			// Test variant functionality
			const smallInstance = Component.create(({ what }) => ({
				variant: what.variant({
					size: "sm",
				}),
			}));
			expect(smallInstance.root()).toContain("px-2 py-1");

			const largeInstance = Component.create(({ what }) => ({
				variant: what.variant({
					size: "lg",
				}),
			}));
			expect(largeInstance.root()).toContain("px-6 py-3");
		}).not.toThrow();
	});

	it("should allow reusing the same contract with different definitions", () => {
		// Build a reusable contract
		const buttonContract = contract()
			.tokens([
				"bg.primary",
				"text.primary",
			])
			.slots([
				"root",
			])
			.variant("variant", [
				"primary",
				"secondary",
			])
			.build();

		// Create first component using the contract
		const PrimaryButton = cls(buttonContract, ({ what, def }) => ({
			token: def.token({
				"bg.primary": what.css([
					"bg-blue-500",
				]),
				"text.primary": what.css([
					"text-white",
				]),
			}),
			rules: [
				def.root({
					root: what.token([
						"bg.primary",
						"text.primary",
					]),
				}),
			],
			defaults: def.defaults({
				variant: "primary",
			}),
		}));

		// Create second component using the same contract but different styling
		const SecondaryButton = cls(buttonContract, ({ what, def }) => ({
			token: def.token({
				"bg.primary": what.css([
					"bg-gray-500",
				]),
				"text.primary": what.css([
					"text-gray-900",
				]),
			}),
			rules: [
				def.root({
					root: what.token([
						"bg.primary",
						"text.primary",
					]),
				}),
			],
			defaults: def.defaults({
				variant: "secondary",
			}),
		}));

		// Test both components work correctly
		expect(PrimaryButton).toBeDefined();
		expect(SecondaryButton).toBeDefined();
		expect(PrimaryButton.contract).toBe(buttonContract);
		expect(SecondaryButton.contract).toBe(buttonContract);

		// Test styling differences
		const primaryInstance = PrimaryButton.create();
		const secondaryInstance = SecondaryButton.create();

		expect(primaryInstance.root()).toContain("bg-blue-500");
		expect(secondaryInstance.root()).toContain("bg-gray-500");
	});

	it("should allow using definition(contract) builder chain", () => {
		// Build a contract using the contract builder
		const myContract = contract()
			.tokens([
				"color.bg.primary",
				"color.text.primary",
			])
			.slots([
				"root",
				"content",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();

		// Use the built contract with the definition builder chain
		expect(() => {
			const Component = definition(myContract)
				.token({
					"color.bg.primary": {
						class: [
							"bg-purple-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
				})
				.root({
					root: {
						token: [
							"color.bg.primary",
							"color.text.primary",
						],
					},
				})
				.rule(
					{
						size: "sm",
					},
					{
						root: {
							class: [
								"px-1",
								"py-0.5",
							],
						},
					},
				)
				.defaults({
					size: "md",
					tone: "light",
				})
				.cls();

			expect(Component).toBeDefined();
			expect(Component.contract).toBe(myContract);

			// Test that the CLS instance works correctly
			const instance = Component.create();
			expect(instance.root()).toContain("bg-purple-600");
			expect(instance.root()).toContain("text-white");

			// Test variant functionality
			const smallInstance = Component.create(({ what }) => ({
				variant: what.variant({
					size: "sm",
				}),
			}));
			expect(smallInstance.root()).toContain("px-1 py-0.5");
		}).not.toThrow();
	});

	it("should allow reusing the same contract with definition builder", () => {
		// Build a reusable contract
		const sharedContract = contract()
			.tokens([
				"bg.main",
				"text.main",
			])
			.slots([
				"root",
			])
			.variant("theme", [
				"primary",
				"secondary",
			])
			.build();

		// Create first component using definition builder
		const Component1 = definition(sharedContract)
			.token({
				"bg.main": {
					class: [
						"bg-green-500",
					],
				},
				"text.main": {
					class: [
						"text-white",
					],
				},
			})
			.root({
				root: {
					token: [
						"bg.main",
						"text.main",
					],
				},
			})
			.defaults({
				theme: "primary",
			})
			.cls();

		// Create second component using the same contract
		const Component2 = definition(sharedContract)
			.token({
				"bg.main": {
					class: [
						"bg-orange-500",
					],
				},
				"text.main": {
					class: [
						"text-black",
					],
				},
			})
			.root({
				root: {
					token: [
						"bg.main",
						"text.main",
					],
				},
			})
			.defaults({
				theme: "secondary",
			})
			.cls();

		// Test both components work correctly
		expect(Component1).toBeDefined();
		expect(Component2).toBeDefined();
		expect(Component1.contract).toBe(sharedContract);
		expect(Component2.contract).toBe(sharedContract);

		// Test styling differences
		const instance1 = Component1.create();
		const instance2 = Component2.create();

		expect(instance1.root()).toContain("bg-green-500");
		expect(instance2.root()).toContain("bg-orange-500");
	});
});
