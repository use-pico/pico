import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder/definition-helper-path", () => {
	it("builds via definition(contract).root().cls() and applies classes", () => {
		const c = contract()
			.slots([
				"root",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();
		const $cls = definition(c)
			.match("tone", "light", {
				root: {
					class: [
						"light",
					],
				},
			})
			.match("tone", "dark", {
				root: {
					class: [
						"dark",
					],
				},
			})
			.defaults({
				tone: "dark",
			})
			.cls();

		const { slots } = $cls.create();
		expect(slots.root()).toBe("dark");
		expect(
			$cls
				.create({
					variant: {
						tone: "light",
					},
				})
				.slots.root(),
		).toBe("light");
	});
});
