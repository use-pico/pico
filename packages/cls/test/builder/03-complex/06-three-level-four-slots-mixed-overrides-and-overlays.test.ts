import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/three-level-four-slots-mixed-overrides-and-overlays", () => {
	it("handles mixed per-slot overrides and dual overlays across four slots", () => {
		const baseButton = definition(
			contract()
				.tokens([
					"primary",
					"secondary",
					"tertiary",
				])
				.slots([
					"root",
					"icon",
					"label",
					"badge",
				])
				.variant("size", [
					"sm",
					"md",
				])
				.build(),
		)
			.token({
				tertiary: {
					class: [
						"tertiary-styles",
					],
				},
				secondary: {
					token: [
						"tertiary",
					],
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
						"root-base",
					],
				},
				icon: {
					token: [
						"primary",
					],
					class: [
						"icon-base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
				badge: {
					class: [
						"badge-base",
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
			})
			.cls();

		const childButton = definition(contract(baseButton.contract).build())
			.root({
				root: {
					class: [
						"root-child",
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
				badge: {
					class: [
						"badge-child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const grandchildButton = definition(
			contract(childButton.contract).build(),
		)
			.root({
				root: {
					class: [
						"root-grandchild",
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
				badge: {
					class: [
						"badge-grandchild",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = grandchildButton.create(
			{
				token: {
					secondary: {
						class: [
							"USER-SECONDARY",
						],
					},
				},
				slot: {
					badge: {
						class: [
							"USER-BADGE",
						],
					},
				},
			},
			{
				token: {
					primary: {
						class: [
							"CONFIG-PRIMARY",
						],
					},
				},
				override: true,
				slot: {
					label: {
						class: [
							"LABEL-OVERRIDE",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe(
			"CONFIG-PRIMARY root-base root-child root-grandchild",
		);
		expect(created.slots.icon()).toBe(
			"CONFIG-PRIMARY icon-base icon-child icon-grandchild",
		);
		expect(created.slots.label()).toBe(
			"label-base label-child label-grandchild LABEL-OVERRIDE",
		);
		expect(created.slots.badge()).toBe(
			"badge-base badge-child badge-grandchild USER-BADGE",
		);
	});
});
