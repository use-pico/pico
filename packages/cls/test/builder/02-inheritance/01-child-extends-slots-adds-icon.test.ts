import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder-inheritance/child-extends-slots-adds-icon", () => {
	it("child adds icon slot and rules apply across both", () => {
		const base = contract()
			.slots([
				"root",
			])
			.bool("on")
			.def()
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

		const child = contract(base.contract)
			.slots([
				"icon",
			])
			.def()
			.root({
				icon: {
					class: [
						"i",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = child.create();
		expect(created.slots.root()).toBe("base");
		expect(created.slots.icon()).toBe("i");
	});
});
