import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - defaults merging across use chain", () => {
	it("merges defaults from use chain with local and call-time values", () => {
		const Base = clx({
			slot: {
				root: "base",
				foo: "bar",
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

		const Child = clx({
			use: Base,
			slot: {
				root: "child",
			},
			variant: {
				color: {
					blue: {
						root: "blue",
					},
					red: {
						root: "red",
					},
				},
			},
			defaults: {
				color: "blue",
			},
		});

		const a = Child();
		expect(a.slots.root()).toBe("base sm child blue");

		const b = Child({
			size: "md",
			color: "blue",
		});
		expect(b.slots.root()).toBe("base md child blue");

		const c = Child({
			color: "red",
		});
		expect(c.slots.root()).toBe("base sm child red");
	});
});
