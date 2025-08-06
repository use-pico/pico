import { describe, it } from "bun:test";
import { cls } from "../../src";

describe("Basic", () => {
	it("Just TDD", () => {
		const _CoreCls = cls({
			contract: {
				slot: [
					"root",
				],
				variant: {
					color: [
						"red",
						"blue",
					],
				},
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
			definition(tokens) {
				return {
					slot: {
						root: [
							"root-cls",
							tokens.bgColor,
							tokens.textColor,
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
				} as const;
			},
		});

		// Test the token system
		const component = _CoreCls.create("primary");
		const instance = component();
		const _rootClass = instance.slots.root();

		// 	const _ButtonCls = cls({
		// 		contract: {},
		// 		definition: {},
		// 	});
	});
});
