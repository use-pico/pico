import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-config-override-then-user-append-no-effect", () => {
	it("user slot append after config override has no effect on that slot", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.bool("on")
			.build();
		const baseButton = definition(baseContract)
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.defaults({
				on: true,
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
				on: true,
			})
			.cls();

		const grandchildContract = contract(childButton.contract).build();
		const grandchildButton = definition(grandchildContract)
			.root({
				root: {
					class: [
						"grand",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = grandchildButton.create(
			{
				slot: {
					root: {
						class: [
							"USER-APPEND",
						],
					},
				},
			},
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
		);
		expect(created.slots.root()).toBe("CONFIG-OVERRIDE");
	});
});
