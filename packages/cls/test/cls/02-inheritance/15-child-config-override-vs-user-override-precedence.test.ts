import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

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

		const { slots } = $child.create(
			tweak([
				undefined,
				{
					override: {
						root: {
							class: [
								"CONF-OVR",
							],
						},
					},
				},
			]),
		);

		expect(
			slots.root({
				override: {
					root: {
						class: [
							"USER-OVR",
						],
					},
				},
			}),
		).toBe("USER-OVR");
	});
});
