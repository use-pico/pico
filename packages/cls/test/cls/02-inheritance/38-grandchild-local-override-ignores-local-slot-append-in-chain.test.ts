import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-local-override-ignores-local-slot-append-in-chain", () => {
	it("local override replaces all classes even if local slot append provided", () => {
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
				rules: [
					{
						slot: {
							root: {
								class: [
									"child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"grand",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create();
		expect(
			slots.root({
				override: {
					root: {
						class: [
							"OVR",
						],
					},
				},
				slot: {
					root: {
						class: [
							"ignored",
						],
					},
				},
			}),
		).toBe("OVR");
	});
});
