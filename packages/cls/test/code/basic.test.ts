import { describe, it } from "bun:test";
import { cls } from "../../src";

describe("Basic", () => {
	it("Just TDD", () => {
		const _CoreCls = cls({
			contract: {
				slot: [
					"root",
				],
				variant: [
					{
						color: [
							"red",
							"blue",
						],
					},
				],
				tokens: {
					group: [
						"primary",
					],
					value: [
						"bgColor",
						"textColor",
					],
				},
			},
			definition: {
				slot: {
					root: [
						"root-cls",
					],
				},
				variant: {
					color: {
						red: {
							root: "text-red-500",
						},
						blue: {
							root: "text-blue-500",
						},
					},
				},
				tokens: {
					primary: {
						bgColor: [
							"bg-blue-500",
						],
						textColor: [
							"text-blue-800",
						],
					},
				},
				defaults: {
					color: "red",
				},
			},
		});

		// 	const _ButtonCls = cls({
		// 		contract: {},
		// 		definition: {},
		// 	});
	});
});
