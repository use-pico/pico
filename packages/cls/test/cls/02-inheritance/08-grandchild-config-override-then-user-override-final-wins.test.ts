import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-config-override-then-user-override-final-wins", () => {
	it("in 3-level chain, local user override wins over config override", () => {
		const $base = cls(
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

		const $child = $base.extend(
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
									"child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $grand.create(undefined, {
			slot: {
				root: {
					class: [
						"CONF-OVR",
					],
					override: true,
				},
			},
		});

		// local user override wins
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"USER-OVR",
						],
						override: true,
					},
				},
			}),
		).toBe("USER-OVR");
	});
});
