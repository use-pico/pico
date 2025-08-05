import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("cls - Matching Rules", () => {
	it("should apply matching rules when conditions are met", () => {
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
			match: [
				{
					if: {
						size: "lg",
						color: "primary",
					},
					do: {
						base: "shadow-lg",
					},
				},
				{
					if: {
						size: "sm",
					},
					do: {
						base: "text-xs",
					},
				},
			],
			defaults: {
				size: "md",
				color: "primary",
			},
		});

		const result = button({
			size: "lg",
			color: "primary",
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-lg bg-blue-500 text-white shadow-lg",
		);
	});

	it("should apply multiple matching rules when conditions are met", () => {
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
				},
				disabled: {
					true: {
						base: "opacity-50",
					},
					false: {
						base: "opacity-100",
					},
				},
			},
			match: [
				{
					if: {
						size: "sm",
					},
					do: {
						base: "px-2 py-1",
						icon: "w-3 h-3",
					},
				},
				{
					if: {
						disabled: true,
					},
					do: {
						base: "cursor-not-allowed",
					},
				},
			],
			defaults: {
				size: "md",
				disabled: false,
			},
		});

		const result = button({
			size: "sm",
			disabled: true,
		});
		expect(result.slots.base()).toBe(
			"rounded text-sm opacity-50 px-2 py-1 cursor-not-allowed",
		);
		expect(result.slots.icon()).toBe("w-3 h-3");
	});

	it("should not apply matching rules when conditions are not met", () => {
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
			match: [
				{
					if: {
						size: "sm",
					},
					do: {
						base: "px-2 py-1",
					},
				},
			],
			defaults: {
				size: "md",
			},
		});

		const result = button();
		expect(result.slots.base()).toBe("px-4 py-2 rounded text-base");
	});

	it("should handle partial matching rule conditions", () => {
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
				color: {
					primary: {
						base: "bg-blue-500",
					},
					secondary: {
						base: "bg-gray-500",
					},
				},
			},
			match: [
				{
					if: {
						size: "sm",
					},
					do: {
						base: "px-2 py-1",
					},
				},
			],
			defaults: {
				size: "md",
				color: "primary",
			},
		});

		const result = button({
			size: "sm",
			color: "secondary",
		});
		expect(result.slots.base()).toBe(
			"rounded text-sm bg-gray-500 px-2 py-1",
		);
	});

	it("should handle matching rules with boolean variants", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				disabled: {
					true: {
						base: "opacity-50",
					},
					false: {
						base: "opacity-100",
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
			match: [
				{
					if: {
						disabled: true,
						loading: true,
					},
					do: {
						base: "cursor-wait",
					},
				},
				{
					if: {
						disabled: true,
						loading: false,
					},
					do: {
						base: "cursor-not-allowed",
					},
				},
			],
			defaults: {
				disabled: false,
				loading: false,
			},
		});

		const result = button({
			disabled: true,
			loading: false,
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded opacity-50 cursor-not-allowed",
		);
	});

	it("should handle empty matching rules", () => {
		const button = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				color: {
					primary: {
						base: "bg-blue-500",
					},
				},
			},
			match: [],
			defaults: {
				color: "primary",
			},
		});

		const result = button();
		expect(result.slots.base()).toBe("px-4 py-2 rounded bg-blue-500");
	});
});
