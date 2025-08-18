import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - runtime slot safety", () => {
	it("safely handles accessing non-existent slots at runtime", () => {
		const Thing = clx({
			slot: {
				root: "root",
			},
			variant: {
				feature: {
					on: {
						root: "on",
					},
					off: {
						root: "off",
					},
				},
			},
			defaults: {
				feature: "on",
			},
		});

		const a = Thing();
		expect(a.slots.root()).toBe("root on");
	});
});
