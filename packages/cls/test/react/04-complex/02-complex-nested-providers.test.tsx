import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, useCls, VariantProvider } from "../../../src";

const ButtonCls = contract()
	.slots([
		"root",
		"icon",
	])
	.variant("size", [
		"sm",
		"md",
		"lg",
	])
	.variant("variant", [
		"solid",
		"outline",
	])
	.bool("disabled")
	.def()
	.root({
		root: {
			class: [
				"base",
			],
		},
		icon: {
			class: [
				"icon-base",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"px-2 py-1 text-sm",
			],
		},
		icon: {
			class: [
				"w-3 h-3",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"px-4 py-2 text-base",
			],
		},
		icon: {
			class: [
				"w-4 h-4",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"px-6 py-3 text-lg",
			],
		},
		icon: {
			class: [
				"w-5 h-5",
			],
		},
	})
	.match("variant", "solid", {
		root: {
			class: [
				"bg-blue-500 text-white",
			],
		},
	})
	.match("variant", "outline", {
		root: {
			class: [
				"border-2 border-blue-500 text-blue-500",
			],
		},
	})
	.match("disabled", true, {
		root: {
			class: [
				"opacity-50 cursor-not-allowed",
			],
		},
	})
	.defaults({
		size: "md",
		variant: "solid",
		disabled: false,
	})
	.cls();

describe("react/04-complex/complex-nested-providers", () => {
	it("handles deeply nested variant providers with complex inheritance", () => {
		const { result } = renderHook(
			() =>
				useCls(ButtonCls, [
					{
						variant: {
							disabled: true,
						},
					},
				]),
			{
				wrapper: ({ children }) => (
					<VariantProvider
						cls={ButtonCls}
						variant={{
							size: "lg",
							variant: "solid",
						}}
					>
						<VariantProvider
							cls={ButtonCls}
							variant={{
								size: "sm",
								variant: "outline",
							}}
						>
							<VariantProvider
								cls={ButtonCls}
								variant={{
									size: "md",
									variant: "solid",
								}}
							>
								{children}
							</VariantProvider>
						</VariantProvider>
					</VariantProvider>
				),
			},
		);

		// Innermost provider wins for variants (md, solid), user disabled applies
		expect(result.current.slots.root()).toBe(
			"base px-4 py-2 text-base bg-blue-500 text-white opacity-50 cursor-not-allowed",
		);
		expect(result.current.slots.icon()).toBe("icon-base w-4 h-4");
	});

	it("handles complex variant inheritance with user overrides", () => {
		const { result } = renderHook(
			() =>
				useCls(ButtonCls, [
					{
						variant: {
							size: "lg",
							variant: "outline",
						},
					},
				]),
			{
				wrapper: ({ children }) => (
					<VariantProvider
						cls={ButtonCls}
						variant={{
							size: "sm",
							variant: "solid",
						}}
					>
						<VariantProvider
							cls={ButtonCls}
							variant={{
								size: "md",
								variant: "outline",
							}}
						>
							{children}
						</VariantProvider>
					</VariantProvider>
				),
			},
		);

		// User variant wins over all provider variants
		expect(result.current.slots.root()).toBe(
			"base px-6 py-3 text-lg border-2 border-blue-500 text-blue-500",
		);
		expect(result.current.slots.icon()).toBe("icon-base w-5 h-5");
	});
});
