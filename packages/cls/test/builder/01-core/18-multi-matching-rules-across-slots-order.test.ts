import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/multi-matching-rules-across-slots-order", () => {
	it("applies multiple matching rules in declaration order across slots", () => {
		const buttonCls = contract()
			.slots([
				"root",
				"label",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
			})
			.match("tone", "light", {
				root: {
					class: [
						"light-root-1",
					],
				},
				label: {
					class: [
						"light-label-1",
					],
				},
			})
			.match("tone", "light", {
				root: {
					class: [
						"light-root-2",
					],
				},
				label: {
					class: [
						"light-label-2",
					],
				},
			})
			.defaults({
				tone: "light",
			})
			.cls();

		const created = buttonCls.create();
		expect(created.slots.root()).toBe("base light-root-1 light-root-2");
		expect(created.slots.label()).toBe(
			"label-base light-label-1 light-label-2",
		);
	});
});
