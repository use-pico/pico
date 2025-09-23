import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/per-slot-config-override-and-config-append-on-other", () => {
	it("config override on root; config append on icon; user appends both", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
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
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create(
			{
				slot: {
					root: {
						class: [
							"UR",
						],
					},
					icon: {
						class: [
							"UI",
						],
					},
				},
			},
			{
				override: {
					root: {
						class: [
							"CR",
						],
					},
				},
				slot: {
					icon: {
						class: [
							"CI",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("CR");
		expect(slots.icon()).toBe("i UI");
	});
});
