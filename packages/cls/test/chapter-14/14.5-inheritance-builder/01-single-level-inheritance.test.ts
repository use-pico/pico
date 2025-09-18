import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.5 Inheritance Builder - Single Level", () => {
	it("should handle single level inheritance from parent with tokens and variants", () => {
		// Create parent contract with basic functionality
		const ParentCls = contract()
			.tokens([
				"color.base",
			])
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.def()
			.token({
				"color.base": {
					class: [
						"text-gray-800",
					],
				},
			})
			.root({
				root: {
					token: [
						"color.base",
					],
					class: [
						"border",
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
							"p-2",
						],
					},
				},
			)
			.defaults({
				size: "md",
			})
			.cls();

		// Create child contract that inherits from parent
		const ChildCls = contract(ParentCls.contract)
			.tokens([
				"color.accent",
			])
			.variant("style", [
				"solid",
				"outline",
			])
			.def()
			.token({
				"color.accent": {
					class: [
						"text-blue-500",
					],
				},
			})
			.rule(
				{
					style: "solid",
				},
				{
					root: {
						token: [
							"color.accent",
						],
						class: [
							"bg-blue-50",
						],
					},
				},
			)
			.defaults({
				size: "md", // Inherited
				style: "solid", // New
			})
			.cls();

		// Test parent functionality
		const parentSlots = ParentCls.create();
		expect(parentSlots.root()).toBe("text-gray-800 border");

		// Test parent with size variant
		const parentSmall = ParentCls.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(parentSmall.root()).toBe("text-gray-800 border p-2");

		// Test child functionality (inherits parent + adds new)
		const childSlots = ChildCls.create();
		expect(childSlots.root()).toBe("border text-blue-500 bg-blue-50");

		// Test child with inherited variant
		const childSmall = ChildCls.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(childSmall.root()).toBe("border p-2 text-blue-500 bg-blue-50");

		// Test child with new variant
		const childOutline = ChildCls.create(({ what }) => ({
			variant: what.variant({
				style: "outline",
			}),
		}));
		expect(childOutline.root()).toBe("text-gray-800 border");

		// Verify contracts are properly typed
		expect(ParentCls.contract).toBeDefined();
		expect(ChildCls.contract).toBeDefined();
		expect(ChildCls.contract["~use"]).toBe(ParentCls.contract);
	});
});
