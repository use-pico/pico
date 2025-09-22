import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/child-config-token-wins-over-base-user-slot-appends-order", () => {
	it("config token applies before base classes; slot order base→child→conf→user", () => {
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
				token: {},
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

		const { slots } = $child.create(
			tweak([
				{
					slot: {
						root: {
							class: [
								"u",
							],
						},
					},
				},
				{
					token: {
						t: {
							class: [
								"conf-t",
							],
						},
					},
					slot: {
						root: {
							class: [
								"conf",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("conf-t b c u");
	});
});
