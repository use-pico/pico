import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - match rules", () => {
	it("applies rule-based classes per slot when conditions match", () => {
		const Badge = clx({
			slot: {
				root: "root",
				icon: "icon",
			},
			variant: {
				variant: {
					info: {
						root: "info",
					},
					warn: {
						root: "warn",
					},
				},
				size: {
					sm: {
						root: "sm",
						icon: "sm-icon",
					},
					md: {
						root: "md",
						icon: "md-icon",
					},
				},
			},
			match: [
				{
					if: {
						variant: "warn",
						size: "md",
					},
					do: {
						root: "rule-root",
						icon: "rule-icon",
					},
				},
			],
			defaults: {
				variant: "info",
				size: "sm",
			},
		});

		const a = Badge({
			variant: "warn",
			size: "md",
		});
		expect(a.slots.root()).toBe("root warn md rule-root");
		expect(a.slots.icon()).toBe("icon md-icon rule-icon");

		const b = Badge({
			variant: "info",
			size: "md",
		});
		expect(b.slots.root()).toBe("root info md");
		expect(b.slots.icon()).toBe("icon md-icon");
	});
});
