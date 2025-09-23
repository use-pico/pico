import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-three-level-chain-merge-and-precedence", () => {
	it("merges base→child→grandchild with correct precedence and orders", () => {
		const $base = cls(
			{
				tokens: [
					"color.text",
				],
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
				token: {
					"color.text": {
						class: [
							"text-red-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.text",
								],
								class: [
									"base",
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
									"md",
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
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
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
				defaults: {
					size: "sm",
				},
			},
		);

		const $grandchild = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-green-500",
						],
					},
				},
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
					size: "md",
				},
			},
		);

		const { slots } = $grandchild.create(
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

		// Token resolved from grandchild (text-green-500), then base, base md rule, child extra class, grandchild g-md, then config then user
		expect(slots.root()).toBe("text-green-500 base md child g-md user");
	});
});
