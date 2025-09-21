import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/variants-calls-cumulate-values", () => {
	it("repeated variants() calls cumulate values for a variant", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.variants({
				size: [
					"sm",
				],
			})
			.variants({
				size: [
					"md",
				],
			})
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		expect($cls.create().slots.root()).toBe("base sm");
		expect(
			$cls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.root(),
		).toBe("base md");
	});
});
