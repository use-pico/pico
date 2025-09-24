import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/three-level-many-rules-per-slot-overrides", () => {
	it("applies multi-rules across slots with per-slot overrides through inheritance", () => {
		const baseContract = contract()
			.tokens([
				"primary",
				"secondary",
			])
			.slots([
				"root",
				"icon",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();
		const baseButton = definition(baseContract)
			.token({
				secondary: {
					class: [
						"secondary-styles",
					],
				},
				primary: {
					token: [
						"secondary",
					],
					class: [
						"primary-styles",
					],
				},
			})
			.root({
				root: {
					token: [
						"primary",
					],
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"root-sm",
					],
				},
				icon: {
					class: [
						"icon-sm",
					],
				},
			})
			.match("tone", "dark", {
				root: {
					class: [
						"root-dark",
					],
				},
				label: {
					class: [
						"label-dark",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const childButton = definition(
			contract(baseButton.contract)
				.variant("tone", [
					"sepia",
				])
				.build(),
		)
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
				label: {
					class: [
						"label-child",
					],
				},
			})
			.match("tone", "sepia", {
				label: {
					class: [
						"label-sepia",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const grandchildButton = definition(
			contract(childButton.contract).build(),
		)
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
				label: {
					class: [
						"label-grandchild",
					],
				},
			})
			.match("size", "md", {
				icon: {
					class: [
						"icon-md",
					],
				},
				label: {
					class: [
						"label-md",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const created = grandchildButton.create({
			variant: {
				size: "md",
				tone: "dark",
			},
		});
		expect(created.slots.root()).toBe(
			"secondary-styles primary-styles base root-dark child grandchild",
		);
		expect(created.slots.icon()).toBe(
			"icon-base icon-child icon-grandchild icon-md",
		);
		expect(created.slots.label()).toBe(
			"label-base label-dark label-child label-grandchild label-md",
		);

		const withOverrides = grandchildButton.create(
			{
				override: true,
				slot: {
					label: {
						class: [
							"LABEL-OVERRIDE",
						],
					},
					icon: {
						class: [
							"ICON-USER",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					icon: {
						class: [
							"ICON-OVERRIDE",
						],
					},
				},
			},
		);
		expect(withOverrides.slots.root()).toBe(
			"secondary-styles primary-styles base root-sm child grandchild",
		);
		expect(withOverrides.slots.icon()).toBe(
			"icon-base icon-sm icon-child icon-grandchild ICON-OVERRIDE",
		);
		expect(withOverrides.slots.label()).toBe(
			"label-base label-child label-grandchild LABEL-OVERRIDE",
		);
	});
});
