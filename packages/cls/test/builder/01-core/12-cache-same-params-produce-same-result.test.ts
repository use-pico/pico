import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/cache-same-params-produce-same-result", () => {
	it("returns same strings for identical tweaks (cache)", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
			])
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.token({
				primary: {
					class: [
						"primary-styles",
					],
				},
			})
			.match("size", "sm", {
				root: {
					token: [
						"primary",
					],
					class: [
						"sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					token: [
						"primary",
					],
					class: [
						"md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const firstResult = buttonCls.create({
			variant: {
				size: "md",
			},
		});
		const secondResult = buttonCls.create({
			variant: {
				size: "md",
			},
		});
		expect(firstResult.slots.root()).toBe(secondResult.slots.root());
	});
});
