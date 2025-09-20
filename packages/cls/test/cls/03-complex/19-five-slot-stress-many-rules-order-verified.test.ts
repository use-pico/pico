import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/five-slot-stress-many-rules-order-verified", () => {
	it("5 slots with many rules; verify deterministic order across slots", () => {
		const $c = cls(
			{
				tokens: [],
				slot: [
					"root",
					"header",
					"content",
					"footer",
					"badge",
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
						slot: {
							root: {
								class: [
									"r-base",
								],
							},
							header: {
								class: [
									"h-base",
								],
							},
							content: {
								class: [
									"c-base",
								],
							},
							footer: {
								class: [
									"f-base",
								],
							},
							badge: {
								class: [
									"b-base",
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
									"r-sm",
								],
							},
							header: {
								class: [
									"h-sm",
								],
							},
							content: {
								class: [
									"c-sm",
								],
							},
							footer: {
								class: [
									"f-sm",
								],
							},
							badge: {
								class: [
									"b-sm",
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
									"r-dark",
								],
							},
							header: {
								class: [
									"h-dark",
								],
							},
							content: {
								class: [
									"c-dark",
								],
							},
							footer: {
								class: [
									"f-dark",
								],
							},
							badge: {
								class: [
									"b-dark",
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
									"r-on",
								],
							},
							header: {
								class: [
									"h-on",
								],
							},
							content: {
								class: [
									"c-on",
								],
							},
							footer: {
								class: [
									"f-on",
								],
							},
							badge: {
								class: [
									"b-on",
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
									"r-hover",
								],
							},
							header: {
								class: [
									"h-hover",
								],
							},
							content: {
								class: [
									"c-hover",
								],
							},
							footer: {
								class: [
									"f-hover",
								],
							},
							badge: {
								class: [
									"b-hover",
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
									"r-sm-dark",
								],
							},
							header: {
								class: [
									"h-sm-dark",
								],
							},
							content: {
								class: [
									"c-sm-dark",
								],
							},
							footer: {
								class: [
									"f-sm-dark",
								],
							},
							badge: {
								class: [
									"b-sm-dark",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "dark",
					on: true,
					state: "hover",
				},
			},
		);

		const { slots } = $c.create();
		expect(slots.root()).toBe("r-base r-sm r-dark r-on r-hover r-sm-dark");
		expect(slots.header()).toBe(
			"h-base h-sm h-dark h-on h-hover h-sm-dark",
		);
		expect(slots.content()).toBe(
			"c-base c-sm c-dark c-on c-hover c-sm-dark",
		);
		expect(slots.footer()).toBe(
			"f-base f-sm f-dark f-on f-hover f-sm-dark",
		);
		expect(slots.badge()).toBe("b-base b-sm b-dark b-on b-hover b-sm-dark");
	});
});
