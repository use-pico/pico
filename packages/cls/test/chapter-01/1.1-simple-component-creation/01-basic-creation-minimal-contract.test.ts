import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";

describe("1.1 Simple Component Creation - Basic Creation with Minimal Contract", () => {
	it("should create a basic CLS instance with minimal contract", () => {
		const Button = cls(
			{
				tokens: [
					"color.bg.default",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const _foo: Cls.VariantOf<typeof Button, "size"> = "sm";

		const { slots } = Button.create();
		expect(slots.root()).toBe("bg-gray-100");
	});
});
