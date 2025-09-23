import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-override-then-config-slot-append-no-effect", () => {
	it("slot class in config has no effect after config override", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
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
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create(
			undefined,
			{
				override: true,
				slot: {
					root: {
						class: [
							"OVR",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("base OVR config");
	});
});
