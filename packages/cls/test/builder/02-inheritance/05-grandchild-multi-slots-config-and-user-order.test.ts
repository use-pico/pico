import { describe, expect, it } from "vitest";
import { contract, definition, tweaks } from "../../../src";

describe("builder-inheritance/grandchild-multi-slots-config-and-user-order", () => {
	it("applies base, child, grandchild rules then config then user in order", () => {
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
			.defaults({
				tone: "light",
			})
			.cls();

		const created = grand.create(
			tweaks([
				{
					slot: {
						root: {
							class: [
								"USER",
							],
						},
						icon: {
							class: [
								"I-USER",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"CONF",
							],
						},
						icon: {
							class: [
								"I-CONF",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("base b-light child grand USER");
		expect(created.slots.icon()).toBe(
			"i-base i-light i-child i-grand I-USER",
		);
	});
});
