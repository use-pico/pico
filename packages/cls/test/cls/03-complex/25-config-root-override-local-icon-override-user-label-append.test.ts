import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/config-root-override-local-icon-override-user-label-append", () => {
	it("config overrides root; local overrides icon; user appends label", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
					"label",
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
							label: {
								class: [
									"l-base",
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
					label: {
						class: [
							"USER-L",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONF-R",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("r-base CONF-R");
		expect(
			slots.icon({
				override: true,
				slot: {
					icon: {
						class: [
							"LOCAL-I",
						],
					},
				},
			}),
		).toBe("i-base LOCAL-I");
		expect(slots.label()).toBe("l-base USER-L");
	});
});
