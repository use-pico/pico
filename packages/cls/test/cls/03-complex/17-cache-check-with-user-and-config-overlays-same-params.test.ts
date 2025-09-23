import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/complex/cache-check-with-user-and-config-overlays-same-params", () => {
	it("two calls with identical overlays produce same output strings for all slots", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
					"icon",
				],
				variant: {},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t1: {
						token: [
							"t2",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"b-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								token: [
									"t1",
								],
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

		const one = $c.create(
			tweaks([
				{
					token: {
						t2: {
							class: [
								"USER2",
							],
						},
					},
				},
				{
					token: {
						t1: {
							class: [
								"CONF1",
							],
						},
					},
				},
			]),
		);
		const two = $c.create(
			tweaks([
				{
					token: {
						t2: {
							class: [
								"USER2",
							],
						},
					},
				},
				{
					token: {
						t1: {
							class: [
								"CONF1",
							],
						},
					},
				},
			]),
		);

		expect(one.slots.root()).toBe(two.slots.root());
		expect(one.slots.icon()).toBe(two.slots.icon());
	});
});
