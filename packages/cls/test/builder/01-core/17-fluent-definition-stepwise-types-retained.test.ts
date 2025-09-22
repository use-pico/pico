import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/rule-override-root-only-keeps-icon", () => {
	it("override on root clears root but keeps icon", () => {
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
					root: {
						class: [
							"R-OVR",
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
		).toBe("R-OVR");
		expect(
			$cls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.icon(),
		).toBe("i");
	});
});
