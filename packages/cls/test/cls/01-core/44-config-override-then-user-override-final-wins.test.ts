import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-override-then-user-override-final-wins", () => {
	it("user override applied at call time replaces earlier config override", () => {
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

		const { slots } = $cls.create(undefined, {
			override: true,
			slot: {
				root: {
					class: [
						"CONF-OVR",
					],
				},
			},
		});

		// local user override wins over prior config override
		expect(
			slots.root({
				override: true,
				slot: {
					root: {
						class: [
							"USER-OVR",
						],
					},
				},
			}),
		).toBe("base CONF-OVR USER-OVR");
	});
});
