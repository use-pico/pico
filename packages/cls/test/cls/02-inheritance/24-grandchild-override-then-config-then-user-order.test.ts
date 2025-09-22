import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/grandchild-override-then-config-then-user-order", () => {
	it("override clears, then config appends, then user appends last", () => {
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
				defaults: {},
			},
		);

		const { slots } = $grand.create(
			tweak([
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
			]),
		);

		expect(slots.root()).toBe("OVR config user");
	});
});
