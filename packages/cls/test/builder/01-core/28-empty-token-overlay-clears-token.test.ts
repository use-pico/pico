import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/empty-token-overlay-clears-token", () => {
	it("empty overlay on token clears that token only", () => {
		const $cls = contract()
			.tokens([
				"t1",
			])
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.token({
				t1: {
					class: [
						"a1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"base",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = $cls.create(undefined, {
			token: {
				t1: {
					class: [],
				},
			},
		});
		expect(created.slots.root()).toBe("base");
	});
});
