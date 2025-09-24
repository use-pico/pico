import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-adds-bool-variant-default-and-undefined", () => {
	it("child adds bool variant with defaults; undefined keeps default", () => {
		const baseContract = contract()
			.slots([
				"root",
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
			.cls();

		const childContract = contract(baseButton.contract).bool("on").build();
		const childButton = definition(childContract)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.match("on", true, {
				root: {
					class: [
						"on-enabled",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = childButton.create({
			variant: {
				on: undefined,
			},
		});
		expect(created.slots.root()).toBe("base child on-enabled");
	});
});
