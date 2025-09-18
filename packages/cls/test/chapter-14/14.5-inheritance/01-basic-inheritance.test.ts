import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";

describe("14.5 Inheritance - Basic Inheritance", () => {
	it("should support inheritance from parent CLS instance", () => {
		// Create a parent CLS instance
		const ParentCls = cls(
			{
				tokens: [
					"color.primary",
					"color.secondary",
				],
				slot: [
					"root",
				],
				variant: {
					tone: [
						"light",
						"dark",
					],
				},
			},
			({ def, what }) => ({
				token: def.token({
					"color.primary": what.css([
						"text-blue-500",
					]),
					"color.secondary": what.css([
						"text-gray-500",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.primary",
						]),
					}),
				],
				defaults: def.defaults({
					tone: "light",
				}),
			}),
		);

		// Create a child contract that inherits from parent
		const childContract = contract(ParentCls.contract)
			.tokens([
				"spacing.sm",
				"spacing.md",
			])
			.slots([
				"content",
				"footer",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.build();

		// Verify child contract only contains direct properties
		expect(childContract.tokens).toEqual([
			"spacing.sm",
			"spacing.md",
		]);

		expect(childContract.slot).toEqual([
			"content",
			"footer",
		]);

		expect(childContract.variant).toEqual({
			size: [
				"sm",
				"md",
				"lg",
			],
		});

		// Verify inheritance chain is set up
		expect((childContract as any)["~use"]).toBe(ParentCls.contract);

		// Test that the child contract can be used with cls()
		// Only define direct tokens, inherited tokens are handled by CLS system
		const ChildCls = cls(childContract, ({ def, what }) => ({
			token: def.token({
				"spacing.sm": what.css([
					"p-2",
				]),
				"spacing.md": what.css([
					"p-4",
				]),
			}),
			rules: [
				def.root({
					content: what.token([
						"spacing.sm",
					]),
				}),
			],
			defaults: def.defaults({
				size: "md",
			}),
		}));

		expect(ChildCls).toBeDefined();
		expect(ChildCls.contract).toBe(childContract);

		// Test that the direct styling works
		const instance = ChildCls.create();
		expect(instance.content()).toContain("p-2");
	});
});
