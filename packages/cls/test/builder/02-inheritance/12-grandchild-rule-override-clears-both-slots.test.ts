import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-rule-override-clears-both-slots", () => {
	it("grandchild rule with override clears both slots output", () => {
		const baseContract = contract()
			.slots([
				"root",
				"icon",
			])
			.variant("tone", [
				"light",
				"dark",
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
			.match("tone", "light", {
				root: {
					class: [
						"base-light",
					],
				},
				icon: {
					class: [
						"icon-light",
					],
				},
			})
			.defaults({
				tone: "light",
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
				tone: "light",
			})
			.cls();

		const grandchildContract = contract(childButton.contract).build();
		const grandchildButton = definition(grandchildContract)
			.root({
				root: {
					class: [
						"grandchild",
					],
				},
				icon: {
					class: [
						"icon-grandchild",
					],
				},
			})
			.match(
				"tone",
				"light",
				{
					root: {
						class: [
							"GRANDCHILD-OVERRIDE",
						],
					},
					icon: {
						class: [
							"ICON-OVERRIDE",
						],
					},
				},
				true,
			)
			.defaults({
				tone: "light",
			})
			.cls();

		const created = grandchildButton.create();
		expect(created.slots.root()).toBe("GRANDCHILD-OVERRIDE");
		expect(created.slots.icon()).toBe("ICON-OVERRIDE");
	});
});
