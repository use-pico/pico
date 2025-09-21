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
		const base = definition(baseContract)
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
						"b-sm",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(base.contract)
			.variant("size", [
				"md",
			])
			.build();
		const child = definition(childContract)
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
						"c-md",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		const created = child.create();
		expect(created.slots.root()).toBe("base child c-md");
	});
});
