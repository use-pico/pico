import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/grandchild-multi-slots-config-and-user-order", () => {
	it("applies base, child, grandchild rules then config then user in order", () => {
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
			.defaults({
				tone: "light",
			})
			.cls();

		const created = grandchildButton.create(
			{
				slot: {
					root: {
						class: [
							"USER-APPEND",
						],
					},
					icon: {
						class: [
							"ICON-USER-APPEND",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"CONFIG-APPEND",
						],
					},
					icon: {
						class: [
							"ICON-CONFIG-APPEND",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe(
			"base base-light child grandchild USER-APPEND CONFIG-APPEND",
		);
		expect(created.slots.icon()).toBe(
			"icon-base icon-light icon-child icon-grandchild ICON-USER-APPEND ICON-CONFIG-APPEND",
		);
	});
});
