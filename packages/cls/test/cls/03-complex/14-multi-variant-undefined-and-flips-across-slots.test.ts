import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/multi-variant-undefined-and-flips-across-slots", () => {
	it("create picks values; local undefined keeps them; flips on subsets reflect correctly per slot", () => {
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
						"sm",
						"md",
					],
					tone: [
						"light",
						"dark",
					],
					on: [
						"bool",
					],
					state: [
						"idle",
						"hover",
					],
				},
			},
			{
				token: {},
				rules: [
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
							label: {
								class: [
									"l-dark",
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
							label: {
								class: [
									"l-hover",
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
					size: "md",
					tone: "dark",
					on: true,
					state: "hover",
				},
			},
		);

		const { slots } = $c.create();
		expect(slots.root()).toBe("md dark on hover base");
		expect(slots.icon()).toBe("i-md i-on i-base");
		expect(slots.label()).toBe("l-dark l-hover l-base");
		// undefined keeps create values
		expect(
			slots.root({
				variant: {
					size: undefined,
					tone: undefined,
					on: undefined,
					state: undefined,
				},
			}),
		).toBe("md dark on hover base");
		// flip subset: change tone and state, keep others
		expect(
			slots.root({
				variant: {
					tone: "light",
					state: "idle",
				},
			}),
		).toBe("md light on idle base");
		expect(
			slots.icon({
				variant: {
					tone: "light",
					state: "idle",
				},
			}),
		).toBe("i-md i-on i-base");
		expect(
			slots.label({
				variant: {
					tone: "light",
					state: "idle",
				},
			}),
		).toBe("l-light l-idle l-base");
	});
});
