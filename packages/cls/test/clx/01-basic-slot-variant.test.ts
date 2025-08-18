import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - basic slot variant", () => {
	it("applies per-slot variant classes with defaults and overrides", () => {
		const Button = clx({
			slot: {
				root: "base",
			},
			variant: {
				size: {
					sm: {
						root: "sm",
					},
					md: {
						root: "md",
					},
				},
			},
			defaults: {
				size: "sm",
			},
		});

		const a = Button();
		expect(a.slots.root()).toBe("base sm");

		const b = Button({
			size: "md",
		});
		expect(b.slots.root()).toBe("base md");
	});
});
