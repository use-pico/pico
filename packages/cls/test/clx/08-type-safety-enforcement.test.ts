import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - type safety enforcement", () => {
	it("enforces that variants can only reference existing slots", () => {
		// This should compile successfully - all slots exist
		const ValidButton = clx({
			slot: {
				root: "base",
				label: "label-base",
			},
			variant: {
				size: {
					sm: {
						root: "sm",
					}, // ✅ Valid - root slot exists
					md: {
						root: "md",
						label: "md-label",
					}, // ✅ Valid - both slots exist
				},
				color: {
					primary: {
						root: "primary",
					}, // ✅ Valid - only targeting existing slot
				},
			},
			defaults: {
				size: "sm",
				color: "primary",
			},
		});

		const classes = ValidButton();
		expect(classes.slots.root()).toBe("base sm primary");
		expect(classes.slots.label()).toBe("label-base");
	});

	it("demonstrates optional slots in variants", () => {
		const Button = clx({
			slot: {
				root: "base",
				label: "label-base",
				icon: "icon-base",
			},
			variant: {
				size: {
					sm: {
						root: "sm",
						label: "sm-label",
					}, // ✅ Only targeting some slots
					md: {
						root: "md",
					}, // ✅ Only targeting root
					lg: {
						root: "lg",
						label: "lg-label",
						icon: "lg-icon",
					}, // ✅ Targeting all slots
				},
			},
			defaults: {
				size: "md",
			},
		});

		const classes = Button({
			size: "sm",
		});
		expect(classes.slots.root()).toBe("base sm");
		expect(classes.slots.label()).toBe("label-base sm-label");
		expect(classes.slots.icon()).toBe("icon-base"); // icon slot not affected by sm variant
	});
});

// TypeScript compilation test - this should cause type errors if uncommented:
/*
const InvalidButton = clx({
	slot: {
		root: "base",
	},
	variant: {
		size: {
			sm: { 
				root: "sm",
				ghost: "ghost-sm", // ❌ TypeScript error - ghost slot doesn't exist
			},
		},
	},
	defaults: {
		size: "sm",
	},
});
*/
