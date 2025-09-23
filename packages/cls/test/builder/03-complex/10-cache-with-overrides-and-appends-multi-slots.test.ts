import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/cache-with-overrides-and-appends-multi-slots", () => {
	it("returns identical output for identical complex tweaks across slots", () => {
		const $cls = definition(
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
						"r",
					],
				},
				icon: {
					class: [
						"i",
					],
				},
				label: {
					class: [
						"l",
					],
				},
			})
			.cls();

		const a = $cls.create(
			{
				override: true,
				slot: {
					root: {
						class: [
							"R-OVR",
						],
					},
				},
			},
			{
				slot: {
					icon: {
						class: [
							"I-U",
						],
					},
				},
			},
			{
				slot: {
					label: {
						class: [
							"L-C",
						],
					},
				},
			},
		);
		const b = $cls.create(
			{
				override: true,
				slot: {
					root: {
						class: [
							"R-OVR",
						],
					},
				},
			},
			{
				slot: {
					icon: {
						class: [
							"I-U",
						],
					},
				},
			},
			{
				slot: {
					label: {
						class: [
							"L-C",
						],
					},
				},
			},
		);
		expect(a.slots.root()).toBe(b.slots.root());
		expect(a.slots.icon()).toBe(b.slots.icon());
		expect(a.slots.label()).toBe(b.slots.label());
	});
});
