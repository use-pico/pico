import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/per-slot-local-override-independence", () => {
	it("local override on one slot does not affect other slots", () => {
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
									"root-base",
								],
							},
							icon: {
								class: [
									"icon-base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("icon-base");

		expect(
			slots.root({
				override: {
					root: {
						class: [
							"ROOT-OVR",
						],
					},
				},
			}),
		).toBe("ROOT-OVR");

		// icon remains unaffected
		expect(slots.icon()).toBe("icon-base");
	});
});
