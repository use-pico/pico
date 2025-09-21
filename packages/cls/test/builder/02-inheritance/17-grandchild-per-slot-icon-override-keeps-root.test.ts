import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-per-slot-icon-override-keeps-root", () => {
	it("per-slot override on icon keeps root slot output", () => {
		const baseC = contract()
			.slots([
				"root",
				"icon",
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
			.cls();

		const created = grand.create(undefined, {
			override: {
				icon: {
					class: [
						"I-OVR",
					],
				},
			},
		});
		expect(created.slots.root()).toBe("base child grand");
		expect(created.slots.icon()).toBe("I-OVR");
	});
});
