import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Complete Valid", () => {
	it("should successfully create definition when everything matches", () => {
		expect(() => {
			const Component = contract()
				.tokens([
					"color.primary",
					"color.secondary",
				])
				.slots([
					"root",
					"content",
				])
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.variant("tone", [
					"light",
					"dark",
				])
				.def()
				.token({
					"color.primary": {
						class: [
							"bg-blue-500",
						],
					},
					"color.secondary": {
						class: [
							"bg-gray-200",
						],
					},
				})
				.root({
					root: {
						token: [
							"color.primary",
						],
					},
				})
				.defaults({
					size: "md",
					tone: "light",
				})
				.cls();

			expect(Component).toBeDefined();
		}).not.toThrow();
	});
});
