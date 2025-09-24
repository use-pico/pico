import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-per-slot-icon-override-keeps-root", () => {
	it("per-slot override on icon keeps root slot output", () => {
		const baseContract = contract()
			.slots([
				"root",
				"icon",
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
			.cls();

		const grandchildContract = contract(childButton.contract).build();
		const grandchildButton = definition(grandchildContract)
			.root({
				root: {
					class: [
						"grand",
					],
				},
				icon: {
					class: [
						"icon-grandchild",
					],
				},
			})
			.cls();

		const created = grandchildButton.create(undefined, {
			slot: {
				icon: {
					class: [
						"ICON-OVERRIDE",
					],
					override: true,
				},
			},
		});
		expect(created.slots.root()).toBe("base child grandchild");
		expect(created.slots.icon()).toBe("ICON-OVERRIDE");
	});
});
