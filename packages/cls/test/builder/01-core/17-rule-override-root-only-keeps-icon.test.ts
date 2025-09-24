import { describe, expect, it } from "vitest";
import { contract, OVERRIDE } from "../../../src";

describe("builder/rule-override-root-only-keeps-icon", () => {
	it("override on root clears root but keeps icon", () => {
		const buttonCls = contract()
			.slots([
				"root",
				"icon",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.root({
				root: {
					class: [
						"root-base",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
			})
			.match(
				"size",
				"md",
				{
					root: {
						class: [
							"ROOT-OVERRIDE",
						],
					},
				},
				OVERRIDE,
			)
			.defaults({
				size: "sm",
			})
			.cls();

		expect(buttonCls.create().slots.root()).toBe("root-base");
		expect(buttonCls.create().slots.icon()).toBe("icon-base");
		expect(
			buttonCls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.root(),
		).toBe("ROOT-OVERRIDE");
		expect(
			buttonCls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.icon(),
		).toBe("icon-base");
	});
});
