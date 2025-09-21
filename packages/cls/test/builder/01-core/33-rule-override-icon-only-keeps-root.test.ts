import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/rule-override-icon-only-keeps-root", () => {
	it("override on icon clears icon but keeps root", () => {
		const $cls = contract()
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
						"r",
					],
				},
				icon: {
					class: [
						"i",
					],
				},
			})
			.match(
				"size",
				"md",
				{
					icon: {
						class: [
							"I-OVR",
						],
					},
				},
				true,
			)
			.defaults({
				size: "sm",
			})
			.cls();

		expect($cls.create().slots.root()).toBe("r");
		expect($cls.create().slots.icon()).toBe("i");
		expect(
			$cls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.root(),
		).toBe("r");
		expect(
			$cls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.icon(),
		).toBe("I-OVR");
	});
});
