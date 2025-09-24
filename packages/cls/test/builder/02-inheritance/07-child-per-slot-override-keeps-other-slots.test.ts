import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-per-slot-override-keeps-other-slots", () => {
	it("per-slot local override clears only that slot", () => {
		const baseContract = contract()
			.slots([
				"root",
				"icon",
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
				icon: {
					class: [
						"icon-base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"base-sm",
					],
				},
				icon: {
					class: [
						"icon-sm",
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
				icon: {
					class: [
						"icon-child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = childButton.create(undefined, {
			slot: {
				root: {
					class: [
						"ROOT-OVERRIDE",
					],
					override: true,
				},
			},
		});
		expect(created.slots.root()).toBe("ROOT-OVERRIDE");
		expect(created.slots.icon()).toBe("icon-base icon-sm icon-child");
	});
});
