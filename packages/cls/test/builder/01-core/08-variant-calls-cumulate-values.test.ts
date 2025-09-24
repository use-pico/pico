import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/variant-calls-cumulate-values", () => {
	it("repeated variant() calls cumulate values, not override", () => {
		const buttonCls = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
			])
			.variant("size", [
				"md",
			])
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

		expect(buttonCls.create().slots.root()).toBe("base sm");
		expect(
			buttonCls
				.create({
					variant: {
						size: "md",
					},
				})
				.slots.root(),
		).toBe("base md");
	});
});
