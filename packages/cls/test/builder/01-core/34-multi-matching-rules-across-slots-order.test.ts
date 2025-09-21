import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/multi-matching-rules-across-slots-order", () => {
	it("applies multiple matching rules in declaration order across slots", () => {
		const $cls = contract()
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
						"lbl",
					],
				},
			})
			.match("tone", "light", {
				root: {
					class: [
						"r1",
					],
				},
				label: {
					class: [
						"l1",
					],
				},
			})
			.match("tone", "light", {
				root: {
					class: [
						"r2",
					],
				},
				label: {
					class: [
						"l2",
					],
				},
			})
			.defaults({
				tone: "light",
			})
			.cls();

		const created = $cls.create();
		expect(created.slots.root()).toBe("base r1 r2");
		expect(created.slots.label()).toBe("lbl l1 l2");
	});
});
