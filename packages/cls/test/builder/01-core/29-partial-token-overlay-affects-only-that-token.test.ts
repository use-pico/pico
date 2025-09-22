import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder/partial-token-overlay-affects-only-that-token", () => {
	it("overlay on leaf token does not affect referenced token", () => {
		const $cls = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
			])
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

		const created = $cls.create(
			tweak([
				undefined,
				{
					token: {
						t2: {
							class: [
								"USER2",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("USER2 a1 base");
	});
});
