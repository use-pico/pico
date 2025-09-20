import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/rule-level-per-slot-override-interacts-with-user-appends", () => {
	it("rule override on root clears previous root; user appends after override; other slots unaffected", () => {
		const $c = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {
					a: [
						"x",
						"y",
					],
					b: [
						"u",
						"v",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							a: "x",
						},
						slot: {
							root: {
								class: [
									"r-a-x",
								],
							},
							icon: {
								class: [
									"i-a-x",
								],
							},
						},
					},
					{
						match: {
							b: "u",
						},
						slot: {
							root: {
								class: [
									"r-b-u",
								],
							},
							icon: {
								class: [
									"i-b-u",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
							icon: {
								class: [
									"i-base",
								],
							},
						},
					},
					{
						match: {
							a: "x",
							b: "u",
						},
						override: true,
						slot: {
							root: {
								class: [
									"OVR",
								],
							},
						},
					},
				],
				defaults: {
					a: "x",
					b: "u",
				},
			},
		);

		const { slots } = $c.create({
			slot: {
				root: {
					class: [
						"USER",
					],
				},
			},
		});
		// root: rules r-a-x, r-b-u, base, then override clears and sets OVR, then user appends after
		expect(slots.root()).toBe("OVR USER");
		// icon unaffected by root override
		expect(slots.icon()).toBe("i-a-x i-b-u i-base");
	});
});
