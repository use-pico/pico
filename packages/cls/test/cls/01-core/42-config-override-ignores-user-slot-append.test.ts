import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-override-ignores-user-slot-append", () => {
	it("config override replaces result even if user adds slot classes", () => {
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
			{
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"CONF-OVR",
						],
						override: true,
					},
				},
			},
		);

		expect(slots.root()).toBe("CONF-OVR");
	});
});
