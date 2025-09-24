import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-multi-slots-order-and-config-user", () => {
	it("maintains per-slot order base→child→grandchild then config→user", () => {
		const baseButtonCls = cls(
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
									"root-base",
								],
							},
							icon: {
								class: [
									"icon-base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const childButtonCls = baseButtonCls.extend(
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
									"root-child",
								],
							},
							icon: {
								class: [
									"icon-child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const grandchildButtonCls = childButtonCls.extend(
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
									"root-grand",
								],
							},
							icon: {
								class: [
									"icon-grand",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = grandchildButtonCls.create(
			{
				slot: {
					root: {
						class: [
							"user-root",
						],
					},
					icon: {
						class: [
							"user-icon",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"config-root",
						],
					},
					icon: {
						class: [
							"config-icon",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe(
			"root-base root-child root-grand user-root config-root",
		);
		expect(slots.icon()).toBe(
			"icon-base icon-child icon-grand user-icon config-icon",
		);
	});
});
