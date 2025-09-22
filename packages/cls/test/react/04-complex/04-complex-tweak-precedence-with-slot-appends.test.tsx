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

describe("react/04-complex/complex-tweak-precedence-with-slot-appends", () => {
	it("handles complex tweak precedence with slot appends and token overrides", () => {
		const { result } = renderHook(
			() =>
				useCls(CardCls, [
					// First tweak: Base configuration
					{
						variant: {
							size: "md",
							variant: "outlined",
							theme: "light",
						},
						slot: {
							root: {
								class: [
									"base-config",
								],
							},
						},
					},
					// Second tweak: Override size and add loading
					{
						variant: {
							size: "lg",
							loading: true,
						},
						slot: {
							root: {
								class: [
									"loading-config",
								],
							},
						},
					},
					// Third tweak: Override variant and add interactive
					{
						variant: {
							variant: "elevated",
							interactive: true,
						},
						slot: {
							root: {
								class: [
									"interactive-config",
								],
							},
						},
					},
					// Fourth tweak: Final overrides and slot appends
					{
						variant: {
							theme: "dark",
							disabled: true,
						},
						slot: {
							root: {
								class: [
									"final-config",
									"important-override",
								],
							},
							header: {
								class: [
									"header-append",
								],
							},
							content: {
								class: [
									"content-append",
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
							variant: "default",
							theme: "light",
						}}
					>
						<VariantProvider
							cls={CardCls}
							variant={{
								size: "xl",
								variant: "filled",
								theme: "auto",
							}}
						>
							{children}
						</VariantProvider>
					</VariantProvider>
				),
			},
		);

		// All user tweaks are applied in order, with later tweaks overriding earlier ones
		// Final result: md/outlined/light + loading + interactive + disabled + all slot configs
		expect(result.current.slots.root()).toBe(
			"card-base rounded-lg transition-all p-4 text-base border-2 border-gray-300 bg-white text-gray-900 opacity-50 pointer-events-none animate-pulse hover:shadow-md hover:scale-105 cursor-pointer base-config",
		);
		expect(result.current.slots.header()).toBe(
			"card-header font-semibold text-base mb-3 text-gray-800 header-append",
		);
		expect(result.current.slots.content()).toBe(
			"card-content text-sm text-gray-700 opacity-60 content-append",
		);
		expect(result.current.slots.footer()).toBe(
			"card-footer opacity-75 text-sm mt-3 text-gray-500",
		);
		expect(result.current.slots.actions()).toBe("card-actions flex gap-2");
	});
});
