import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("cls - Inheritance and Extensions", () => {
	it("should extend a base component with additional variants", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
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

		const extendedButton = cls({
			use: baseButton,
			slot: {
				base: "font-semibold",
			},
			variant: {
				color: {
					primary: "bg-blue-500 text-white",
					secondary: "bg-gray-500 text-white",
				},
			},
			defaults: {
				size: "sm",
				color: "primary",
			},
		});

		const result = extendedButton();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-sm font-semibold bg-blue-500 text-white",
		);
	});

	it("should merge defaults from base and extended components", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const extendedButton = cls({
			use: baseButton,
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500",
					secondary: "bg-gray-500",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = extendedButton();
		expect(result["~config"].defaults).toEqual({
			size: "md",
			color: "primary",
		});
	});

	it("should allow overriding base defaults in extended component", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const extendedButton = cls({
			use: baseButton,
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500",
					secondary: "bg-gray-500",
				},
			},
			defaults: {
				size: "sm", // Override base default
				color: "primary",
			},
		});

		const result = extendedButton();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-sm bg-blue-500",
		);
	});

	it("should handle multiple levels of inheritance", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const coloredButton = cls({
			use: baseButton,
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500 text-white",
					secondary: "bg-gray-500 text-white",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const finalButton = cls({
			use: coloredButton,
			slot: {
				base: "font-bold",
			},
			variant: {
				disabled: {
					true: "opacity-50 cursor-not-allowed",
					false: "cursor-pointer",
				},
			},
			defaults: {
				disabled: false,
			},
		});

		const result = finalButton();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-base bg-blue-500 text-white font-bold cursor-pointer",
		);
	});

	it("should handle slot extensions in inheritance", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
				icon: "w-4 h-4",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const extendedButton = cls({
			use: baseButton,
			slot: {
				label: "font-medium",
			},
			variant: {
				color: {
					primary: "bg-blue-500 text-white",
				},
			},
			defaults: {
				color: "primary",
			},
		});

		const result = extendedButton();
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-base bg-blue-500 text-white",
		);
		expect(result.slots.icon()).toBe(
			"w-4 h-4 text-base bg-blue-500 text-white",
		);
		expect(result.slots.label()).toBe(
			"text-base font-medium bg-blue-500 text-white",
		);
	});

	it("should handle variant extensions in inheritance", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
				},
			},
			defaults: {
				size: "md",
			},
		});

		const extendedButton = cls({
			use: baseButton,
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500 text-white",
				},
			},
			defaults: {
				size: "md", // Include base defaults
				color: "primary",
			},
		});

		const result = extendedButton({
			size: "sm",
		});
		expect(result.slots.base()).toBe(
			"px-4 py-2 rounded text-sm bg-blue-500 text-white",
		);
	});

	it("should handle matching rules in inheritance", () => {
		const baseButton = cls({
			slot: {
				base: "px-4 py-2 rounded",
			},
			variant: {
				size: {
					sm: "text-sm",
					md: "text-base",
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

		const extendedButton = cls({
			use: baseButton,
			slot: {},
			variant: {
				color: {
					primary: "bg-blue-500 text-white",
				},
			},
			match: [
				{
					if: {
						color: "primary",
					},
					do: {
						base: "shadow-md",
					},
				},
			],
			defaults: {
				color: "primary",
			},
		});

		const result = extendedButton({
			size: "sm",
		});
		expect(result.slots.base()).toBe(
			"rounded text-sm px-2 py-1 bg-blue-500 text-white shadow-md",
		);
	});
});
