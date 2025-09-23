import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("Inheritance User Tweaks", () => {
	it("should allow overriding with user tweaks on inherited cls", () => {
		const ButtonCls = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.def()
			.root({
				root: {
					class: [
						"base-button",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		const CustomButtonCls = contract(ButtonCls.contract)
			.def()
			.root({
				root: {
					class: [
						"custom-button",
						"px-6",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		// Test inheritance + user tweaks
		const result = ButtonCls.use(CustomButtonCls).create({
			slot: {
				root: {
					class: [
						"user-button",
						"bg-red-500",
					],
				},
			},
			variant: {
				size: "lg",
			},
		});

		// User tweaks should have highest precedence, but inheritance combines classes
		expect(result.slots.root()).toBe(
			"base-button custom-button px-6 user-button bg-red-500",
		);
	});
});
