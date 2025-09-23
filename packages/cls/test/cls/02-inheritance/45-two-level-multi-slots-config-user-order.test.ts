import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/two-level-multi-slots-config-user-order", () => {
	it("root and icon accumulate base→child then config→user", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
									"b-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								class: [
									"b-icon",
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
									"c-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								class: [
									"c-icon",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $child.create(
			{
				slot: {
					root: {
						class: [
							"u-root",
						],
					},
					icon: {
						class: [
							"u-icon",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"conf-root",
						],
					},
					icon: {
						class: [
							"conf-icon",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("b-root c-root u-root");
		expect(slots.icon()).toBe("b-icon c-icon u-icon");
	});
});
