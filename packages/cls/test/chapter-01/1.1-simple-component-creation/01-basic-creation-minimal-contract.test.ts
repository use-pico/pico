import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
						]),
					}),
				],
				defaults: def.defaults?.({
					size: "sm",
				}),
			}),
		);

		const instance = Button.create?.();
		expect(instance.root?.()).toBe("bg-gray-100");
	});
});
