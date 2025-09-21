import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-calls-cumulate-values", () => {
	it("repeated tokens() calls cumulate token names", () => {
		const $cls = contract()
			.tokens([
				"t1",
			])
			.tokens([
				"t2",
			])
			.slots([
				"root",
			])
			.def()
			.token({
				t1: {
					class: [
						"a1",
					],
				},
				t2: {
					class: [
						"a2",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
						"t2",
					],
					class: [
						"base",
					],
				},
			})
			.cls();

		expect($cls.create().slots.root()).toBe("a1 a2 base");
	});
});
