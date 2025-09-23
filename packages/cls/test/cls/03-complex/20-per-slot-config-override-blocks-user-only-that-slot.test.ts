import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/per-slot-config-override-blocks-user-only-that-slot", () => {
	it("config override on root blocks user append on root; icon user still applies", () => {
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
									"r-base",
								],
							},
							icon: {
								class: [
									"i-base",
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
							"USER-R",
						],
					},
					icon: {
						class: [
							"USER-I",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONF-OVR",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("r-base CONF-OVR");
		expect(slots.icon()).toBe("i-base USER-I");
	});
});
