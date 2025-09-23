import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/three-level-multi-matching-rules-no-override-order", () => {
	it("appends in order base→child→grand then config→user for md", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
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
									"b",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"b-md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
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
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"c-md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
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
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"g-md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = $grand.create(
			tweaks([
				{
					variant: {
						size: "md",
					},
					slot: {
						root: {
							class: [
								"u",
							],
						},
					},
				},
				{
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
		expect(slots.root()).toBe("b b-md c-md g-md u");
	});
});
