import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - intellisense for variant overrides", () => {
	it("provides proper intellisense for variant values", () => {
		const Button = clx({
			slot: {
				root: "base",
				label: "label-base",
			},
			variant: {
				size: {
					sm: {
						root: "sm",
						label: "sm-label",
					},
					md: {
						root: "md",
						label: "md-label",
					},
					lg: {
						root: "lg",
						label: "lg-label",
					},
				},
				color: {
					primary: {
						root: "primary",
						label: "primary-label",
					},
					secondary: {
						root: "secondary",
						label: "secondary-label",
					},
				},
			},
			defaults: {
				size: "md",
				color: "primary",
			},
		});

		// This should provide intellisense for size: "sm" | "md" | "lg"
		// and color: "primary" | "secondary"
		const classes = Button({
			size: "lg", // Should show autocomplete for "sm", "md", "lg"
			color: "secondary", // Should show autocomplete for "primary", "secondary"
		});

		expect(classes.slots.root()).toBe("base lg secondary");
		expect(classes.slots.label()).toBe(
			"label-base lg-label secondary-label",
		);
	});
});
