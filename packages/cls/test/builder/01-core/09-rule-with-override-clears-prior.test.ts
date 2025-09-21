import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/rule-with-override-clears-prior", () => {
	it("override rule replaces earlier accumulated classes", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("on", true, {
				root: {
					class: [
						"on",
					],
				},
			})
			.match(
				"on",
				false,
				{
					root: {
						class: [
							"off",
						],
					},
				},
				true,
			)
			.defaults({
				on: true,
			})
			.cls();

		expect($cls.create().slots.root()).toBe("base on");
		expect(
			$cls
				.create({
					variant: {
						on: false,
					},
				})
				.slots.root(),
		).toBe("off");
	});
});
