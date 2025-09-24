import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/cache-same-params-produce-same-result", () => {
	it("returns identical strings for identical params across inheritance", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.build();
		const baseButton = definition(baseContract)
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
						"base-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childContract = contract(baseButton.contract).build();
		const childButton = definition(childContract)
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

		const firstResult = childButton
			.create({
				variant: {
					size: "md",
				},
			})
			.slots.root();
		const secondResult = childButton
			.create({
				variant: {
					size: "md",
				},
			})
			.slots.root();
		expect(firstResult).toBe(secondResult);
	});
});
