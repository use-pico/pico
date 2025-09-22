import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

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
			tweak([
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
					override: {
						root: {
							class: [
								"CONF-R",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("CONF-R");
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"LOCAL-I",
						],
					},
				},
			}),
		).toBe("LOCAL-I");
		expect(slots.label()).toBe("l-base USER-L");
	});
});
