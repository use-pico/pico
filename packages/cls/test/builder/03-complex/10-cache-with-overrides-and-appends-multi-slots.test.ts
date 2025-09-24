import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/cache-with-overrides-and-appends-multi-slots", () => {
	it("returns identical output for identical complex tweaks across slots", () => {
		const buttonCls = definition(
			contract()
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.root({
				root: {
					class: [
						"root-base",
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
			.cls();

		const firstResult = buttonCls.create(
			{
				slot: {
					icon: {
						class: [
							"ICON-USER",
						],
					},
				},
			},
			{
				slot: {
					label: {
						class: [
							"LABEL-CONFIG",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"ROOT-OVERRIDE",
						],
					},
				},
			},
		);
		const secondResult = buttonCls.create(
			{
				slot: {
					icon: {
						class: [
							"ICON-USER",
						],
					},
				},
			},
			{
				slot: {
					label: {
						class: [
							"LABEL-CONFIG",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"ROOT-OVERRIDE",
						],
					},
				},
			},
		);
		expect(firstResult.slots.root()).toBe(secondResult.slots.root());
		expect(firstResult.slots.icon()).toBe(secondResult.slots.icon());
		expect(firstResult.slots.label()).toBe(secondResult.slots.label());
	});
});
