import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/cache-same-params-produce-same-result", () => {
	it("returns same strings for identical tweaks (cache)", () => {
		const $cls = contract()
			.tokens([
				"t1",
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
				t1: {
					class: [
						"a1",
					],
				},
			})
			.match("size", "sm", {
				root: {
					token: [
						"t1",
					],
					class: [
						"sm",
					],
				},
			})
			.match("size", "md", {
				root: {
					token: [
						"t1",
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

		const a = $cls.create({
			variant: {
				size: "md",
			},
		});
		const b = $cls.create({
			variant: {
				size: "md",
			},
		});
		expect(a.slots.root()).toBe(b.slots.root());
	});
});
