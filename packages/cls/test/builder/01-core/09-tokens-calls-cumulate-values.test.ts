import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-calls-cumulate-values", () => {
	it("repeated tokens() calls cumulate token names", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
			])
			.tokens([
				"secondary",
			])
			.slots([
				"root",
			])
			.def()
			.token({
				primary: {
					class: [
						"primary-styles",
					],
				},
				secondary: {
					class: [
						"secondary-styles",
					],
				},
			})
			.root({
				root: {
					token: [
						"primary",
						"secondary",
					],
					class: [
						"base",
					],
				},
			})
			.cls();

		expect(buttonCls.create().slots.root()).toBe(
			"primary-styles secondary-styles base",
		);
	});
});
