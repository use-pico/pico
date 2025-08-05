import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("cls - Edge Cases and Error Handling", () => {
	it("should handle empty slot definitions", () => {
		const component = cls({
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component();
		expect(result.slots).toBeDefined();
		expect(typeof result.slots).toBe("object");
	});

	it("should handle empty variant definitions", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {},
			defaults: {},
		});

		const result = component();
		expect(result.slots.base()).toBe("px-4 py-2");
	});

	it("should handle empty defaults", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {},
			defaults: {},
		});

		const result = component();
		expect(result.slots.base()).toBe("px-4 py-2");
	});

	it("should handle undefined values gracefully", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component(undefined, undefined);
		expect(result.slots.base()).toBe("px-4 py-2 bg-blue-500");
	});

	it("should handle null values gracefully", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component(null as any, null as any);
		expect(result.slots.base()).toBe("px-4 py-2 bg-blue-500");
	});

	it("should handle non-existent variant values", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component({
			color: "nonexistent" as any,
		});
		expect(result.slots.base()).toBe("px-4 py-2");
	});

	it("should handle non-existent slot overrides", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component(undefined, {
			nonexistent: "custom-class",
		} as any);
		expect(result.slots.base()).toBe("px-4 py-2 bg-blue-500");
	});

	it("should handle empty string slot values", () => {
		const component = cls({
			slot: {
				base: "",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component();
		expect(result.slots.base()).toBe("bg-blue-500");
	});

	it("should handle empty string variant values", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component();
		expect(result.slots.base()).toBe("px-4 py-2");
	});

	it("should handle boolean variants with empty string false value", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				disabled: {
					true: "opacity-50",
					false: "",
				},
			},
			defaults: {
				disabled: false,
			},
		});

		const result = component();
		expect(result.slots.base()).toBe("px-4 py-2");
	});

	it("should handle complex nested slot structures", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
				header: "text-lg font-bold",
				content: "text-gray-600",
				footer: "text-sm text-gray-500",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
					lg: "text-lg",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const result = component();
		expect(result.slots.base()).toBe("px-4 py-2 text-base");
		expect(result.slots.header()).toBe("font-bold text-base");
		expect(result.slots.content()).toBe("text-gray-600 text-base");
		expect(result.slots.footer()).toBe("text-gray-500 text-base");
	});

	it("should handle multiple boolean variants", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				disabled: {
					true: "opacity-50 cursor-not-allowed",
					false: "cursor-pointer",
				},
				loading: {
					true: "animate-spin",
					false: "",
				},
				active: {
					true: "ring-2 ring-blue-500",
					false: "",
				},
			},
			defaults: {
				disabled: false,
				loading: false,
				active: false,
			},
		});

		const result = component({
			disabled: true,
			loading: true,
			active: true,
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 opacity-50 cursor-not-allowed animate-spin ring-2 ring-blue-500",
		);
	});

	it("should handle configuration object structure", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component();
		expect(result["~config"]).toBeDefined();
		expect(result["~config"].defaults).toEqual({
			color: "primary",
		});
		expect(result["~config"].values).toEqual({
			color: "primary",
		});
	});

	it("should handle type object structure", () => {
		const component = cls({
			slot: {
				base: "px-4 py-2",
			},
			variant: {
				color: {
					primary: "bg-blue-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = component();
		expect(result["~type"]).toBeDefined();
		expect(typeof result["~type"]).toBe("function");
	});
});
