import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder-inheritance/child-extends-slots-adds-icon", () => {
	it("child adds icon slot and rules apply across both", () => {
		const baseButton = contract()
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

		const childButton = contract(baseButton.contract)
			.slots([
				"icon",
			])
			.def()
			.root({
				icon: {
					class: [
						"icon",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = childButton.create();
		expect(created.slots.root()).toBe("base");
		expect(created.slots.icon()).toBe("icon");
	});
});
