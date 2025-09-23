import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

const CardCls = contract()
	.slots([
		"root",
		"header",
		"content",
		"footer",
		"actions",
	])
	.variant("size", [
		"sm",
		"md",
		"lg",
		"xl",
	])
	.variant("variant", [
		"default",
		"elevated",
		"outlined",
		"filled",
	])
	.variant("theme", [
		"light",
		"dark",
		"auto",
	])
	.bool("disabled")
	.bool("loading")
	.bool("interactive")
	.def()
	.root({
		root: {
			class: [
				"card-base",
				"rounded-lg",
				"transition-all",
			],
		},
		header: {
			class: [
				"card-header",
				"font-semibold",
			],
		},
		content: {
			class: [
				"card-content",
				"text-sm",
			],
		},
		footer: {
			class: [
				"card-footer",
				"text-xs",
				"opacity-75",
			],
		},
		actions: {
			class: [
				"card-actions",
				"flex",
				"gap-2",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"p-3",
				"text-sm",
			],
		},
		header: {
			class: [
				"text-sm",
				"mb-2",
			],
		},
		content: {
			class: [
				"text-xs",
			],
		},
		footer: {
			class: [
				"text-xs",
				"mt-2",
			],
		},
		actions: {
			class: [
				"gap-1",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"p-4",
				"text-base",
			],
		},
		header: {
			class: [
				"text-base",
				"mb-3",
			],
		},
		content: {
			class: [
				"text-sm",
			],
		},
		footer: {
			class: [
				"text-sm",
				"mt-3",
			],
		},
		actions: {
			class: [
				"gap-2",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"p-6",
				"text-lg",
			],
		},
		header: {
			class: [
				"text-lg",
				"mb-4",
			],
		},
		content: {
			class: [
				"text-base",
			],
		},
		footer: {
			class: [
				"text-base",
				"mt-4",
			],
		},
		actions: {
			class: [
				"gap-3",
			],
		},
	})
	.match("size", "xl", {
		root: {
			class: [
				"p-8",
				"text-xl",
			],
		},
		header: {
			class: [
				"text-xl",
				"mb-5",
			],
		},
		content: {
			class: [
				"text-lg",
			],
		},
		footer: {
			class: [
				"text-lg",
				"mt-5",
			],
		},
		actions: {
			class: [
				"gap-4",
			],
		},
	})
	.match("variant", "default", {
		root: {
			class: [
				"bg-white",
				"border",
				"border-gray-200",
			],
		},
	})
	.match("variant", "elevated", {
		root: {
			class: [
				"bg-white",
				"shadow-lg",
				"border-0",
			],
		},
	})
	.match("variant", "outlined", {
		root: {
			class: [
				"bg-transparent",
				"border-2",
				"border-gray-300",
			],
		},
	})
	.match("variant", "filled", {
		root: {
			class: [
				"bg-gray-100",
				"border-0",
			],
		},
	})
	.match("theme", "dark", {
		root: {
			class: [
				"bg-gray-800",
				"text-white",
			],
		},
		header: {
			class: [
				"text-gray-100",
			],
		},
		content: {
			class: [
				"text-gray-200",
			],
		},
		footer: {
			class: [
				"text-gray-400",
			],
		},
	})
	.match("theme", "light", {
		root: {
			class: [
				"bg-white",
				"text-gray-900",
			],
		},
		header: {
			class: [
				"text-gray-800",
			],
		},
		content: {
			class: [
				"text-gray-700",
			],
		},
		footer: {
			class: [
				"text-gray-500",
			],
		},
	})
	.match("disabled", true, {
		root: {
			class: [
				"opacity-50",
				"cursor-not-allowed",
				"pointer-events-none",
			],
		},
	})
	.match("loading", true, {
		root: {
			class: [
				"animate-pulse",
				"cursor-wait",
			],
		},
		content: {
			class: [
				"opacity-60",
			],
		},
	})
	.match("interactive", true, {
		root: {
			class: [
				"hover:shadow-md",
				"hover:scale-105",
				"cursor-pointer",
			],
		},
	})
	.defaults({
		size: "md",
		variant: "default",
		theme: "light",
		disabled: false,
		loading: false,
		interactive: false,
	})
	.cls();

describe("react/04-complex/edge-case-empty-tweaks-and-undefined-values", () => {
	it("handles edge case with empty tweaks and undefined values", () => {
		const { result } = renderHook(
			() =>
				useCls(CardCls, [
					// Empty tweak (should be ignored)
					{},
					// Tweak with undefined values
					{
						variant: {
							size: undefined,
							variant: "elevated",
							theme: undefined,
						},
					},
					// Tweak with mixed defined/undefined
					{
						variant: {
							loading: true,
							disabled: undefined,
							interactive: true,
						},
						slot: {
							root: {
								class: [
									"mixed-config",
								],
							},
						},
					},
					// Final tweak with all values
					{
						variant: {
							size: "sm",
							variant: "outlined",
							theme: "dark",
							disabled: false,
						},
						slot: {
							root: {
								class: [
									"final-override",
								],
							},
						},
					},
				]),
			{
				wrapper: ({ children }) => (
					<VariantProvider
						cls={CardCls}
						variant={{
							size: "lg",
							variant: "filled",
							theme: "light",
						}}
					>
						{children}
					</VariantProvider>
				),
			},
		);

		// Final tweak wins, undefined values are ignored
		// Result: sm/outlined/dark + loading + interactive + final-override
		expect(result.current.slots.root()).toBe(
			"card-base rounded-lg transition-all p-3 text-sm border-2 border-gray-300 bg-gray-800 text-white animate-pulse hover:shadow-md hover:scale-105 cursor-pointer mixed-config final-override",
		);
		expect(result.current.slots.header()).toBe(
			"card-header font-semibold text-sm mb-2 text-gray-100",
		);
		expect(result.current.slots.content()).toBe(
			"card-content text-xs text-gray-200 opacity-60",
		);
		expect(result.current.slots.footer()).toBe(
			"card-footer opacity-75 text-xs mt-2 text-gray-400",
		);
		expect(result.current.slots.actions()).toBe("card-actions flex gap-1");
	});
});
