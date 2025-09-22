import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/rule-override-multi-slots-and-user-appends-after", () => {
	it("override clears root+label; user appends still apply; icon unaffected", () => {
		const $c = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					alert: [
						"off",
						"on",
					],
					tone: [
						"light",
						"dark",
					],
				},
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
							label: {
								class: [
									"l-base",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"r-dark",
								],
							},
							icon: {
								class: [
									"i-dark",
								],
							},
							label: {
								class: [
									"l-dark",
								],
							},
						},
					},
					{
						match: {
							alert: "on",
						},
						override: true,
						slot: {
							root: {
								class: [
									"R-OVR",
								],
							},
							label: {
								class: [
									"L-OVR",
								],
							},
						},
					},
				],
				defaults: {
					alert: "on",
					tone: "dark",
				},
			},
		);

		const { slots } = $c.create({
			slot: {
				root: {
					class: [
						"USER-R",
					],
				},
				label: {
					class: [
						"USER-L",
					],
				},
			},
		});
		expect(slots.root()).toBe("R-OVR USER-R");
		expect(slots.label()).toBe("L-OVR USER-L");
		expect(slots.icon()).toBe("i-base i-dark");
	});
});
