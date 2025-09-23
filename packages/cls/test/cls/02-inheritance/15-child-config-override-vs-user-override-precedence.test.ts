import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-config-override-vs-user-override-precedence", () => {
	it("user local override wins over child config override", () => {
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
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create(undefined, {
			slot: {
				root: {
					class: [
						"CONF-OVR",
					],
					override: true,
				},
			},
		});

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
