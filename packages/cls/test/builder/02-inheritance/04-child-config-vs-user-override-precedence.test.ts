import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-config-vs-user-override-precedence", () => {
	it("user override completely replaces config override in create()", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
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
			.match("size", "md", {
				root: {
					class: [
						"base-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(baseButton.contract).build();
		const childButton = definition(childContract)
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

		const created = childButton.create(
			{
				slot: {
					root: {
						class: [
							"CONFIG-OVERRIDE",
						],
						override: true,
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"USER-OVERRIDE",
						],
						override: true,
					},
				},
			},
		);
		expect(created.slots.root()).toBe("USER-OVERRIDE");
	});
});
