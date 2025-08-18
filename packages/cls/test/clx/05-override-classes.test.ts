import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - overrides", () => {
	it("merges cls overrides and per-call slot overrides", () => {
		const Card = clx({
			slot: {
				root: "root",
				title: "title",
			},
			variant: {
				pad: {
					sm: {
						root: "p-2",
					},
					md: {
						root: "p-4",
					},
				},
			},
			defaults: {
				pad: "sm",
			},
		});

		const cls = {
			root: "border",
			title: "font-bold",
		};

		const inst = Card(
			{
				pad: "md",
			},
			cls,
		);
		expect(inst.slots.root()).toBe("root p-4 border");
		expect(inst.slots.title()).toBe("title font-bold");

		const inst2 = Card({
			pad: "sm",
		});
		expect(inst2.slots.root(undefined, "shadow")).toBe("root p-2 shadow");
	});
});
