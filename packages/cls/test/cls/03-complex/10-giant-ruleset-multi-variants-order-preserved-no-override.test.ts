import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/giant-ruleset-multi-variants-order-preserved-no-override", () => {
	it("large matrix of variant matches across 3 slots keeps strict order", () => {
		const $c = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					size: [
						"xs",
						"sm",
						"md",
					],
					tone: [
						"light",
						"dark",
					],
					state: [
						"idle",
						"hover",
						"active",
					],
					on: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							size: "xs",
						},
						slot: {
							root: {
								class: [
									"xs",
								],
							},
							icon: {
								class: [
									"i-xs",
								],
							},
							label: {
								class: [
									"l-xs",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"sm",
								],
							},
							icon: {
								class: [
									"i-sm",
								],
							},
							label: {
								class: [
									"l-sm",
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
							icon: {
								class: [
									"i-md",
								],
							},
							label: {
								class: [
									"l-md",
								],
							},
						},
					},
					{
						match: {
							tone: "light",
						},
						slot: {
							root: {
								class: [
									"light",
								],
							},
							icon: {
								class: [
									"i-light",
								],
							},
							label: {
								class: [
									"l-light",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"dark",
								],
							},
							icon: {
								class: [
									"i-dark",
								],
							},
							label: {
								class: [
									"l-dark",
								],
							},
						},
					},
					{
						match: {
							state: "idle",
						},
						slot: {
							root: {
								class: [
									"idle",
								],
							},
							icon: {
								class: [
									"i-idle",
								],
							},
							label: {
								class: [
									"l-idle",
								],
							},
						},
					},
					{
						match: {
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"hover",
								],
							},
							icon: {
								class: [
									"i-hover",
								],
							},
							label: {
								class: [
									"l-hover",
								],
							},
						},
					},
					{
						match: {
							state: "active",
						},
						slot: {
							root: {
								class: [
									"active",
								],
							},
							icon: {
								class: [
									"i-active",
								],
							},
							label: {
								class: [
									"l-active",
								],
							},
						},
					},
					{
						match: {
							on: true,
						},
						slot: {
							root: {
								class: [
									"on",
								],
							},
							icon: {
								class: [
									"i-on",
								],
							},
							label: {
								class: [
									"l-on",
								],
							},
						},
					},
					{
						match: {
							on: false,
						},
						slot: {
							root: {
								class: [
									"off",
								],
							},
							icon: {
								class: [
									"i-off",
								],
							},
							label: {
								class: [
									"l-off",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"sm-dark",
								],
							},
							icon: {
								class: [
									"i-sm-dark",
								],
							},
							label: {
								class: [
									"l-sm-dark",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"dark-hover",
								],
							},
							icon: {
								class: [
									"i-dark-hover",
								],
							},
							label: {
								class: [
									"l-dark-hover",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
							icon: {
								class: [
									"i-base",
								],
							},
							label: {
								class: [
									"l-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "dark",
					state: "hover",
					on: true,
				},
			},
		);

		const { slots } = $c.create();
		expect(slots.root()).toBe("sm dark hover on sm-dark dark-hover base");
		expect(slots.icon()).toBe(
			"i-sm i-dark i-hover i-on i-sm-dark i-dark-hover i-base",
		);
		expect(slots.label()).toBe(
			"l-sm l-dark l-hover l-on l-sm-dark l-dark-hover l-base",
		);
	});
});
