import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/cache-same-params-produce-same-result", () => {
	it("returns identical strings for identical params across inheritance", () => {
		const baseC = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.build();
		const base = definition(baseC)
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"b-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childC = contract(base.contract).build();
		const child = definition(childC)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const a = child
			.create({
				variant: {
					size: "md",
				},
			})
			.slots.root();
		const b = child
			.create({
				variant: {
					size: "md",
				},
			})
			.slots.root();
		expect(a).toBe(b);
	});
});
