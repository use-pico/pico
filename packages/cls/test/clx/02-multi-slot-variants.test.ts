import { describe, expect, it } from "vitest";
import { clx } from "../../src";

describe("clx - multi slot variants", () => {
	it("applies different classes to different slots", () => {
		const Button = clx({
			slot: {
				root: "root-base",
				label: "label-base",
				icon: "icon-base",
			},
			variant: {
				size: {
					sm: {
						root: "root-sm",
						label: "label-sm",
						icon: "icon-sm",
					},
					lg: {
						root: "root-lg",
						label: "label-lg",
						icon: "icon-lg",
					},
				},
				color: {
					primary: {
						root: "root-primary",
						label: "label-primary",
						icon: "icon-primary",
					},
					neutral: {
						root: "root-neutral",
						label: "label-neutral",
						icon: "icon-neutral",
					},
				},
			},
			defaults: {
				size: "sm",
				color: "neutral",
			},
		});

		const a = Button({
			size: "lg",
			color: "primary",
		});
		expect(a.slots.root()).toBe("root-base root-lg root-primary");
		expect(a.slots.label()).toBe("label-base label-lg label-primary");
		expect(a.slots.icon()).toBe("icon-base icon-lg icon-primary");
	});
});
