import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

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
				override: true,
				slot: {
					root: {
						class: [
							"ROOT-OVR",
						],
					},
				},
			}),
		).toBe("root-base ROOT-OVR");

		// icon remains unaffected
		expect(slots.icon()).toBe("icon-base");
	});
});
