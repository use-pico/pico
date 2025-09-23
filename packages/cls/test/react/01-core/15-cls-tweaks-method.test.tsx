import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import type { Tweak } from "../../../src/types/Tweak";

describe("react/01-core/cls-tweaks-method", () => {
	it("tweaks method wraps single tweak in array", () => {
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

		const singleTweak: Tweak.Type<(typeof ButtonCls)["contract"]> = {
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
		};

		// Test that tweak method returns a single tweak object
		const result = ButtonCls.tweak(singleTweak);

		expect(result).toEqual(singleTweak);
	});
});
