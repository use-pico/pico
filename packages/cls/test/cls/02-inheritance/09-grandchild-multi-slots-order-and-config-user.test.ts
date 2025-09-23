import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/grandchild-multi-slots-order-and-config-user", () => {
	it("maintains per-slot order base→child→grandchild then config→user", () => {
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

		const $child = $base.extend(
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

		const $grand = $child.extend(
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

		const { slots } = $grand.create(
			tweaks([
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
			]),
		);

		expect(slots.root()).toBe("root-base root-child root-grand user-root");
		expect(slots.icon()).toBe("icon-base icon-child icon-grand user-icon");
	});
});
