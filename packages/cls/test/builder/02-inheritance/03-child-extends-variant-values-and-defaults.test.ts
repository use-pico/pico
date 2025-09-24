import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-extends-variant-values-and-defaults", () => {
	it("child extends variant values and provides defaults", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
			])
			.build();
		const baseButton = definition(baseContract)
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"base-sm",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(baseButton.contract)
			.variant("size", [
				"md",
			])
			.build();
		const childButton = definition(childContract)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"child-md",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		const created = childButton.create();
		expect(created.slots.root()).toBe("base child child-md");
	});
});
