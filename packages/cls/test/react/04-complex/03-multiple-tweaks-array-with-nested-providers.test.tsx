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

describe("react/04-complex/multiple-tweaks-array-with-nested-providers", () => {
	it("handles multiple tweaks array with deeply nested providers and complex inheritance", () => {
		const { result } = renderHook(
			() =>
				useCls(CardCls, [
					// First tweak: Theme and loading state
					{
						variant: {
							theme: "dark",
							loading: true,
						},
					},
					// Second tweak: Size and interactive state
					{
						variant: {
							size: "lg",
							interactive: true,
						},
					},
					// Third tweak: Variant and disabled state
					{
						variant: {
							variant: "elevated",
							disabled: false,
						},
					},
					// Fourth tweak: Slot overrides
					{
						slot: {
							root: {
								class: [
									"custom-border",
									"ring-2",
									"ring-blue-500",
								],
							},
							header: {
								class: [
									"custom-header",
									"text-blue-600",
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
							size: "sm",
							variant: "outlined",
							theme: "light",
						}}
					>
						<VariantProvider
							cls={CardCls}
							variant={{
								size: "md",
								variant: "default",
								theme: "auto",
							}}
						>
							<VariantProvider
								cls={CardCls}
								variant={{
									size: "xl",
									variant: "filled",
									theme: "dark",
								}}
							>
								{children}
							</VariantProvider>
						</VariantProvider>
					</VariantProvider>
				),
			},
		);

		// User tweaks win over all providers
		// Final result: lg/elevated/dark + loading + interactive + custom slots
		expect(result.current.slots.root()).toBe(
			"card-base rounded-lg transition-all p-6 text-lg shadow-lg border-0 bg-gray-800 text-white animate-pulse hover:shadow-md hover:scale-105 cursor-pointer custom-border ring-2 ring-blue-500",
		);
		expect(result.current.slots.header()).toBe(
			"card-header font-semibold text-lg mb-4 custom-header text-blue-600",
		);
		expect(result.current.slots.content()).toBe(
			"card-content text-base text-gray-200 opacity-60",
		);
		expect(result.current.slots.footer()).toBe(
			"card-footer opacity-75 text-base mt-4 text-gray-400",
		);
		expect(result.current.slots.actions()).toBe("card-actions flex gap-3");
	});
});
