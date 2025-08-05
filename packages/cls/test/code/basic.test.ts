import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("cls - Basic Functionality", () => {
	it("should create a basic component with slots", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
				icon: "w-4 h-4",
			},
			variant: {
				size: {
					sm: {
						base: "text-sm",
					},
					md: {
						base: "text-base",
					},
					lg: {
						base: "text-lg",
					},
				},
				color: {
					primary: {
						base: "bg-blue-500 text-white",
					},
					secondary: {
						base: "bg-gray-500 text-white",
					},
				},
			},
			defaults: {
				size: "md",
				color: "primary",
			},
		});

		const result = button();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-base bg-blue-500 text-white",
		);
		expect(result.slots.icon()).toBe("w-4 h-4");
	});

	it("should handle variant overrides", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: {
						base: "text-sm",
					},
					md: {
						base: "text-base",
					},
					lg: {
						base: "text-lg",
					},
				},
				color: {
					primary: {
						base: "bg-blue-500 text-white",
					},
					secondary: {
						base: "bg-gray-500 text-white",
					},
				},
			},
			defaults: {
				size: "md",
				color: "primary",
			},
		});

		const result = button({
			size: "lg",
			color: "secondary",
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-lg bg-gray-500 text-white",
		);
	});

	it("should handle class overrides", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				color: {
					primary: {
						base: "bg-blue-500 text-white",
					},
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = button();
		expect(result.slots.base({}, "custom-class")).toBe(
			"px-4 py-2 rounded bg-blue-500 text-white custom-class",
		);
	});

	it("should handle slot class overrides", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
				icon: "w-4 h-4",
			},
			variant: {
				color: {
					primary: {
						base: "bg-blue-500 text-white",
					},
					secondary: {
						base: "bg-gray-500 text-white",
						icon: "bg-red-400",
					},
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = button(undefined, {
			base: "custom-base",
			icon: "custom-icon",
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded bg-blue-500 text-white custom-base",
		);
		expect(
			result.slots.icon(
				{
					color: "secondary",
				},
				[
					"custom",
					"class",
				],
			),
		).toBe("w-4 h-4 bg-red-400 custom-icon custom class");
	});

	it("should handle boolean variants", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				disabled: {
					true: {
						base: "opacity-50 cursor-not-allowed",
					},
					false: {
						base: "cursor-pointer",
					},
				},
				loading: {
					true: {
						base: "animate-spin",
					},
					false: {
						base: [],
					},
				},
			},
			defaults: {
				disabled: false,
				loading: false,
			},
		});

		const result = button({
			disabled: true,
			loading: true,
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded opacity-50 cursor-not-allowed animate-spin",
		);
	});

	it("should handle array slot values", () => {
		const button = cls({
			slot: {
				base: [
					"px-4",
					"py-2",
					"rounded",
				],
			},
			variant: {
				color: {
					primary: {
						base: "bg-blue-500 text-white",
					},
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = button();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded bg-blue-500 text-white",
		);
	});

	it("should handle empty variants gracefully", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: {
						base: "text-sm",
					},
					md: {
						base: "text-base",
					},
				},
			},
			defaults: {
				size: "md",
			},
		});

		const result = button({
			size: "nonexistent" as any,
		});
		expect(result.slots.base()).toBe("px-4 py-2 rounded");
	});
});
