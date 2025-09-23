import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-per-slot-override-keeps-other-slots", () => {
	it("child override on root keeps icon intact; config/user appends still apply", () => {
		const $base = cls(
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
						},
					},
					{
						slot: {
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						override: true,
						slot: {
							root: {
								class: [
									"ROOT-OVR",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $child.create(
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
							"config",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("ROOT-OVR user config");
		expect(slots.icon()).toBe("icon-base");
	});
});
