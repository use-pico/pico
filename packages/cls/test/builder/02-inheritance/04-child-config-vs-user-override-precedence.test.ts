import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-config-vs-user-override-precedence", () => {
	it("user override wins over config override in create()", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
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
			.match("size", "md", {
				root: {
					class: [
						"b-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(base.contract).build();
		const child = definition(childContract)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = child.create(
			{
				slot: {
					root: {
						class: [
							"CONF",
						],
						override: true,
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"USER",
						],
						override: true,
					},
				},
			},
		);
		expect(created.slots.root()).toBe("USER");
	});
});
