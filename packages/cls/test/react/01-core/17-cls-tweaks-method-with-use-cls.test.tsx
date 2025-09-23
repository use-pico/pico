import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, useCls } from "../../../src";

describe("react/01-core/cls-tweaks-method-with-use-cls", () => {
	it("tweaks method works with useCls hook", () => {
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

		// Test that tweak method works with useCls
		const { result } = renderHook(() =>
			useCls(ButtonCls, [
				ButtonCls.tweak({
					variant: {
						size: "lg",
						disabled: true,
					},
					slot: {
						root: {
							class: [
								"custom-class",
							],
						},
					},
				}),
			]),
		);

		// Should apply the tweak: lg size, disabled, custom class
		expect(result.current.slots.root()).toBe(
			"base bg-blue-500 text-white opacity-50 cursor-not-allowed custom-class",
		);
		expect(result.current.slots.icon()).toBe("icon-base");
	});
});
