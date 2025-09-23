import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/three-level-user-token-wins-over-config-with-local-override", () => {
	it("user token beats config token; local override replaces all", () => {
		const $base = cls(
			{
				tokens: [
					"t",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"b-t",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t",
								],
								class: [
									"b",
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
				token: {
					t: {
						class: [
							"c-t",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"c",
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
				token: {
					t: {
						class: [
							"g-t",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"g",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create(
			{
				token: {
					t: {
						class: [
							"user",
						],
					},
				},
			},
			{
				token: {
					t: {
						class: [
							"conf",
						],
					},
				},
			},
		);
		expect(slots.root()).toBe("user conf b c g");
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"LOCAL",
						],
						override: true,
					},
				},
			}),
		).toBe("LOCAL");
	});
});
