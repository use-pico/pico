import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/definition-token-last-call-wins", () => {
	it("when token() is called multiple times, the last definition wins", () => {
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
						"A1",
					],
				},
			})
			.token({
				t1: {
					class: [
						"A2",
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

		expect($cls.create().slots.root()).toBe("A2 base");
	});
});
