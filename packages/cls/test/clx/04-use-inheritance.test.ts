import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - use inheritance", () => {
	it("inherits base slots and variants, child can extend", () => {
		const Base = clx({
			// base
			slot: {
				root: "base-root",
				label: "base-label",
			},
			variant: {
				size: {
					sm: {
						root: "base-sm",
						label: "base-sm-label",
					},
					md: {
						root: "base-md",
						label: "base-md-label",
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
				root: "child-root",
			},
			variant: {
				color: {
					primary: {
						root: "child-primary",
						label: "child-primary-label",
					},
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const a = Child();
		expect(a.slots.root()).toBe(
			"base-root base-sm child-root child-primary",
		);
		expect(a.slots.label()).toBe(
			"base-label base-sm-label child-primary-label",
		);
	});
});
