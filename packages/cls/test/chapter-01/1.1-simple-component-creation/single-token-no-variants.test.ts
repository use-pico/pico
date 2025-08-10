import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Single Token No Variants", () => {
	it("should create component with single token and no variants", () => {
		const SimpleComponent = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = SimpleComponent.create();
		expect(instance.root()).toBe("bg-blue-600");
	});
});
