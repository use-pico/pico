import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/user-override-ignores-config-slot-append", () => {
	it("user override replaces result even if config adds slot classes", () => {
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
			tweak([
				undefined,
				{
					slot: {
						root: {
							class: [
								"config",
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
