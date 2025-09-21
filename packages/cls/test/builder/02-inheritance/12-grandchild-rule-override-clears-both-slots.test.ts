import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-rule-override-clears-both-slots", () => {
	it("grandchild rule with override clears both slots output", () => {
		const baseC = contract()
			.slots([
				"root",
				"icon",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();
		const base = definition(baseC)
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i-base",
					],
				},
			})
			.match("tone", "light", {
				root: {
					class: [
						"b-light",
					],
				},
				icon: {
					class: [
						"i-light",
					],
				},
			})
			.defaults({
				tone: "light",
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
				icon: {
					class: [
						"i-child",
					],
				},
			})
			.defaults({
				tone: "light",
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
				icon: {
					class: [
						"i-grand",
					],
				},
			})
			.match(
				"tone",
				"light",
				{
					root: {
						class: [
							"GR-OVR",
						],
					},
					icon: {
						class: [
							"I-OVR",
						],
					},
				},
				true,
			)
			.defaults({
				tone: "light",
			})
			.cls();

		const created = grand.create();
		expect(created.slots.root()).toBe("GR-OVR");
		expect(created.slots.icon()).toBe("I-OVR");
	});
});
