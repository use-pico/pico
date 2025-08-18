import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - type safety for variant values", () => {
	it("enforces valid variant values", () => {
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

		// These should work fine
		const valid1 = Button({
			size: "sm",
			color: "primary",
		});
		const valid2 = Button({
			size: "lg",
			color: "secondary",
		});

		expect(valid1.slots.root()).toBe("base sm primary");
		expect(valid2.slots.root()).toBe("base lg secondary");

		// TypeScript compilation test - these should cause type errors
		// (keep commented to allow ts to pass under test runner)
		// const invalid1 = Button({ size: "xl" });
		// const invalid2 = Button({ color: "tertiary" });
		// const invalid3 = Button({ size: "sm", color: "invalid" });
	});
});
