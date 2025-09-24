import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/empty-token-overlay-clears-token", () => {
	it("empty overlay on token clears that token only", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
			])
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.token({
				primary: {
					class: [
						"primary-styles",
					],
				},
			})
			.root({
				root: {
					token: [
						"primary",
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

		const created = buttonCls.create(undefined, {
			token: {
				primary: {
					class: [],
				},
			},
		});
		expect(created.slots.root()).toBe("base");
	});
});
