import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/token-reference-and-user-overlay-order", () => {
	it("expands t1->t2 and user overlay on t2 applies before rule class order", () => {
		// build with a trivial bool variant to satisfy builder type requirements
		const $cls = contract()
			.tokens([
				"t1",
				"t2",
			]) // re-declare for new contract
			.slots([
				"root",
			]) // single slot
			.bool("on")
			.def()
			.token({
				t2: {
					class: [
						"a2",
					],
				},
				t1: {
					token: [
						"t2",
					],
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
		const { slots } = $cls.create({
			token: {
				t2: {
					class: [
						"USER2",
					],
				},
			},
		});
		expect(slots.root()).toBe("USER2 a1 base");
	});
});
