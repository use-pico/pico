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
				slot: {
					root: {
						class: [
							"OVERRIDE",
						],
						override: true,
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

		expect(slots.root()).toBe("OVERRIDE config");
	});
});
