import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/three-level-per-slot-local-override-independence", () => {
	it("local override on icon does not affect root across base→child→grand", () => {
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
						slot: {
							root: {
								class: [
									"g-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								class: [
									"g-icon",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create();
		expect(slots.root()).toBe("b-root c-root g-root");
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"OVR",
						],
					},
				},
			}),
		).toBe("OVR");
		// root remains unaffected
		expect(slots.root()).toBe("b-root c-root g-root");
	});
});
