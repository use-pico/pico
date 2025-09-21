import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-adds-bool-variant-default-and-undefined", () => {
	it("child adds bool variant with defaults; undefined keeps default", () => {
		const baseC = contract()
			.slots([
				"root",
			])
			.build();
		const base = definition(baseC)
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.cls();

		const childC = contract(base.contract).bool("on").build();
		const child = definition(childC)
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
						"on-root",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = child.create({
			variant: {
				on: undefined,
			},
		});
		expect(created.slots.root()).toBe("base child on-root");
	});
});
