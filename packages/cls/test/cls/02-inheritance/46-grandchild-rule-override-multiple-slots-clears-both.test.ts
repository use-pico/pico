import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-rule-override-multiple-slots-clears-both", () => {
	it("override rule on root+icon clears both, then config/user append", () => {
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
									"OVR-R",
								],
							},
							icon: {
								class: [
									"OVR-I",
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

		expect(slots.root()).toBe("OVR-R conf-root u-root");
		expect(slots.icon()).toBe("OVR-I conf-icon u-icon");
	});
});
