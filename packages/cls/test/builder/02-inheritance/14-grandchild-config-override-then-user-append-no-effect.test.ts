import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-config-override-then-user-append-no-effect", () => {
	it("user slot append after config override has no effect on that slot", () => {
		const baseC = contract()
			.slots([
				"root",
			])
			.bool("on")
			.build();
		const base = definition(baseC)
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

		const childC = contract(base.contract).build();
		const child = definition(childC)
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

		const grandC = contract(child.contract).build();
		const grand = definition(grandC)
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

		const created = grand.create(
			{
				slot: {
					root: {
						class: [
							"USER",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONF",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("base child grand CONF");
	});
});
